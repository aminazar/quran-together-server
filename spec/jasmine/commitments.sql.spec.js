/**
 * Created by Ali on 6/6/2017.
 */
const env = require("../../env");
const sql = require('../../sql');

describe("Test 'commitments' table",()=> {
  let A_uid;
  let B_uid;
  let A_khid;
  let B_khid;
  let A_cid;
  let B_cid0;
  let B_cid1;

  beforeAll(done => {
    sql.test.users.create()
      .then(() => sql.test.khatms.create())
      .then(() => sql.test.commitments.create())
      .then(() => sql.test.users.add({
        email: 'a@ts.com',
        name: 'Ali Alavi',
        token: '1234567890asqwzx'
      }))
      .then((res) => {
        A_uid = res.uid;
        return sql.test.users.add({
          email: 'b@ts.com',
          name: 'Bagher Bagheri',
          token: '1qaz0okm2938vbru'
        });
      })
      .then((res) => {
        B_uid = res.uid;
        return sql.test.khatms.add({
          creator_id: A_uid,
          name: 'first Khatm',
          creator_shown: true,
          start_date: new Date(2017, 4, 30),
          end_date: new Date(2017, 5, 30),
          timezone: 'UTC+3:30',
          repeats: 2
        });
      })
      .then((res) => {
        A_khid = res.khid;
        return sql.test.khatms.add({
          creator_id: B_uid,
          name: 'B private khatms',
          description: 'Khatm in Ramadan month',
          creator_shown: false,
          start_date: new Date(2018, 4, 30),
          end_date: new Date(2019, 5, 30),
          timezone: 'UTC+3:30'
        });
      })
      .then((res) => {
        B_khid = res.khid;
        done();
      })
      .catch((err) => {
        console.log(err.message);
        done();
      });
  });

  it("should add new commitment (For user A)", done => {
    sql.test.commitments.add({
      uid: A_uid,
      khid: A_khid,
      page_number: 1000,
      repeat_number: 1,
      isread: false
    })
      .then((res) => {
        A_cid = res.cid;
        expect(typeof res.cid).toBe('number');
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should add new commitment (For user B)", done => {
    sql.test.commitments.add({
      uid: B_uid,
      khid: B_khid,
      page_number: 2,
      repeat_number: 2,
      isread: false
    })
      .then((res) => {
        B_cid0 = res.cid;
        expect(typeof res.cid).toBe('number');
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should add another commitment (For user B)", done => {
    sql.test.commitments.add({
      uid: B_uid,
      khid: A_khid,
      page_number: 100,
      repeat_number: 1,
      isread: true
    })
      .then((res) => {
        B_cid1 = res.cid;
        expect(typeof res.cid).toBe('number');
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should fetch all commitments (For specific khatm)", done => {
    sql.test.commitments.getByKhatm({khid: A_khid})
      .then((res) => {
        expect(res.length).toBe(2);
        expect(res.map(el => el.isread)).toContain(true);
        expect(res.map(el => el.isread)).toContain(false);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should fetch all commitments (For user B)", done => {
    sql.test.commitments.getByUser({uid: B_uid, khid: B_khid})
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res.map(el => el.isread)).toContain(false);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should update commitment (For user A)", done => {
    sql.test.commitments.update({
      uid: A_uid,
      khid: A_khid,
      page_number: 1,
      repeat_number: 1,
      isread: true
    }, A_cid)
      .then((res) => {
        return sql.test.commitments.getByUser({uid: A_uid, khid: A_khid});
      })
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res[0].isread).toBe(true);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should add some records (init) (For khatm created by user A)", done => {
    sql.test.commitments.init({repeats: 2, khid: A_khid})
      .then((res) => {
        return env.testDb.query('select count(*) from commitments');
      })
      .then((res) => {
        let expectedLen = (2*604) + (3);
        expect(parseInt(res[0].count)).toBe(expectedLen);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should get non chose page for specific khatm", done => {
    sql.test.commitments.nonChosenPages({khid: A_khid})
      .then((res) => {
        expect(res.length).toBe(2*604);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should delete commitments related to specific khatm", done => {
    sql.test.commitments.deleteByKhatm({khid: A_khid})
      .then((res) => {
        return sql.test.commitments.getByKhatm({khid: A_khid});
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

  it("should delete commitment (For user A)", done => {
    sql.test.commitments.delete(A_cid)
      .then((res) => {
        return sql.test.commitments.getByUser({uid: A_uid, khid: A_khid});
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

  afterAll(done => {
    sql.test.commitments.drop()
      .then(() => sql.test.khatms.drop())
      .then(() => sql.test.users.drop())
      .then(() => done())
      .catch((err) => {
        console.log(err.message);
        done();
      });
  });
});