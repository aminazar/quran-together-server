/**
 * Created by Ali on 5/14/2017.
 */
const User = require('./user.model');
const Khatm = require('./khatm.model');
const helpers = require('./helpers');
let ex = {
  User: User,
  Khatm: Khatm,
  helpers: helpers,
};

module.exports = ex;
