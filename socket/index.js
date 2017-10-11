const socketRoutes = require('./socketRoutes');
let io;

let BROADCAST_MESSAGE = 'BROADCAST_MESSAGE';
let NEW_MESSAGE = 'NEW_MESSAGE';

let setup = (http) => {
  io = require('socket.io')(http);
};

let sendNewMessageToAllClients = (data) => {
  return promise(BROADCAST_MESSAGE, data[0], socketRoutes.getUserIO());
};

let sendMessage = (data, namespace) => {
  return new Promise((resovle, reject) => {
    socketRoutes.isNamespaceExist(namespace)
      .then(ns => {
        if(ns)
          promise(NEW_MESSAGE, data, ns)
            .then(res => resolve(res))
            .catch(err => {
              console.log('Error when calling promise function: ', err);
              reject(err);
            });
        else
          reject('No namespace found');
      })
  })
};

let promise = (cmd, data, io) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let message = {
        cmd: cmd,
        msg: data
      };

      io.emit('msg', message);

      resolve(data);
    }, 0);
  });
};

module.exports = {
  setup,
  sendNewMessageToAllClients,
  sendMessage,
  storeNamespace: socketRoutes.saveNamespace,
  getNamespace: socketRoutes.isNamespaceExist,
  deleteNamespace: socketRoutes.deleteNamespace,
};