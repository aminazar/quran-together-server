/**
 * Created by Ali on 5/14/2017.
 */
const env = require('./env');
const sql = require('./sql');
const lib = require('./lib');
const User = lib.User;

function dbTestCreate() {
  return new Promise((resolve, reject) => {
    sql.db.create({dbName: env.test_db_name}, true)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createOrExist(tableName) {
  return new Promise((resolve, reject) => {
    sql[tableName].create()
      .then(resolve)
      .catch(err => {
        if (err.message.indexOf(`"${tableName}" already exists`) !== -1)
          resolve();
        else
          reject(err);
      })
  })
}

function prodTablesCreate() {
  return new Promise((resolve, reject) => {
    createOrExist('users')
      .then(() => {
        return createOrExist('user_confirmation');
      }) //Add new tables in order of dependency in promise chain
      .then(() => {
        return createOrExist('khatms');
      })
      .then(() => {
        return createOrExist('commitments');
      })
      .then(() => {
        return createOrExist('khatm_stat');
      })
      .then(() => {
        return createOrExist('khatm_user_stat');
      })
      .then(() => resolve())
      .catch((err) => {
        reject(err);
      });
  });
}

function setupMainDatabase(msg) {
  console.log(msg);
  prodTablesCreate()
    .then(() => {
      if (env.isDev)
        return dbTestCreate();
      else
        process.exit();
    })
    .then(() => process.exit())
    .catch((err) => {
      console.log(err.message);
      process.exit();
    });
}

if (env.isDev) {
  sql.db.create({dbName: env.db_name})
    .then(res => {
      setupMainDatabase(res);
    })
    .catch(err => {
      setupMainDatabase(err.message);
    });
}