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
////////////////////////change for commit
class User extends SqlTable{
  constructor(test=false){
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

  generateToken(user_id){
    return new Promise((resovle, reject) => {
      env.bcrypt.genSalt(101, (err, salt) => {
        if(err)
          reject(err.message);
        else {
          env.bcrypt.hash(Date.now().toString() + user_id.toString(), salt, null, (err, hash) => {
            if(err)
              reject(err.message);
            else{
              this.update(user_id, {token: hash, name: this.name, email: this.email})
                .then((res) => resovle(hash))
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

  generateVerificationCode(user_id){
    return new Promise((resolve, reject) => {
      let rndStr = '';

      this.sql[confirmationTableName].getAll()
        .then((res) => {

          if(res.length === 0){                  //Should generate confirmation code first and add it into user_confirmation table
            rndStr = randomString.generate({
              length: 6,
              charset: 'numeric'
            });
          }
          else{
            let dt = res.map((el) => el.phrase);          
            do {
              rndStr = randomString.generate({
                length: 6,
                charset: 'numeric'
              });
            }
            while(dt.includes(rndStr));
          }

          return this.sql[confirmationTableName].add({uid: user_id, phrase: rndStr})
        })
        .then((data) => resolve(rndStr))
        .catch((err) => {
          console.log(err.message);
          reject(err.message);
        })
    });
  }

  confirmation(userData, userMailAddress){
    return new Promise((resolve, reject) => {
      this.sql[userTableName].getByEmail({email: userMailAddress})
        .then((data) => {
          if(data.length === 0){      //Should insert user(first registeration by user)
            this.insert(userData)
              .then((res) => resolve(res))
              .catch((err) => reject(err));
          }
          else{    //Should only confirm the existing email by reciving code in the email.
            this.importData(data[0]);
            this.composeConfirmationMail(userMailAddress, data[0].uid)
              .then((res) => resolve(res))
              .catch((err) => reject(err));
          }
        })
        .catch((err) => reject(err.message));
    });
  }

  composeConfirmationMail(userMailAddress, user_id){
    return new Promise((resolve, reject) => {
      if(!this.checkMailCorrectness(userMailAddress))
        reject(error.emailIsIncorrect);

      this.generateVerificationCode(user_id)
        .then((code) => {
          let plainContent =  'Dear user,\nThank you for using our app.\n' +
                              'Please copy the below verification code and paste it into the verification field in the app, to verify your email and activate \'Khatm\' features:\n' + code +
                              '\nBest regards,\nQuran Together Team';

          let htmlContent = `<p>Dear user,</p>
                             <p>Thanks for using Quran Together app.</p>                        
                             <p>Please copy the below verification code and paste it into the verification field in the app, to verify your email and activate 'Khatm' features:</p>
                             <h1 style="text-align:center;">${code}</h1>
                             <p>Best regards,<br>Quran Together Team</p>`;


          return this.sendMail(plainContent, htmlContent, userMailAddress);
        })
        .then((res) => resolve(res))
        .catch((err) => {
          console.log(err);
          reject(err.message);
        });
    });
  }

  sendMail(plainContent, htmlContent, mailTo){
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport(env.mailConfig);

      let mailOptions = {
        from: env.mailConfig.from,
        to: mailTo,
        subject: 'Your verification code for Quran Together app',
        text: plainContent,
        html: htmlContent
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if(err){
          console.log(err);
          reject(err);
        }
        else {
          console.log('Message sent:', info);
          resolve('Confirmation mail is sent');
        }
      });
    });
  }

  checkMailCorrectness(mailAddress){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mailAddress);
  }

  confirmRegistration(userEmail, code){
    return new Promise((resolve, reject) => {
      this.sql[confirmationTableName].get({phrase: code})
        .then((data) => {
          if(data.length === 0)
            reject(error.verificationCodeExpired);
          else if(data.length > 1)
            reject('Database unique constraint is violated');
          else{
            this.uid = data[0].uid;
            this.importData(data[0]);

            if(userEmail !== data[0].email)
              reject(error.emailCodeNotMatch);
            else{
              if(data[0].token !== null)
                resolve({email: this.email, token: data[0].token, name: data[0].name});
              else
                this.generateToken(data[0].uid)
                  .then((token) => {
                    this.token = token;
                    return this.update(this.uid, {token: token, name: this.name, email: this.email});
                  })
                  .then((res) => {
                    resolve({email: this.email, token: this.token, name: data[0].name});
                  })
                  .catch((err) => {
                    console.log(err.message);
                    reject(err.message);
                  })
            }
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

  deleteAuthLink(user_mail){
    return new Promise((resolve, reject) => {
      this.sql[confirmationTableName].deleteByEmail({email: user_mail})
        .then((res) => resolve())
        .catch((err) => reject(err.message));
    });
  }

  userExistence(user_email){
    return new Promise((resolve, reject) => {
      this.sql[userTableName].getByEmail({email: user_email})
        .then((res) => {
          if(res.length > 1)
            reject('Database unique constraint is violated');
          else if(res.length === 0)
            resolve({exist: false});
          else
            resolve({exist: true});
        })
        .catch((err) => {
          console.log(err.message);
          reject(err.message);
        })
    });
  }
}

User.test = false;
module.exports = User;
