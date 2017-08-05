var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var env = require('./env');
var redis = require('redis');
var redis_client = redis.createClient(env.isProd?process.env.REDIS_URL:{
  socket_keepalive: true
});

var api = require('./routes/api');
var index = require('./routes/index');
var sql = require('./sql');
var lib = require('./lib');

var app = express();

app.locals.userMap = new Map();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let redisIsReady = false;

redis_client.on('ready', () => {
  console.log('Redis is ready');
  redisIsReady = true;
});

redis_client.on('error', (err) => {
  console.log('Redis is down. Back to sql check. The error message is ', err);
  redisIsReady = false;
});

function getUser(email){
  if(redisIsReady)
    return redis_client.getAsync(email);
  return null;
};

function setUser(email, user){
  if(redisIsReady) {
    redis_client.setAsync(email, user);
    setExpiration(email);
  }
}

function setExpiration(email) {
  //Set expiration time to 10 minutes later (Each manipulation on user refresh this expiration time)
  if(redisIsReady)
    redis_client.expireAsync(email, 600);
}

function loadUserFromDatabase(email, token, isTest) {
  return new Promise((resolve, reject) => {
    let curSql = isTest ? sql.test : sql;

    curSql.users.get({email: email, token: token})
      .then((res) => {
        let user = {
          uid: res[0].uid,
          email: res[0].email,
          name: res[0].name,
          token: res[0].token
        };

        setUser(email, JSON.stringify(user));

        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

//Authentication handler
app.use(function (req, res, next) {
  let email = req.headers.email;
  let token = req.headers.token;

  if((email === undefined || token === undefined) || (email === null || token === null)){
    req.user = null;
    next();
  }
  else{
    if(lib.helpers.isTestReq(req)){
      //Should load user from database
      loadUserFromDatabase(email, token, lib.helpers.isTestReq(req))
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => {
          res.status(404)
            .send('User not found');
        })
    }
    else{
      getUser(email)
        .then(user => {
          user = JSON.parse(user);
          if(user === null){
            loadUserFromDatabase(email, token, lib.helpers.isTestReq(req))
              .then(user => {
                req.user = user;
                next();
              })
              .catch(err => {
                res.status(404)
                  .send('User not found');
              })
          }
          else{
            //The user is on the redis
            if(user.token !== token){
              res.status(403)
                .send('The email or token doest not acceptable');
            }
            else{
              setExpiration(email);
              req.user = user;
              next();
            }
          }
        })
    }
  }
});

//Add for test in browser
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//   next();
// });

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
