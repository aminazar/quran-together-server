/**
 * Created by Ali on 5/14/2017.
 */
const env = require('../env');
const QueryFile = env.pgp.QueryFile;
const path = require('path');

// Helper for linking to external query files:
function sql(file) {
  let fullPath = path.join(__dirname, file); // generating full path;
  return new QueryFile(fullPath, {minify: true, debug: env.isDev});
}
/*
 * Add any new queries with nesting it in table then query name, then point to the SQL file for the query.
 * Do not forget to wrap the filename in 'sql()' function.
 * Put the SQL files for any new table/schema in a new directory
 * Use the same direcoty name for nesting the queries here.
 */
module.exports = {
  db: {
    create:       sql('db/create.sql'),
    drop:         sql('db/drop.sql'),
    test:         sql('db/test.sql'),
  },
  users: {
    create:       sql('users/create.sql'),
    drop:         sql('users/drop.sql'),
    getByEmail:   sql('users/getByEmail.sql'),
    getAllToken:  sql('users/getAllToken.sql'),
    get:          sql('users/get.sql'),
  },
  user_confirmation: {
    create:         sql('user_confirmation/create.sql'),
    drop:           sql('user_confirmation/drop.sql'),
    get:            sql('user_confirmation/get.sql'),
    getAll:         sql('user_confirmation/getAll.sql'),
    deleteByEmail:  sql('user_confirmation/deleteByEmail.sql'),
  },
  khatms: {
    create:         sql('khatms/create.sql'),
    drop:           sql('khatms/drop.sql'),
    getByEmail:     sql('khatms/getByEmail.sql'),
    getByShareLink: sql('khatms/getByShareLink.sql'),
    getNotRead:     sql('khatms/getNotRead.sql'),
    clearDeadKhatmCommitments: sql('khatms/clearDeadKhatmCommitments.sql'),
  },
  commitments: {
    create:         sql('commitments/create.sql'),
    drop:           sql('commitments/drop.sql'),
    getByKhatm:     sql('commitments/getByKhatm.sql'),
    getByUserKhatm: sql('commitments/getByUserKhatm.sql'),
    getByUser:      sql('commitments/getByUser.sql'),
    init:           sql('commitments/init.sql'),
    nonChosenPages: sql('commitments/nonChosenPages.sql'),
    deleteByKhatm:  sql('commitments/deleteByKhatm.sql'),
    getRemains:     sql('commitments/getRemains.sql'),
  },
  khatm_stat: {
    create:         sql('khatm_stat/create.sql'),
    drop:           sql('khatm_stat/drop.sql'),
  },
  khatm_user_stat: {
    create:         sql('khatm_user_stat/create.sql'),
    drop:           sql('khatm_user_stat/drop.sql'),
  },
};