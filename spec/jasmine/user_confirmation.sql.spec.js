/**
 * Created by Ali on 5/15/2017.
 */
const env = require("../../env");
const sql = require('../../sql');

xdescribe("Test 'user_confirmation' table", () => {
  let tSql = sql.test;
  let uid;
  let name = 'Ali Alavi';
  let email = 'a.alavi@gmail.com';
  let token = 'QAZXSWEDCVFRTGBNHYUJMKIOLP1234567890poiuytrewqasdf';
  let another_uid;
  let another_name = 'Taghi Taghavi';
  let another_email = 't.taghavi@gmail.com';
  let another_token = 'qpwoeirutyalskdjfhgzmxncbv0987654321zxcvbnmkljhgfd';
  let another_phrase = '0987654321qazxcvbnmklpoiuytrew';

  beforeAll((done) => {
    sql.test.users.create()
      .then(() => {
        return sql.test.user_confirmation.create();
      })
      .then(() => {
        return sql.test.users.add({
          name: name,
          email: email,
          token: token
        });
      })
      .then((res) => {
        uid = res.uid;
        return sql.test.users.add({
          name: another_name,
          email: another_email,
          token: another_token
        });
      })
      .then((res) => {
        another_uid = res.uid;
        done();
      })
      .catch((err) => {
        console.log(err.message);
        done();
      });
  });

  it("should add a row to the table", (done) => {
    sql.test.user_confirmation.add({
      uid: uid,
      phrase: 'qazxcvbnmklpoiuytrew0987654321'
    })
      .then((data) => {
        expect(typeof data.uid).toBe('number');
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should get error when adding not defined user id", (done) =>{
    sql.test.user_confirmation.add({
      uid: 200,
      phrase: 'qazxcvbnmklpoiuytrew1234567890'
    })
      .then((res) => {
        fail('violate foreign key constraint');
        done();
      })
      .catch((err) => {
        expect(true).toBe(true);
        done();
      })
  });

  it("should add a another row", (done) => {
    sql.test.user_confirmation.add({
      uid: another_uid,
      phrase: another_phrase
    })
      .then((data) => {
        expect(typeof data.uid).toBe('number');
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should fetch all records", (done) => {
    sql.test.user_confirmation.getAll()
      .then((res) => {
        expect(res.length).toBe(2);
        let ids = res.map((el) => el.uid);
        expect(ids).toContain(another_uid);
        expect(ids).toContain(uid);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should update a row by user id", (done) => {
    sql.test.user_confirmation.update({phrase: '101010101010101010101010101010'}, uid)
      .then((res) => {
        expect(res).toBeTruthy();
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should fetch user_confirmation and users joined table for specific phrase", (done) => {
    sql.test.user_confirmation.get({phrase: '101010101010101010101010101010'})
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].uid).toBe(uid);
        expect(res[0].name).toBe(name);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should delete a row by auth phrase", (done) => {
    sql.test.user_confirmation.deleteByPhrase({phrase: another_phrase})
      .then((res) => {
        expect(res).toBeTruthy();
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should fetch all records again", (done) => {
    sql.test.user_confirmation.getAll()
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].uid).toBe(uid);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  afterAll((done) => {
    if(uid && another_uid){
      sql.test.user_confirmation.drop()
        .then(() => {
          return sql.test.users.drop();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          console.log(err.message);
          done();
        })
    }
    else
      done();
  })
});