/**
 * Created by Ali on 5/14/2017.
 */
module.exports = {
  isTestReq: function(req){return req.query.test==='tEsT'},
  adminCheck: function(username){return username==='admin'},
};