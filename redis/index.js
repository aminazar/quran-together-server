/**
 * Created by ali71 on 16/09/2017.
 */
var bluebird = require('bluebird');
var redis = require('redis');
var env = require('../env');
var redis_client = redis.createClient(env.isProd ? process.env.REDIS_URL : {
  socket_keepalive: true
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let redisIsReady = false;

redis_client.on('ready', () => {
  console.log('Redis is ready');
  redisIsReady = true;
});

redis_client.on('error', (err) => {
  console.log('Redis is down.The error message is: ', err);
  redisIsReady = false;
});

let save = (key, value) => {
  if(redisIsReady)
    redis_client.setAsync(key, JSON.stringify(value));
};

let get = (key) => {
  return new Promise((resolve, reject) => {
    if(redisIsReady)
      redis_client.getAsync(key)
        .then(res => resolve(JSON.parse(res)))
        .catch(err => reject(err));
    else
      reject('Redis is not ready now');
  })
};

let expire = (key, time) => {
  if(redisIsReady)
    redis_client.expireAsync(key, time);
};


module.exports = {
  redisIsReady,
  redis_client,
  save,
  get,
  expire,
};