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
    return super.load({email: this.email, token: this.token});
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

  filterHash(hash){
    let result = '';

    for(let index=0; index<hash.length; index++){
      let code = hash.charCodeAt(index);

      if((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122))
        result += hash[index];
    }

    return result;
  }

  generateToken(user_id){
    return new Promise((resovle, reject) => {
      let token = '';

      env.bcrypt.genSalt(101, (err, salt) => {
        if(err)
          reject(err.message);
        else {
          env.bcrypt.hash(Date.now().toString() + user_id.toString(), salt, null, (err, hash) => {
            if(err)
              reject(err.message);
            else{
              token = this.filterHash(hash);
              this.update(user_id, {token: token, name: this.name, email: this.email})
                .then((res) => resovle(token))
                .catch((err) => {
                  console.log(err.message);
                  reject(err.message);
                });
            }
          })
        }
      });
    });
  }

  generateHashLink(user_id){
    return new Promise((resolve, reject) => {
      let rndStr = '';

      this.sql[confirmationTableName].getAll()
        .then((res) => {

          if(res.length === 0){
            rndStr = randomString.generate(30);
          }
          else{
            let dt = res.map((el) => el.phrase);
            console.log('DaTa: ' + dt);
            do {
              rndStr = randomString.generate(30);
            }
            while(dt.includes(rndStr));
          }

          return this.sql[confirmationTableName].add({uid: user_id, phrase: rndStr})
        })
        .then((res) => resolve(rndStr))
        .catch((err) => {
          console.log(err.message);
          reject(err.message);
        })
    });
  }

  confirmation(userMailAddress){
    return new Promise((resolve, reject) => {
      this.sql[userTableName].getByEmail({email: userMailAddress})
        .then((data) => {
          this.importData(data[0]);
          this.composeConfirmationMail(userMailAddress, data[0].uid)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err.message));
    });
  }

  composeConfirmationMail(userMailAddress, user_id){
    return new Promise((resolve, reject) => {
      if(!this.checkMailCorrectness(userMailAddress))
        reject(error.emailIsIncorrect);

      this.generateHashLink(user_id)
        .then((rndLink) => {
          let confLink = 'localhost:3000/api/auth/' + rndLink;

          let plainContent =  'Thank you for using our app./n' +
                              'Please click on the below link to confirm your registration:\n' +
                              confLink;

          let htmlContent = '<p>Thank you for using our app</p>' +
                            '<br/>' +
                            '<p>Please click on the below link to confirm your registration:</p>' +
                            '<br/>' +
                            '<a>' + confLink + '</a>';

          return this.sendMail(plainContent, htmlContent, userMailAddress);
        })
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  sendMail(plainContent, htmlContent, mailTo){
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: env.mailConfig.service,
        auth: {
          user: env.mailConfig.user,
          pass: env.mailConfig.pass
        }
      });

      let mailOptions = {
        from: env.mailConfig.from,
        to: mailTo,
        subject: 'Confirmation mail. Quran Together',
        text: plainContent,
        html: htmlContent
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if(err){
          console.log(err);
          reject();
        }

        console.log('Message %s sent: %s', info.messageId, info.response);
        resolve('Confirmation mail is sent');
      });
    });
  }

  checkMailCorrectness(mailAddress){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mailAddress);
  }

  confirmRegistration(hashLink){
    return new Promise((resovle, reject) => {
      let hasToken = false;
      this.sql[confirmationTableName].get({phrase: hashLink})
        .then((data) => {
          if(data.length === 0)
            reject('Confirmation link was expired');
          else if(data.length > 1)
            reject();
          else{
            this.uid = data[0].uid;

            if(data[0].token !== null)
              resovle(data[0].token);
            else
              this.generateToken(data[0].uid)
                .then((token) => {
                  this.token = token;
                  return this.update(this.uid, {token: token, name: this.name, email: this.email});
                })
                .then((res) => {
                  resovle(this.token);
                })
                .catch((err) => {
                  console.log(err.message);
                  reject(err.message);
                })
          }
        })
        .catch((err) => {
          console.log(err.message);
          reject(err.message);
        })
    })
  }

  update(uid, data){
    this.uid = uid;
    this.importData(data);
    return this.save();
  }

  insert(data){
    return new Promise((resolve, reject) => {
      if(!this.checkMailCorrectness(data.email))
        reject(error.emailIsIncorrect);

      let userId = 0;

      this.importData(data);
      this.save()
        .then((id) => {
          userId = id;
          return this.composeConfirmationMail(data.email, id);
        })
        .then((res) => resolve(userId))
        .catch((err) => reject(err.message));
    });
  }

  deleteAuthLink(userLink){
    return new Promise((resolve, reject) => {
      this.sql[confirmationTableName].deleteByPhrase({phrase: userLink})
        .then((res) => resolve())
        .catch((err) => reject(err.message));
    });
  }
}

User.test = false;
module.exports = User;
