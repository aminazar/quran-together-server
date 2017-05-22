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

  it("user should able to register", (done) => {
    request.put({
      url: base_url + 'user' + test_query,
      form: {email: 'ali.71hariri@gmail.com', name: 'Alireza'}
    }, (err, res) => {
      if(resExpect(res, 200)){
        uid = res.uid;
        console.log(res);
      }
      done();
    })
  }, 10000);

  it("user should able to confirm the registration", (done) => {
    sql.test.user_confirmation.getAll()
      .then((res) => {
        request.get({
          url: base_url + 'auth/' + res[0].phrase + test_query
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
      url: base_url + 'auth' + test_query,
      form: {email: userEmail, token: userToken}
    }, (err, res) => {
      if(resExpect(res, 200)){
        expect(true).toBe(true);
      }
      done();
    })
  });

  it("another_user should able to register", (done) => {
    request.put({
      url: base_url + 'user' + test_query,
      form: {email: 'alireza.3h1993@yahoo.com', name: 'Reza'}
    }, (err, res) => {
      if(resExpect(res, 200)){
        uid = res.uid;
        console.log(res);
      }
      done();
    })
  }, 10000);

  it("another_user should able to confirm the registration", (done) => {
    sql.test.user_confirmation.getAll()
      .then((res) => {
        request.get({
          url: base_url + 'auth/' + res[0].phrase + test_query
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
    request.post({
      url: base_url + 'user/confirm' + test_query,
      form: {email: another_userEmail}
    }, (err, res) => {
      if(resExpect(res, 200)){

        sql.test.user_confirmation.getAll()
          .then((data) => {
            let dt = data.filter((el) => el.uid === uid);
            hashLink = dt.find((el) => el.phrase !== hashLink).phrase;
            expect(dt.length).toBe(2);

            request.get({
              url: base_url + 'auth/' + hashLink + test_query
            }, (error, response) => {
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
      url: base_url + 'auth' + test_query,
      form: {email: userEmail}
    }, (err, res) => {
      if(resExpect(res, 403)){
        expect(true).toBe(true);
      }
      done();
    })
  });

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