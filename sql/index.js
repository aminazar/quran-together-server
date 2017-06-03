/**
 * Created by Ali on 5/14/2017.
 */
const rawSql = require('./raw.sql');
const env = require('../env');
let wrappedSQL = {test:{}};
let usingFunction= query=> {
  let res = {
    get: 'any',
    uniqueGet: 'one',
    checkNone: 'none',
    test:'one',
  }[query];

  if (!res)
    res = 'query';

  return res;
};

for(let table in rawSql) {
  wrappedSQL[table]={};
  wrappedSQL.test[table]={};
  for (let query in rawSql[table]) {
    wrappedSQL[table][query] = (data)=>{
      return ((table==='db'?env.initDb:env.db)[usingFunction(query)])(rawSql[table][query],data);
    };
    wrappedSQL.test[table][query] = (data)=>{
      return (env.testDb[usingFunction(query)])(rawSql[table][query],data);
    };
  }
}
/*
 * Additional SQLs created by helpers go here
 */
chooseDb = (tableName,isTest) =>  tableName==='db'? env.initDb : (isTest ? env.testDb : env.db);

genericInsert = (tableName,idColumn,isTest)=>{
  let db = chooseDb(tableName,isTest);
  return (data)=>{
    return db.one(env.pgp.helpers.insert(data,null,tableName) + ' returning ' + idColumn);
  }
};

genericUpdate = (tableName,idColumn,isTest)=> {
  let db = chooseDb(tableName,isTest);
  return (data, id) => {
    return db.query(env.pgp.helpers.update(data, null, tableName) + ` where ${idColumn}=` + id);
  };
};

genericSelect = (tableName,isTest)=> {
  let db = chooseDb(tableName,isTest);
  return () => {
    return db.query(`select * from ${tableName}`);
  };
};

genericDelete = (tableName,idColumn,isTest)=>{
  let db = chooseDb(tableName,isTest);
  return (id)=> {
    return db.query(`delete from ${tableName} where ${idColumn}=` + id)
  }
};

let tablesWithSqlCreatedByHelpers = [
  {
    name: 'users',
    insert: true,
    update: true,
    select: true,
    idColumn: 'uid',
  },
  {
    name: 'user_confirmation',
    insert: true,
    update: true,
    select: true,
    idColumn: 'uid',
  },
  {
    name: 'khatms',
    insert: true,
    update: true,
    select: true,
    delete: true,
    idColumn: 'khid',
  },
];

tablesWithSqlCreatedByHelpers.forEach((table)=>{
  if(!wrappedSQL[table])
    wrappedSQL[table]={};

  if(!wrappedSQL.test[table])
    wrappedSQL.test[table]={};

  if(table.insert) {
    wrappedSQL[table.name].add       = genericInsert(table.name, table.idColumn, false);
    wrappedSQL.test[table.name].add  = genericInsert(table.name, table.idColumn, true);
  }

  if(table.update) {
    wrappedSQL[table.name].update       = genericUpdate(table.name, table.idColumn, false);
    wrappedSQL.test[table.name].update  = genericUpdate(table.name, table.idColumn, true);
  }

  if(table.select) {
    wrappedSQL[table.name].select       = genericUpdate(table.name, false);
    wrappedSQL.test[table.name].select  = genericUpdate(table.name, true);
  }

  if(table.delete){
    wrappedSQL[table.name].delete       = genericDelete(table.name, table.idColumn, false);
    wrappedSQL.test[table.name].delete  = genericDelete(table.name, table.idColumn, true);
  }
});

module.exports=wrappedSQL;