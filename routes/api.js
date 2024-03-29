const lib = require('../lib');
const express = require('express');
const router = express.Router();
const moment = require('moment');

/* GET api listing. */
function apiResponse(className, functionName, tokenNeeded=true, reqFuncs=[]){
  let args = Array.prototype.slice.call(arguments, 4);
  let deepFind = function(obj, pathStr){
    let path = pathStr.split('.');
    let len=path.length;
    for (let i=0; i<len; i++){
      if(typeof obj === 'undefined') {
        let err = new Error(`Bad request: request.${pathStr} is not found at '${path[i]}'`);
        err.status = 400;
        throw(err);
      }
      obj = obj[path[i]];
    }
    return obj;
  };
  return(function(req, res) {
    // let user = req.user ? req.user.email : req.user;
    req.test = lib.helpers.isTestReq(req);
    // console.log('USER: ' + req.user);
    if(tokenNeeded && (req.user === null || req.user === undefined)) {
      res.status(403)
        .send('Token not found');
    }
    else {
      let dynamicArgs = [];
      for(let i in reqFuncs)
        dynamicArgs.push((typeof reqFuncs[i]==='function') ? reqFuncs[i](req) : deepFind(req,reqFuncs[i]));

      let allArgs = dynamicArgs.concat(args);
      lib[className].test = req.test;
      let isStaticFunction = typeof lib[className][functionName] === 'function';
      let model = isStaticFunction ? lib[className] : new lib[className](req.test);
      model[functionName].apply(isStaticFunction?null:model, allArgs)
        .then(data=> {
          res.status(200)
            .json(data);
        })
        .catch(err=> {
          console.log(`${className}/${functionName}: `, err.message);
          res.status(err.number||500)
            .send(err.message || err);
        });
    }
  });
}

//User API
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.put('/user', apiResponse('User', 'confirmation', false, ['body', 'body.email']));
router.post('/user/exist', apiResponse('User', 'userExistence', false, ['body.email']));
router.post('/user/auth', apiResponse('User', 'confirmRegistration', false, ['body.email', 'body.code']));
router.delete('/user/auth', apiResponse('User', 'deleteAuthLink', true, ['user.email', 'user.token']));
router.post('/user/socket/get', apiResponse('User', 'assigningSocketNamespace', true, ['user.email']));
router.post('/user/socket/dismiss', apiResponse('User', 'deleteSocketNamespace', true, ['user.email']));


//Khatm API
router.put('/khatm', apiResponse('Khatm', 'saveKhatm', true, ['user.uid', 'body'])); //create a new khatm
router.post('/khatm/:khid', apiResponse('Khatm', 'saveKhatm', true, ['user.uid', 'body', 'params.khid']));    //edit a khatm
router.get('/khatm', apiResponse('Khatm', 'selectAllKhatms', true, ['user.email']));
router.post('/khatm/commitment/auto', apiResponse('Khatm', 'assigningPage', true, ['user.uid', 'body.khid', 'body.pages']));
router.get('/khatm/commitment/free/:khid', apiResponse('Khatm', 'getFreePages', true, ['user.uid', 'params.khid']));
router.post('/khatm/commitment/commit', apiResponse('Khatm', 'commitPages', true, ['body.cids', 'body.isread']));
router.post('/khatm/commitment/getpage', apiResponse('Khatm', 'selfAssigningPage', true, ['user.uid', 'body.cids', 'body.shouldget']));
router.get('/khatm/commitment/all', apiResponse('Khatm', 'getAllRemainedCommitments', true, ['user.uid']));
router.get('/khatm/commitment/:khid', apiResponse('Khatm', 'getRemainCommitments', true, ['user.uid', 'params.khid']));
router.get('/khatm/link/:link/:is_expired', apiResponse('Khatm', 'getKhatmByLink', true, ['params.link', 'params.is_expired', 'user.email']));
router.post('/khatm/everyday/join', apiResponse('Khatm', 'everydayHandler', true, ['user.uid', 'body.khid', 'body.should_join']));

//Push notification API
router.post('/notification/token/add', apiResponse('Khatm', 'storeDeviceToken', true, ['body.token', 'user.email']));
router.post('/notification/token/del', apiResponse('Khatm', 'deleteDeviceToken', true, ['body.token', 'user.email']));

//Profile
router.get('/profile/person', apiResponse('User', 'getUserProfileData', true, ['user.email']));
router.get('/profile/statistical', apiResponse('Khatm', 'getUserProfileKhatmStat', true, ['user.email']));

module.exports = router;