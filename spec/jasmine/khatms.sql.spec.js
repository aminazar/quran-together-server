const env = require("../../env");
const sql = require('../../sql');

describe("Test 'khatms' table", () => {
  let A_uid;
  let B_uid;
  let A_kid;
  let B_kid0;
  let B_kid1;

  beforeAll(done => {
    sql.test.users.create()
      .then(() => sql.test.khatms.create())
      .then(() => sql.test.users.add({
        email: 'a@ts.com',
        name: 'Ali Alavi',
        token: '1234567890asqwzx'
      }))
      .then((aid) => {
        A_uid = aid.uid;
        return sql.test.users.add({
        email: 'b@ts.com',
        name: 'Bagher Bagheri',
        token: '1qaz0okm2938vbru'
        })
      })
      .then((bid) => {
        B_uid = bid.uid;
        done();
      })
      .catch(err => {
        console.log(err.message);
        done();
      })
  });

  it("should add new khatm (For user A)", done => {
    sql.test.khatms.add({
      creator_id: A_uid,
      name: 'first Khatm',
      description: 'Khatm for test khatms table',
      creator_shown: true,
      start_date: new Date(2017, 4, 30),
      end_date: new Date(2017, 5, 30),
      timezone: 'UTC+3:30',
      specific_sura: 2
    })
      .then((res) => {
        expect(typeof res.khid).toBe('number');
        A_kid = res.khid;
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should get all khatms (For user A)", done => {
    sql.test.khatms.getByEmail({email: 'a@ts.com'})
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].name).toBe('first Khatm');
        expect(res[0].description).toBe('Khatm for test khatms table');
        expect(res[0].creator_shown).toBe(true);
        expect(res[0].start_date).toEqual(new Date(2017, 4, 30));
        expect(res[0].end_date).toEqual(new Date(2017, 5, 30));
        expect(res[0].timezone).toBe('UTC+3:30');
        expect(res[0].specific_sura).toBe(2);
        expect(res[0].repeats).toBe(1);

        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should add new khatm (For user B)", done => {
    sql.test.khatms.add({
      creator_id: B_uid,
      name: 'Improvement',
      description: 'khatm for sick people improvement',
      creator_shown: false,
      start_date: new Date(2016, 4, 30),
      end_date: new Date(2016, 5, 30),
      timezone: 'UTC-5',
      repeats: 5
    })
      .then((res) => {
        expect(typeof res.khid).toBe('number');
        B_kid0 = res.khid;
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should add another khatm (For user B)", done => {
    sql.test.khatms.add({
      creator_id: B_uid,
      name: 'Drinking water',
      description: 'khatm for drinking water concern in global',
      creator_shown: false,
      end_date: new Date(2018, 0, 1),
      timezone: 'UTC-5',
      specific_sura: 10,
      repeats: 5
    })
      .then((res) => {
        expect(typeof res.khid).toBe('number');
        B_kid1 = res.khid;
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should update (first) khatm (For user A)", done => {
    sql.test.khatms.update({
      name: 'first good khatm',
      description: 'Khatm for pray',
      creator_shown: false,
      start_date: new Date(2017, 4, 30),
      end_date: new Date(2017, 5, 30),
      timezone: 'UTC+3:30',
      specific_sura: 2,
      repeats: 10
    }, A_kid)
      .then((res) => {
        expect(true).toBe(true);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should get all khatms (For user B)", done => {
    sql.test.khatms.getByEmail({email: 'b@ts.com'})
      .then((res) => {
        expect(res.length).toBe(2);
        expect(res.map(el => el.name)).toContain('Drinking water');
        expect(res.map(el => el.name)).toContain('Improvement');
        expect(res.map(el => el.specific_sura)).toContain(null);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should get updated khatm (For user A)", done => {
    sql.test.khatms.getByEmail({email: 'a@ts.com'})
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].name).toBe('first good khatm');
        expect(res[0].creator_shown).toBe(false);
        expect(res[0].description).toBe('Khatm for pray');
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should delete a khatm (For user B)", done => {
    sql.test.khatms.delete(B_kid0)
      .then((res) => sql.test.khatms.getByEmail({email: 'b@ts.com'}))
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].name).toBe('Drinking water');
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  afterAll(done => {
    sql.test.khatms.drop()
      .then(() => sql.test.users.drop())
      .then(() => done())
      .catch(err => {
        console.log(err);
        done();
      })
  })
});