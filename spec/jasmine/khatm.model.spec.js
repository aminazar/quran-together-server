/**
 * Created by Ali on 5/31/2017.
 */
const sql  = require('../../sql');
const Khatm = require('../../lib/khatm.model');

describe("Test 'Khatm' model", () => {
  let khatm = new Khatm(true);
  let uid;
  let khid;

  beforeAll(done => {
    sql.test.users.create()
      .then(() => sql.test.khatms.create())
      .then(() => sql.test.users.add({
        email: 'a@ts.com',
        name: 'Ali Alavi',
        token: '1234567890qazwsx'
      }))
      .then((res) => {
        uid = res.uid;
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

    khatm.saveKhatm(uid, khatmData)
      .then((res) => {
        khid = res;
        expect(true).toBe(true);
        done();
      })
      .catch((err) => {
        fail(err.message);
        done();
      })
  });

  it("should export correct object", done => {
    let exp = khatm.exportData();

    expect(exp.creator_id).toBe(uid);
    expect(exp.name).toBe('first khatm');
    expect(exp.description).toBe('test for khatm');
    expect(exp.creator_shown).toBe(false);
    expect(exp.start_date).toBe(undefined);
    expect(exp.end_date).toEqual(new Date(2018, 0, 1));
    expect(exp.timezone).toBe('UTC-5');
    expect(exp.specific_sura).toBe(null);
    expect(exp.repeats).toBe(undefined);

    done();
  });

  afterAll(done => {
    sql.test.khatms.drop()
      .then(() => sql.test.users.drop())
      .then(() => done())
      .catch((err) => {
        console.log(err.message);
        done();
      })
  })
});