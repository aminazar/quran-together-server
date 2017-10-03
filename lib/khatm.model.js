/**
 * Created by Ali on 6/3/2017.
 */
const sql = require('../sql');
const env = require('../env');
const helpers = require('./helpers');
const SqlTable = require('./sqlTable.model');
const error = require('./errors.list');
const moment = require('moment');
const momentRound = require('moment-round');
const momentTimezone = require('moment-timezone');
const request = require('request');
const redis = require('../redis');
const nodeSchedule = require('node-schedule');
const userClass = require('./user.model');

let khatmTable = 'khatms';
let commitmentTable = 'commitments';
let everydayJoinTable = 'everyday_khatm_join';
let khatmColumns = ['creator_id',
  'name',
  'description',
  'creator_shown',
  'start_date',
  'end_date',
  'timezone',
  'specific_sura',
  'repeats',
  'share_link',
  'is_everyday',
  'page_per_day'];
let idColumn = 'khid';
let sentNotificationUsers = [];

class Khatm extends SqlTable {
  constructor(test = false) {
    super(khatmTable, idColumn, test);
  }

  importData(data) {
    khatmColumns.forEach(el => {
      if (data[el] !== undefined)
        this[el] = data[el];
      else
        this[el] = null;
    });
  }

  exportData() {
    let exp = {};

    exp.creator_id = this.creator_id;
    exp.name = this.name;
    exp.description = this.description;
    exp.creator_shown = this.creator_shown;
    if (this.start_date !== null)
      exp.start_date = this.start_date;
    exp.end_date = this.end_date;
    exp.timezone = this.timezone;
    exp.specific_sura = this.specific_sura;
    if (this.repeats !== null)
      exp.repeats = this.repeats;
    exp.share_link = this.share_link;
    exp.is_everyday = this.is_everyday;
    exp.page_per_day = this.page_per_day;

    return exp;
  }

  saveKhatm(uid, data, khid) {
    this[idColumn] = khid;
    khatmColumns.forEach(col => {
      if (data[col] !== undefined)
        this[col] = data[col];
      else
        this[col] = null;
    });
    if (uid)
      this.creator_id = uid;

    if (!khid) {
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
            if(this.is_everyday)
              return this.sql[everydayJoinTable].putData({khid: this.khid, uid: this.creator_id});
            else
              return Promise.resolve();
          })
          .then((res) => {
            let repeats = (this.repeats !== null) ? this.repeats : 1;
            this.sql[commitmentTable].init({repeats: repeats, khid: khid})
              .then((res) => {
                if(this.is_everyday)
                  return Khatm.assigningPage(this.creator_id, this.khid, this.page_per_day);
                else
                  return Promise.resolve();
              })
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
    else {
      return this.save();
    }
  }

  static filterHashLink(link) {
    let result = '';

    for (let ch of link) {
      if ((ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) <= 57) || (ch.charCodeAt(0) >= 65 && ch.charCodeAt(0) <= 122))
        result += ch;
    }

    return result;
  }

  generateLink(khatm_id) {
    return new Promise((resolve, reject) => {
      env.bcrypt.genSalt(101, (err, salt) => {
        if (err)
          reject(err.message);
        else {
          env.bcrypt.hash(Date.now().toString() + khatm_id.toString(), salt, null, (err, hash) => {
            if (err)
              reject(err.message);
            else {
              resolve(Khatm.filterHashLink(hash));
            }
          })
        }
      });
    });
  }

