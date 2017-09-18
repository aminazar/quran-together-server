/**
 * Created by ali71 on 16/09/2017.
 */
let io;

let BROADCAST_MESSAGE = 'BROADCAST_MESSAGE';
let NEW_MESSAGE = 'NEW_MESSAGE';

let setup = (http) => {
  io = require('socket.io')(http);

};

module.exports = {
  setup
};