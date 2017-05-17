/**
 * Created by Ali on 5/14/2017.
 */
const sql  = require('../../sql');
const User = require('../../lib/user.model');

describe("Test 'User' model", () => {
  let created = false;
  let user = new User(true);
  let name = 'Ali Alavi';
  let email = 'a.alavi@gmail.com';
  let uid;
  let sendMailSpy;
  let hashLink;
  let token;

  beforeAll((done) => {
    sql.test.users.create()
      .then((res) => {
        return sql.test.user_confirmation.create()
      })
      .then((res) => {
        created = true;
        sendMailSpy = spyOn(user, 'sendMail').and.callFake(function (plainContent, htmlContent, mailTo) {
          return plainContent;
        });
        done();
      })
      .catch((err) =>{
        fail(err.message);
        done();
      })
  });

  it("should add a user", (done) => {
    user.insert({
      name: name,
      email: email,
    })
      .then((res) => {
        uid = res;
        expect(res).toBeTruthy();
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should a hashLink was generated for user", (done) => {
    sql.test.user_confirmation.getAll()
      .then((res) => {
        hashLink = res[0].phrase;
        expect(res.length).toBe(1);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should get token", (done) => {
    user.confirmRegistration(hashLink)
      .then((res) => {
        token = res.token;
        email = res.email;
        expect(true).toBe(true);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should delete a hashLink", (done) => {
    user.deleteAuthLink(email)
      .then((res) => {
        return sql.test.user_confirmation.getAll();
      })
      .then((res) => {
        expect(res.length).toBe(0);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should generate hashLink", (done) => {
    user.generateHashLink(uid)
      .then((res) => {
        return sql.test.user_confirmation.getAll();
      })
      .then((res) => {
        hashLink = res[0].phrase;
        expect(res.length).toBe(1);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should get a token (be same as first token)", (done) => {
    user.confirmRegistration(hashLink)
      .then((res) => {
        expect(res.token).toBe(token);
        expect(res.email).toBe(email);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should load user by user's token", (done) => {
    user.load(email, token)
      .then((res) => {
        expect(res.uid).toBe(uid);
        expect(res.name).toBe(name);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should generate token", (done) => {
    user.generateToken(uid)
      .then((res) => {
        console.log(res);
        expect(res).toBeTruthy();
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  afterAll((done) => {
    if(created){
      sql.test.user_confirmation.drop()
        .then((res) => {
          return sql.test.users.drop();
        })
        .then((res) => {
          created = false;
          done();
        })
        .catch((err) => {
          fail(err.message);
          done();
        })
    }
  });
});