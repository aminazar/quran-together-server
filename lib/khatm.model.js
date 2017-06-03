/**
 * Created by Ali on 6/3/2017.
 */
const sql = require('../sql');
const env = require('../env');
const helpers = require('./helpers');
const SqlTable = require('./sqlTable.model');
const error = require('./errors.list');

let tableName = 'khatms';
let tableColumns = ['name', 'descriptor', 'creator_shown', 'start_date', 'end_date', 'timezone', 'specific_sura', 'repeats'];
let idColumn = 'khid';

class Khatm extends SqlTable{
  constructor(test = false){
    super(tableName, idColumn, test);
  }

  importData(){

  }

  exportData(){

  }
}

User.test = false;
module.exports = User;