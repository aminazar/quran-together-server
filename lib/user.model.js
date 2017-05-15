/**
 * Created by Ali on 5/14/2017.
 */
const sql = require('../sql');
const env = require('../env');
const helpers = require('./helpers');
const SqlTable = require('./sqlTable.model');
const error = require('./errors.list');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const nodemailer = require('nodemailer');

let userTableName = 'users';
let confirmationTableName = 'user_confirmation';
let usersColumns = ['email', 'name', 'token'];

class User extends SqlTable{
  constructor(test=false){
    console.log('Constructor');
    super('users', 'uid', test);
  }

  load(email, token){
    this.email = email;
    this.token = token;
    return super.load({email: this.email});
  }

  importData(data) {
    this.email = data.email;
    this.name = (data.name === undefined) ? null : data.name;
    this.token = (data.token === undefined) ? null : data.token;
  }

  exportData(){
    let exp = {};

    usersColumns.forEach((el) => {
      if (this[el] !== undefined)
        exp[el] = this[el];
    });

    return exp;
  }

  generateToken(){
    return randomString.generate(50);
  }

  generateHashLink(){
    return new Promise((resolve, reject) => {
      this.curSql[confirmationTableName].getAll()
        .then((data) => {
          console.log('DaTa: ' + data);

          let rndStr = '';

          do {
            rndStr = randomString.generate(30);
          }
          while(false);

          this.curSql[confirmationTableName].add({uid: this.uid, phrase: rndStr})
            .then((data) => resolve(rndStr))
            .catch((err) => reject(err.message));
        })
        .catch((err) => {
          console.log(err.message);
          reject(err.message);
        })
    });
  }

  sendConfirmationMail(userMailAddress, user_id){
    return new Promise((resolve, reject) => {
      if(user_id !== undefined && user_id !== null)
        this.uid = user_id;

      if(!this.checkMailCorrectness(userMailAddress))
        reject(error.emailIsIncorrect);

      this.generateHashLink()
        .then((rndLink) => {
          let confLink = 'localhost:3000/api/auth/' + rndLink;

          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ali.71hariri@gmail.com',
              pass: 'ali1371reza'
            }
          });

          let mailOptions = {
            from: '"Quran Together Team" <ali.71hariri@gmail.com>',
            to: userMailAddress,
            subject: 'Confirmation mail. Quran Together',
            text: 'Thank you for using our app./n' +
                  'Please click on the below link to confirm your registration:\n' +
                  confLink,
            html: '<p>Thank you for using our app</p>' +
                  '<br/>' +
                  '<p>Please click on the below link to confirm your registration:</p>' +
                  '<br/>' +
                  '<a>' + confLink + '</a>'
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if(err){
              console.log(err);
              reject();
            }

            console.log('Message %s sent: %s', info.messageId, info.response);
            resolve('Confirmation mail is sent');
          });
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  checkMailCorrectness(mailAddress){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mailAddress);
  }

  confirmRegistration(hashLink){
    let criteria = {phrase: hashLink};

    return new Promise((resovle, reject) => {
      this.curSql[confirmationTableName].get(criteria)
        .then((data) => {
          if(data.length === 0)
            reject('Confirmation link was expired');
          else if(data.length > 1)
            reject();
          else
            resovle(data[0].token);
        })
    })
  }

  update(){

  }

  insert(data){
    return new Promise((resolve, reject) => {
      if(!this.checkMailCorrectness(data.email))
        reject(error.emailIsIncorrect);

      data.token = this.generateToken();
      this.importData(data);
      this.save()
        .then((id) => {
          this.uid = id;
          this.sendConfirmationMail(data.email)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            })
        })
        .catch((err) => {
          reject(err.message);
        })
    });
  }
}

User.test = false;
module.exports = User;
