/**
 * Created by Ali on 6/3/2017.
 */
const sql = require('../sql');
const env = require('../env');
const helpers = require('./helpers');
const SqlTable = require('./sqlTable.model');
const error = require('./errors.list');

let khatmTable = 'khatms';
let commitmentTable = 'commitments';
let khatmColumns = ['creator_id',
                    'name',
                    'description',
                    'creator_shown',
                    'start_date',
                    'end_date',
                    'timezone',
                    'specific_sura',
                    'repeats',
                    'share_link'];
let idColumn = 'khid';

class Khatm extends SqlTable{
  constructor(test = false){
    super(khatmTable, idColumn, test);
  }

  importData(data){
    khatmColumns.forEach(el => {
      if(data[el] !== undefined)
        this[el] = data[el];
      else
        this[el] = null;
    });
  }

  exportData(){
    let exp = {};

    exp.creator_id = this.creator_id;
    exp.name = this.name;
    exp.description = this.description;
    exp.creator_shown = this.creator_shown;
    if(this.start_date !== null)
      exp.start_date = this.start_date;
    exp.end_date = this.end_date;
    exp.timezone = this.timezone;
    exp.specific_sura = this.specific_sura;
    if(this.repeats !== null)
      exp.repeats = this.repeats;
    exp.share_link = this.share_link;

    return exp;
  }

  saveKhatm(uid, data, khid){
    this[idColumn] =khid;
    khatmColumns.forEach(col => {
      if (data[col] !== undefined)
        this[col] = data[col];
      else
        this[col] = null;
    });
    if (uid)
      this.creator_id = uid;

    if(!khid) {
      return new Promise((resolve, reject) => {
        let khid;

        let db = this.test ? env.testDb : env.db;

        db.query('select case when is_called = true then last_value + 1 else last_value end as next_id from khatms_khid_seq')
          .then((res) => {
            khid = parseInt(res[0].next_id);
            return this.generateLink(khid);
          })
          .then((res) => {
            this.share_link = res;

            return this.save();
          })
          .then((res) => {
            let repeats = (this.repeats !== null) ? this.repeats : 1;
            this.sql[commitmentTable].init({repeats: repeats, khid: khid})
              .then((result) => {
                resolve(khid);
              })
              .catch((error) => {
                //Delete commitments related to this khatm
                this.sql[commitmentTable].deleteByKhatm({khid: khid});
                //Delete this khatm
                this.sql[khatmTable].delete(khid);

                console.log(error.message);
                reject(error);
              });
          })
          .catch((err) => {
            console.log(err.message);
            reject(err);
          });
      });
    }
    else{
      return this.save();
    }
  }

  static filterHashLink(link){
    let result = '';

    for(let ch of link){
      if((ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) <= 57) || (ch.charCodeAt(0) >= 65 && ch.charCodeAt(0) <= 122))
        result += ch;
    }

    return result;
  }

  generateLink(khatm_id){
    return new Promise((resolve, reject) => {
      env.bcrypt.genSalt(101, (err, salt) => {
        if(err)
          reject(err.message);
        else {
          env.bcrypt.hash(Date.now().toString() + khatm_id.toString(), salt, null, (err, hash) => {
            if(err)
              reject(err.message);
            else{
              resolve(Khatm.filterHashLink(hash));
            }
          })
        }
      });
    });
  }

  static selectAllKhatms(user_email){
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      curSql[khatmTable].getByEmail({email: user_email})
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err.message);
          reject(err.message);
        })
    });
  }

  static assigningPage(user_id, khatm_id, pages){
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      curSql[commitmentTable].getByUserKhatm({uid: user_id, khid: khatm_id})
        .then((res) => {
          let unread = [];
          res.forEach((el) => {
            if(!el.isread)
              unread.push(el);
          });

          unread.sort((a, b) => {
            if(a.repeat_number > b.repeat_number)
              return 1;
            else if(a.repeat_number < b.repeat_number)
              return -1;
            else {
              if(a.page_number > b.page_number)
                return 1;
              else if(a.page_number < b.page_number)
                return -1;
              else
                return 0;
            }
          });

          if(pages > unread.length){
            //Add pages
            return Khatm.addPages(user_id, khatm_id, pages - unread.length);
          }
          else if(pages < unread.length){
            let page_number_cids = [];

            for(let i = unread.length - 1; i >= pages; i--)
              page_number_cids.push({page_number: unread[i].page_number, cid: unread[i].cid});

            //Delete pages
            return Khatm.deletePages(user_id, khatm_id, page_number_cids);
          }
          else
            return Promise.resolve(null);
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  //pages is an array of read pages
  static commitPages(commitment_idList, isread){
    let db = Khatm.test ? env.testDb : env.db;

    return new Promise((resolve, reject) => {
      db.query(env.pgp.helpers.update({isread: isread}, null, commitmentTable) + ' where cid in (' + commitment_idList.join(',') + ')')
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  }

  static addPages(user_id, khatm_id, pages){
    return new Promise((resolve, reject) => {
      let curSql = Khatm.test ? sql.test : sql;
      let assigneePages = [];
      let cids = [];

      curSql[commitmentTable].nonChosenPages({khid: khatm_id})
        .then((res) => {
          let upperBound = (res.length < pages) ? res.length : pages;

          for(let i=0; i< upperBound; i++){
            assigneePages.push({page_number: res[i].page_number, cid: res[i].cid});
            cids.push(res[i].cid);
          }

          let db = Khatm.test ? env.testDb : env.db;

          return db.query('update commitments set uid =' + user_id + ' where cid in (' + cids.join(',') + ')');
          // return db.tx(t => {
          //   var queries = [];
          //
          //   queries = assigneePages.map((el) => {
          //     return t.query(env.pgp.helpers.update({uid: el.uid}, null, commitmentTable)
          //       + ' where cid =' + el.cid + ' returning page_number, cid');
          //   });
          //
          //   return t.batch(queries);
          // });
        })
        .then((res) => {
          // let data = res.map(el => {
          //   return {page_number: el[0].page_number, cid: el[0].cid};
          // });
          // resolve(data);
          resolve(assigneePages);
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        })
    });
  }

  static deletePages(user_id, khatm_id, page_number_cids){
    return new Promise((resolve, reject) => {
      let db = Khatm.test ? env.testDb : env.db;
      let cids = page_number_cids.map((el) => el.cid);

      db.query('update commitments set uid = null where uid = ' + user_id + ' and khid = ' + khatm_id + ' and cid in (' + cids.join(',') + ')')
        .then((res) => {
          resolve(page_number_cids);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getAllRemainedCommitments(user_id){
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      curSql[commitmentTable].getByUser({uid: user_id})
        .then((res) => {
          let khids = res.map(el => el.khid).filter((value, index, self) => self.indexOf(value) === index);

          let data = [];

          khids.forEach(el => {
            let obj = {};
            obj.khid = el;

            obj.pages = res.filter(item => item.khid === el);

            data.push(obj);
          });

          resolve(data);
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  }

  static getRemainCommitments(user_id, khatm_id){
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      curSql[commitmentTable].getRemains({uid: user_id, khid: khatm_id})
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  static getKhatmByLink(khatm_link, user_email){
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      curSql[khatmTable].getByShareLink({share_link: khatm_link, email: user_email})
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    })
  }
}

Khatm.test = false;
module.exports = Khatm;