  static selectAllKhatms(user_email) {
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

  static assigningPage(user_id, khatm_id, pages, isEveryday = false) {
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      curSql[commitmentTable].getByUserKhatm({uid: user_id, khid: khatm_id})
        .then((res) => {
          let unread = [];
          res.forEach((el) => {
            if (!el.isread)
              unread.push(el);
          });

          unread.sort((a, b) => {
            if (a.repeat_number > b.repeat_number)
              return 1;
            else if (a.repeat_number < b.repeat_number)
              return -1;
            else {
              if (a.page_number > b.page_number)
                return 1;
              else if (a.page_number < b.page_number)
                return -1;
              else
                return 0;
            }
          });

          if(isEveryday)
            return Khatm.addPages(user_id, khatm_id, pages);
          else{
            if (pages > unread.length) {
              //Add pages
              return Khatm.addPages(user_id, khatm_id, pages - unread.length);
            }
            else if (pages < unread.length) {
              let page_number_cids = [];

              for (let i = unread.length - 1; i >= pages; i--)
                page_number_cids.push({page_number: unread[i].page_number, cid: unread[i].cid});

              //Delete pages
              return Khatm.deletePages(user_id, khatm_id, page_number_cids);
            }
            else
              return Promise.resolve(null);
          }
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
  static commitPages(commitment_idList, isread) {
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

  static addPages(user_id, khatm_id, pages) {
    return new Promise((resolve, reject) => {
      let curSql = Khatm.test ? sql.test : sql;
      let assigneePages = [];
      let cids = [];

      curSql[commitmentTable].nonChosenPages({khid: khatm_id})
        .then((res) => {
          let upperBound = (res.length < pages) ? res.length : pages;

          for (let i = 0; i < upperBound; i++) {
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

  static deletePages(user_id, khatm_id, page_number_cids) {
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

  static getAllRemainedCommitments(user_id) {
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

  static getRemainCommitments(user_id, khatm_id) {
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

  static getKhatmByLink(khatm_link, isExpired, user_email) {
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      if(isExpired == 'true')
        curSql[khatmTable].getExpiredByShareLink({share_link: khatm_link, email: user_email})
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      else
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

  static scheduledFunctions() {
    nodeSchedule.scheduleJob('39 * * * *', () => {
      Khatm.sendingPushNotification();
      Khatm.insertNewPageEverydayKhatm();
      Khatm.checkKhatmsToClear();
    });

    nodeSchedule.scheduleJob('41 * * * *', () => {
      Khatm.sendingPushNotification();
      Khatm.insertNewPageEverydayKhatm();
      Khatm.checkKhatmsToClear();
    });
  };

  static getForceNotification(data) {
    let result = [];

    for (let item of data) {
      if(item.is_everyday){
        if(parseInt(item.remaining_pages) * 0.8 > parseInt(item.page_per_day) / 2)
          result.push({
            email: item.user_email,
            share_link: item.share_link,
            title: 'Quran Together Commitments',
            message: 'You have ' + item.remaining_pages + ' unread pages in ' + item.khatm_name
          });
      }
      else{
        let remainingDays = moment(item.end_date).diff(moment(new Date()), 'days');

        //Add persons with their related khatm that first condition (0.8 of RP/RD > readPages) or second (today is end date of khatm) is correct
        if(remainingDays === 0 ||
          ((parseInt(item.remaining_pages) / remainingDays) * 0.8 > parseInt(item.read_pages) && parseInt(item.read_pages) != 0) ||
          (parseInt(item.remaining_pages) > remainingDays * 5 && parseInt(item.read_pages) == 0))
          result.push({
            email: item.user_email,
            share_link: item.share_link,
            title: 'Quran Together Commitments',
            message: Khatm.notificationMessage(remainingDays + 1, item.remaining_pages, item.khatm_name)
          });
      }
    }

    return result;
  }

  static notificationMessage(remainingDays, remainingPages, khatm_name) {
    if(remainingDays === 0)
      return khatm_name + ' is finished 6 hours later and you have ' + remainingPages + ' pages not read';
    return remainingDays + ((remainingDays === 1) ? ' day' : ' days') + ' left to ' + khatm_name + '\'s end date and your remainder commitment pages is ' + remainingPages;
  }

  static storeDeviceToken(token, email) {
    return new Promise((resolve, reject) => {
      redis.get(email + '--device-token')
        .then(res => {
          if (!res || res.length <= 0)
            res = [];

          if(res.findIndex(t => t === token) === -1)
            res.push(token);

          return redis.save(email + '--device-token', res);
        })
        .then(() => resolve())
        .catch(err => {
          console.error('Error: Cannot get/save device token from/on redis. ' + err);
          reject(err);
        });
    });
  }

  static getFilteredTimezones(pivotTime, morePrecision = false) {
    let timezoneList = momentTimezone.tz.names();
    let result = [];
    let currentTimestamp = momentRound().floor(60, 'seconds');

    for (let item of timezoneList) {
      let time = currentTimestamp.tz(item).format('HH:MM:SS:z').split(':');

      if (time[0] == pivotTime && result.findIndex(t => t === time[3]) === -1 && (!morePrecision || time[1] === '00'))
        result.push(time[3]);
    }

    return result;
  }

  static sendingPushNotification(){
    let timezoneNearDeadline = Khatm.getFilteredTimezones('13');

    let curSql = Khatm.test ? sql.test : sql;

    for (let tz of timezoneNearDeadline)
      curSql[khatmTable].getNotRead({timezone: tz})
        .then(res => {
          //Filter by deadline and remaining pages
          let data = Khatm.getForceNotification(res);

          //Send push notification
          for (let item of data) {
            if(sentNotificationUsers.findIndex(u => u === item.email) !== -1){
              sentNotificationUsers = sentNotificationUsers.filter(u => u !== item.email);
              continue;
            }
            else
              sentNotificationUsers.push(item.email);

            redis.get(item.email + '--device-token')
              .then(res => {
                if (res) {
                  for (let tk of res) {
                    let obj = {
                      data: {
                        title: item.title,
                        message: item.message,
                        share_link: item.share_link
                      },
                      to: tk
                    };

                    request.post({
                      headers: {
                        'Authorization': 'key=AAAAQiww4xI:APA91bFq0ohBvwPZecV3GvKs36pkW3zO2ZImTnJ5nZsduj84Ab8JAiaf7XB9S-6cpMBOP8O2IlTI6iBCmuJjy_v-ea5YNe2aSlM4gufMOOChuxQcRGjtuKSw2h5PwSiyGho9ZYEnhK5-',
                        'Content-Type': 'application/json'
                      },
                      url: 'https://fcm.googleapis.com/fcm/send',
                      body: JSON.stringify(obj)
                    });
                  }
                }
              })
              .catch(er => console.error('Error: Cannot fetch device token from redis. ' + er));
          }
        })
        .catch(err => {
          console.error('An error occurred when fetching not read pages from database. ' + err);
        });
  }

  static insertNewPageEverydayKhatm(){
    let filteredTimezones = Khatm.getFilteredTimezones('00');

    let curSql = Khatm.test ? sql.test : sql;

    for (let tz of filteredTimezones){
      curSql[everydayJoinTable].getEverydayUser({timezone: tz})
        .then(result => {
          for(let item of result){
            Khatm.assigningPage(item.uid, item.khid, item.page_per_day, true)
              .then(res => {
                console.log(item.page_per_day + ' pages assigned to user with id ' + item.uid + ' for khatm with khid ' + item.khid);
              })
              .catch(err => {
                console.log('Cannot assign ' + item.page_per_day + ' pages to user ' + item.uid + ' for khatm with khid ' + item.khid + '. Error: ' + err);
              });
          }
        });
    }
  }

  static checkKhatmsToClear(){
    let filteredTimezones = Khatm.getFilteredTimezones('01');

    let curSql = Khatm.test ? sql.test : sql;

    if(filteredTimezones && filteredTimezones.length > 0){
      curSql[khatmTable].clearDeadKhatmCommitments({
        end_date: moment().subtract(1, 'days').endOf('day').format('YYYY-MM-DD')
      })
        .then(res => {
          console.log(moment().format('YYYY-MM-DD') + ': Clear dead khatms\' commitments. Add khatm\'s statistics to khatm_stat and khatm_user_stat tables.');
        })
        .catch(err => {
          console.log(moment().format('YYYY-MM-DD') + ': An error occurred when clearing commitments table (insert statistical data into khatm_stat and khatm_user_stat tables)');
        })
    }
  }

  static getUserProfileKhatmStat(user_email){
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      let obj = {};

      curSql[khatmTable].getMyCreatedKhatm({email: user_email})
        .then(res => {
          obj.created = res;
          return curSql[khatmTable].getMyJoinedKhatm({email: user_email})
        })
        .then(res => {
          obj.joined = res;
          resolve(obj);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
}

Khatm.test = false;
module.exports = Khatm;