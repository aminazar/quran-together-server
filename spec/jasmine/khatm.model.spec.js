/**
 * Created by Ali on 5/31/2017.
 */
const sql  = require('../../sql');
const Khatm = require('../../lib/khatm.model');

describe("Test 'Khatm' model", () => {
  let khatmObj = new Khatm(true);
  let A_uid;
  let B_uid;
  let A_khid;
  let B_khid;
  let commitPages = [];

  beforeAll(done => {
    sql.test.users.create()
      .then(() => sql.test.khatms.create())
      .then(() => sql.test.commitments.create())
      .then(() => sql.test.users.add({
        email: 'a@ts.com',
        name: 'Ali Alavi',
        token: '1234567890qazwsx'
      }))
      .then((res) => {
        A_uid = res.uid;
        return sql.test.users.add({
          email: 'b@ts.com',
          name: 'Bagher Bagheri',
          token: '0987654321qazwsx'
        });
      })
      .then((res) => {
        B_uid = res.uid;
        done();
      })
      .catch((err) => {
        console.log(err.message);
        done();
      })
  });

  it("should save a khatm for user A", done => {
    let khatmData = {
      name: 'first khatm',
      description: 'test for khatm',
      creator_shown: false,
      end_date: new Date(2018, 0, 1),
      timezone: 'UTC-5'
    };

    khatmObj.saveKhatm(A_uid, khatmData)
      .then((res) => {
        A_khid = res;
        expect(true).toBe(true);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should save a khatm for user B", done => {
    let khatmData = {
      name: 'first khatm',
      description: 'For some illness people',
      creator_shown: false,
      end_date: new Date(2018, 0, 1),
      timezone: 'UTC-5',
      repeats: 2
    };

    khatmObj.saveKhatm(B_uid, khatmData)
      .then((res) => {
        B_khid = res;
        expect(true).toBe(true);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should get all khatms for user A", done => {
    sql.test.commitments.getByKhatm({khid: B_khid})
      .then((res) => {
        expect(res.length).toBe(1208);
        console.log('A_uid: ' + A_uid);
        return sql.test.commitments.update({
          uid: A_uid,
          khid: B_khid,
          page_number: 2,
          repeat_number: 1,
          isread: false
        }, res[0].cid)
      })
      .then((res) => {
        Khatm.test = true;
        return Khatm.selectAllKhatms('a@ts.com');
      })
      .then((res) => {
        expect(res.length).toBe(2);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })

  });

  it("should export correct object (For user B)", done => {
    let exp = khatmObj.exportData();

    expect(exp.creator_id).toBe(B_uid);
    expect(exp.name).toBe('first khatm');
    expect(exp.description).toBe('For some illness people');
    expect(exp.creator_shown).toBe(false);
    expect(exp.start_date).toBe(undefined);
    expect(exp.end_date).toEqual(new Date(2018, 0, 1));
    expect(exp.timezone).toBe('UTC-5');
    expect(exp.specific_sura).toBe(null);
    expect(exp.repeats).toBe(2);

    done();
  });

  it("should generate share link for khatm created by user A", done => {
    khatmObj.generateLink(A_khid)
      .then((res) => {
        expect(res).toBeTruthy();
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should assigning some pages to user B", done => {
    Khatm.test = true;

    Khatm.assigningPage(B_uid, B_khid, 10)
      .then((res) => {
        expect(res.length).toBe(10);
        commitPages = res;
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should assigning remained pages to user B (Requested pages greater than free pages)", done => {
    Khatm.test = true;

    Khatm.assigningPage(B_uid, B_khid, (2*604) + 10)
      .then((res) => {
        expect(res.length).toBe((2 * 604) - 11);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should commit some pages for user B", done => {
    Khatm.test = true;

    let cidList = [];
    for(let i=0; i<commitPages.length - 2; i++){
      cidList.push(commitPages[i].cid);
    }

    Khatm.commitPages(cidList, true)
      .then((res) => {
        expect(true).toBe(true);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should delete some committed pages (For user B)", done => {
    Khatm.test = true;

    Khatm.assigningPage(B_uid, B_khid, 20)
      .then((res) => {
        expect(res.length).toBe((2 * 604) - 11 - 20 + 2);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      });
  });

  it("should commit one page for user B", done => {
    Khatm.test = true;

    let cidList = [];
    cidList.push(commitPages[commitPages.length - 1].cid);

    Khatm.commitPages(cidList, true)
      .then((res) => {
        expect(true).toBe(true);
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
      })
  })
});