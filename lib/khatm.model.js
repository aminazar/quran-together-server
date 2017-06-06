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
let khatmColumns = ['creator_id', 'name', 'description', 'creator_shown', 'start_date', 'end_date', 'timezone', 'specific_sura', 'repeats'];
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

    return new Promise((resolve, reject) => {
      let khid;

      this.save()
        .then((res) => {
          khid = res;
          let repeats = (this.repeats !== null) ? this.repeats : 1;
          return this.sql[commitmentTable].init({repeats: repeats, khid: khid});
        })
        .then((res) => resolve(khid))
        .catch((err) => {
          reject(err);
        })
    });
    // return this.save();
  }

  static selectAllKhatms(user_email){
    let curSql = Khatm.test ? sql.test : sql;

    return new Promise((resolve, reject) => {
      curSql[khatmTable].getByEmail({email: user_email})
        .then((res) => {
          // console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err.message);
          reject(err.message);
        })
    });
  }
}

Khatm.test = false;
module.exports = Khatm;