/**
 * Created by Ali on 5/14/2017.
 */
const request = require("request");
const base_url = "http://localhost:3000/api/";
const test_query = '?test=tEsT';
const lib = require('../lib');
const sql = require('../sql');
let req = request.defaults({jar: true});//enabling cookies

let resExpect = (res, statusCode) => {
  if (res.statusCode !== statusCode) {
    let jres = '';
    try {
      jres = res.body ? JSON.parse(res.body) : '';
    }
    catch (err) {
    }
    let msg = jres.Message ? jres.Message : jres;
    expect(res.statusCode).toBe(statusCode, `Expected response code ${statusCode}, received ${res.statusCode}. Server response: ${msg}`);
    if (jres.Stack) {
      let err = new Error();
      err.message = jres.Message;
      err.stack = jres.Stack;
      console.log(`Server responds with unexpected error:`, err);
    }
    return false;
  }
  return true;
};

describe("User API", () => {
  let uid;
  let another_uid;
  let isSetup = false;
  let tearDown = false;
  let userToken = '';
  let userEmail = '';
  let another_userToken = '';
  let another_userEmail = '';
  let hashLink = '';

  beforeEach((done) => {
    if(!isSetup){
      sql.test.users.create()
        .then((res) => {
          return sql.test.user_confirmation.create();
        })
        .then((res) => {
          isSetup = true;
          done();
        })
        .catch((err) => {
          console.log(err.message);
          done();
        })
    }
    else
      done();
  });

  it('should pass a inevitable spec', () => {
    expect(true).toBe(true);
  });

  it("user should able to register", (done) => {
    request.put({
      url: base_url + 'user' + test_query,
      form: {email: 'ali.71hariri@gmail.com', name: 'Alireza'}
    }, (err, res) => {
      if(resExpect(res, 200)){
        uid = JSON.parse(res.body);
      }
      done();
    })
  }, 15000);

  it("should show correct row numbers of users and user_confirmation table",(done)=>{
    sql.test.users.select()
      .then((res)=>{
        expect(res.length).toBe(1);
        expect(res[0].token).toBe(null);
        expect(res[0].uid).toBe(uid);
        expect(res[0].email).not.toBe(null);
        return sql.test.user_confirmation.getAll()
          .then((res)=>{
            expect(res.length).toBe(1);
            expect(res[0].uid).toBe(uid);
            done();
          })
      })
      .catch((err)=>{
        console.log(err.message);
        done();
      })
  });

  it("user should able to confirm the registration", (done) => {
    sql.test.user_confirmation.getAll()
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].uid).not.toBe(null);
        expect(res[0].phrase).not.toBe(null);
        request.post({
          url: base_url + 'user/auth' + test_query,
          form: {email: 'ali.71hariri@gmail.com', code: res[0].phrase}
        }, (err, res) => {
          if(err)
            console.log(err.message);
          if(resExpect(res, 200)){
            let data = JSON.parse(res.body);
            userToken = data.token;
            userEmail = data.email;
            expect(true).toBe(true);
          }
          done();
        })
      })
  });

  it("hashLink should delete", (done) => {
    request.delete({
      headers: {
        email: userEmail, token: userToken
      },
      url: base_url + 'user/auth' + test_query

    }, (err, res) => {
      if(resExpect(res, 200)){
        expect(true).toBe(true);
        return sql.test.user_confirmation.getAll()
          .then((res)=>{
            expect(res.length).toBe(0);
            done();
          })
          .catch((err)=>{
           console.log(err.message);
           done();
          })
      }
    })
  });

  it("another_user should able to register", (done) => {
    request.put({
      url: base_url + 'user' + test_query,
      form: {email: 'alireza.3h1993@yahoo.com', name: 'Reza'}
    }, (err, res) => {
      if(resExpect(res, 200)){
        another_uid = JSON.parse(res.body);
        sql.test.users.select()
          .then((res)=>{
            expect(res.length).toBe(2);
            expect(res.filter((el)=> el.token !== null).length).toBe(1);
            expect(res.filter((el)=> el.token === null).length).toBe(1);
            return sql.test.user_confirmation.getAll()
              .then((res)=>{
                expect(res.length).toBe(1);
                expect(res[0].uid).toBe(another_uid);
                expect(res.filter((el)=> el.uid === uid).length).toBe(0);
                done();
              })
          })
      }
    })
  }, 15000);

  it("another_user should able to confirm the registration", (done) => {
    sql.test.user_confirmation.getAll()
      .then((res) => {
      expect(res.length).toBe(1);
        request.post({
          url: base_url + 'user/auth/' + test_query,
          form: {email: 'alireza.3h1993@yahoo.com', code: res[0].phrase}
        }, (err, res) => {
          if(err)
            console.log(err.message);
          if(resExpect(res, 200)){
            let data = JSON.parse(res.body);
            another_userToken = data.token;
            another_userEmail = data.email;
            expect(true).toBe(true);
          }
          done();
        })
      })
  });

  it("registered another_user should get token (like login in another device)" ,(done) => {
    request.put({
      url: base_url + 'user' + test_query,
      form: {email: another_userEmail, name: 'Reza'}
    }, (err, res) => {
      if(resExpect(res, 200)){
        sql.test.user_confirmation.getAll()
          .then((res) => {
            expect(res.length).toBe(2);
            let data = res.filter((el) => el.uid === another_uid);
            expect(data.length).toBe(2);
            request.post({
              url: base_url + 'user/auth/' + test_query,
              form: {email: another_userEmail, code: res[0].phrase}  //can send res[1].phrase for code insted of res[0].phrase too
            }, (error, response) => {
              if(error)
                console.log(error.message);

              if(resExpect(response, 200)){
                let body = JSON.parse(response.body);
                expect(body.token).toBe(another_userToken);
                expect(body.email).toBe(another_userEmail);
              }
              done();
            })
          })
          .catch((err) => {
            console.log(err);
            done();
          })
      }
      done();
    });
  });

  it("user should exist", (done) => {
    request.post({
      url: base_url + 'user/exist' + test_query,
      form: {email: userEmail}
    }, (err, res) => {
      if(resExpect(res, 200)){
        let data = JSON.parse(res.body);
        expect(data.exist).toBe(true);
      }
      done();
    })
  });

  it("user should not exist", (done) => {
    request.post({
      url: base_url + 'user/exist' + test_query,
      form: {email: 'ts@ts.com'}
    }, (err, res) => {
      if(resExpect(res, 200)){
        let data = JSON.parse(res.body);
        expect(data.exist).toBe(false);
      }
      done();
    })
  });

  it("should get access defined error", (done) => {
    request.delete({
      headers: {email: userEmail},
      url: base_url + 'user/auth' + test_query
    }, (err, res) => {
      if(resExpect(res, 403)){
        expect(true).toBe(true);
        sql.test.user_confirmation.getAll()
          .then((res)=>{
            expect(res.length).toBe(2);
            expect(res.filter((el)=> el.uid === another_uid).length).toBe(2);
            expect(res.filter((el)=> el.uid === uid).length).toBe(0);
            return sql.test.users.select()
              .then((res)=>{
                expect(res.length).toBe(2);
                expect(res[0].token).toEqual(userToken);
                expect(res[1].token).toEqual(another_userToken);
              })
          })
      }
      done();
    })
  });

  it("should delete all by-email-recived codes to a user after first confirmation(calling delete api) even some those codes aren't used", (done) =>{
    sql.test.user_confirmation.getAll()
      .then((res)=>{
        expect(res.length).toBe(2);
        expect(res.filter((el)=> el.uid === another_uid).length).toBe(2);
        req.delete({
          headers: {
            email: another_userEmail, token: another_userToken
          },
          url: base_url + 'user/auth' + test_query
        },(err,res) =>{
          if(err)
            console.log(err.message);

          if(resExpect(res,200)){
            expect(true).toBe(true);
            return sql.test.user_confirmation.getAll()
              .then((res)=>{
                expect(res.length).toBe(0);
                done();
              })
          }
          done();
        })
      })
      .catch((err) => {
        console.log(err.message);
        done()
      });
  })

  xit("should not register or do confirmation if user entered incorrect code", (done)=>{
    request.put({
      url: base_url + 'user' + test_query,
      form: {email: 'ali.71hariri@gmail.com', name: 'Alireza'}
    }, (err, res) => {
      if(resExpect(res, 200)){
        expect(true).toBe(true);
        return sql.test.user_confirmation.getAll()
          .then((res)=>{
            expect(res.length).toBe(1);
            request.post({
              url: base_url + 'user/auth' + test_query,
              form: {email: 'ali.71hariri@gmail.com', code: res[0].phrase}
            }, (err, res) => {

              if(err)
                console.log(err.message);

              if(resExpect(res, 200)){
                let data = JSON.parse(res.body);
                expect(true).toBe(true);
                return sql.test.users.select()
                  .then((res)=>{
                    expect(true).toBe(true);
                    done();
                  })
              }
            })
          })
      }
    })
  },10000);

  it("tearDown", (done) => {
    tearDown = true;
    done();
  });

  afterEach((done) => {
    if(tearDown){
      sql.test.user_confirmation.drop()
        .then((res) => {
          return sql.test.users.drop();
        })
        .then((res) => {
          isSetup = false;
          tearDown = false;
          done();
        })
        .catch((err) => {
          console.log(err.message);
          done();
        })
    }
    else
      done();
  });
});