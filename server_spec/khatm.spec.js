/**
 * Created by Ali on 5/31/2017.
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

describe("Khatm API", () => {
  let isSetup = false;
  let tearDown = false;
  let A_uid;
  let B_uid;
  let A_khid0;
  let A_khid1;
  let B_khid;

  beforeEach(done => {
    if(!isSetup){
      sql.test.users.create()
        .then(() => sql.test.khatms.create())
        .then(() => sql.test.commitments.create())
        .then(() => sql.test.users.add({
          email: 'a@ts.com',
          name: 'Ali Alavi',
          token: '1234567890qazwsx'
        }))
        .then((aid) => {
          A_uid = aid.uid;
          return sql.test.users.add({
            email: 'b@ts.com',
            name: 'Bagher Bagheri',
            token: '0987654321qazwsx'
          })
        })
        .then((bid) => {
          B_uid = bid.uid;
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

  it("should A user add new khatm", done => {
    request.put({
      headers: {email: 'a@ts.com', token: '1234567890qazwsx'},
      url: base_url + 'khatm' + test_query,
      form: {
        name: 'first khatm',
        creator_shown: false,
        start_date: new Date(2017, 4, 30),
        end_date: new Date(2017, 5, 30),
        timezone: 'UTC+3:30',
        repeats: 2
      }
    }, (err, res) => {
      if(err) {
        fail(err.message);
        done();
      }

      if(resExpect(res, 200)) {
        let data = JSON.parse(res.body);
        A_khid0 = data;
        sql.test.khatms.select()
          .then((res)=>{
            expect(res.length).toBe(1);
            done();
          })
          .catch((err)=>{
            console.log(err.message);
            done();
          })
      }
    })
  });

  it("should A user add another khatm", done => {
    request.put({
      headers: {email: 'a@ts.com', token: '1234567890qazwsx'},
      url: base_url + 'khatm' + test_query,
      form: {
        name: 'second khatm',
        creator_shown: true,
        start_date: new Date(2017, 4, 30),
        end_date: new Date(2017, 5, 30),
        timezone: 'UTC+3:30',
        specific_sura: 2,
        repeats: 1
      }
    }, (err, res) => {
      if(err)
        fail(err.message);

      if(resExpect(res, 200)) {
        let data = JSON.parse(res.body);
        A_khid1 = data;
        sql.test.khatms.select()
          .then((res)=>{
            expect(res.length).toBe(2);
          })
          .catch((err)=>{
            console.log(err.message);
          })
      }

      done();
    })
  });

  it("should B user add new khatm", done => {
    request.put({
      headers: {email: 'b@ts.com', token: '0987654321qazwsx'},
      url: base_url + 'khatm' + test_query,
      form: {
        name: 'For God',
        creator_shown: true,
        description: 'In the Ramezan month',
        timezone: 'UTC+3:30'
      }
    }, (err, res) => {
      if(err)
        fail(err.message);

      if(resExpect(res, 200)) {
        B_khid = res.kid;
        sql.test.khatms.select()
          .then((res)=>{
            expect(res.length).toBe(3);
          })
          .catch((err)=>{
            console.log(err.message);
          })
      }
      done();
    })
  });

  it("should A user get all khatms", done => {
    request.get({
      headers: {email: 'a@ts.com', token: '1234567890qazwsx'},
      url: base_url + 'khatm' + test_query
    }, (err, res) => {
      if(err)
        fail(err.message);

      if(resExpect(res, 200)) {
        let data = JSON.parse(res.body);
        expect(data.length).toBe(2);
        expect(data[0].khatm_name).toBe('first khatm');
        expect(data[0].repeats).toBe(2);
        expect(data[0].description).toBe(null);
        expect(data[0].specific_sura).toBe(null);
      }
      done();
    });
  });

  it("should A user update first khatm details", done => {
    request.post({
      headers: {email: 'a@ts.com', token: '1234567890qazwsx'},
      url: base_url + 'khatm/' + A_khid0 + test_query,
      form: {
        name: 'first khatm',
        description: 'new DSCP',
        creator_shown: false,
        start_date: new Date(2017, 4, 30),
        end_date: new Date(2017, 5, 30),
        timezone: 'UTC+3:30',
        repeats: 2
      }
    }, (err, res) => {
      if(err)
        fail(err.message);

      if(resExpect(res, 200)){
        // console.log(res);
        expect(true).toBe(true);
      }
      done();
    })
  });

  it("should A user get all kahtms (again)", done => {
    request.get({
      headers: {email: 'a@ts.com', token: '1234567890qazwsx'},
      url: base_url + 'khatm' + test_query
    }, (err, res) => {
      if(err)
        fail(err.message);

      if(resExpect(res, 200)) {
        let data = JSON.parse(res.body);
        expect(data.length).toBe(2);
        expect(data[0].khatm_name).toBe('first khatm');
        expect(data[0].repeats).toBe(2);
        expect(data[0].description).toBe('new DSCP');
        expect(data[0].specific_sura).toBe(null);
      }

      done();
    });
  });

  xit("should B user get all khatms", done => {
    request.get({
      headers: {email: 'b@ts.com', token: '0987654321qazwsx'},
      url: base_url + 'khatm' + test_query
    }, (err, res) => {
      if(err)
        fail(err.message);

      if(resExpect(res, 200)) {
        let data = JSON.parse(res.body);
        expect(data.length).toBe(1);
        expect(data[0].khatm_name).toBe('For God');
        expect(data[0].repeats).toBe(1);
        expect(data[0].creator_shown).toBe(true);
        expect(data[0].description).toBe('In the Ramezan month');
        expect(data[0].specific_sura).toBe(null);
      }

      done();
    });
  });

  it("tearDown", done => {
    tearDown = true;
    done();
  });

  afterEach(done => {
    if(tearDown){
      sql.test.commitments.drop()
        .then(() => sql.test.khatms.drop())
        .then((res) =>  sql.test.users.drop())
        .then(() => done())
        .catch((err) => {
          console.log(err.message);
          done();
        })
    }
    else
      done();
  });
});