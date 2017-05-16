/**
 * Created by Ali on 5/14/2017.
 */
const env = require("../../env");
const sql = require('../../sql');

xdescribe("Test 'users' table",()=>{
  let uid;
  beforeAll(done=>{
    sql.test.users.create()
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err.message);
        done();
      });
  });

  it("should add a row to table", done=>{
    sql.test.users.add({
      email: 'test@ts.com',
      name: 'Ali Alavi',
      token: '1234567890asqwzx'
    })
      .then(res=>{
        expect(typeof res.uid).toBe('number');
        uid = res.uid;
        done();
      })
      .catch(err=>{
        fail(err.message);
        done();
      });
  });

  it("should get the row in table", done=>{
    if(uid){
      sql.test.users.get({email: 'test@ts.com'})
        .then(res=>{
          expect(res[0].uid).toBe(uid);
          done();
        })
        .catch(err=>{
          fail(err.message);
          done();
        });
    }
  });

  it("should update a row in table", done=>{
    if(uid){
      sql.test.users.update({email: 'ts@ts.com'},uid)
        .then(res=> {
          expect(res).toBeTruthy();
          done()
        })
        .catch(err=>{
          fail(err.message);
          done();
        })
    }
  });

  it("should get the row in table", done=>{
    if(uid){
      sql.test.users.get({email: 'ts@ts.com'})
        .then(res=>{
          expect(res[0].uid).toBe(uid);
          done();
        })
        .catch(err=>{
          fail(err.message);
          done();
        });
    }
  });

  afterAll((done)=>{
    if(uid)
      sql.test.users.drop().then(res=>done()).catch(err=>{console.log(err.message);done()});
    else done();
  });
});