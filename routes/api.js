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

router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.put('/user', apiResponse('User', 'confirmation', false, ['body', 'body.email']));
router.post('/user/exist', apiResponse('User', 'userExistence', false, ['body.email']));
router.post('/user/auth', apiResponse('User', 'confirmRegistration', false, ['body.email', 'body.code']));
router.post('/user/auth/delete', apiResponse('User', 'deleteAuthLink', true, ['body.email', 'body.token']));

module.exports = router;