var cross_switch = require('../index')(process.env.APP_ID,process.env.APP_KEY,false)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Cross-Switch Customer", ()=> {

  var mobile;

  // Create Customer
  it("should Create Customer", (done) =>{
    cross_switch.customer.createCustomer({
        code: `${Math.ceil(Math.random() * 10e8)}`,
        name: 'Plugin Test',
        mobile: '+233549444056',
        email: 'harmony@icloud.com',
        other: 'Ghana',
      }).then((body)=>{
        // console.log(body, 'Payment');
        expect(body).to.have.property('status_code');
        expect(body).to.have.property('status_message');
        expect(body).to.have.property('data');
        mobile = body.mobile;
        done();
      })
      .catch((error)=>{
        return done(error);
      });
  });

  // Get Customer By Code or Mobile
  it("should Get Existing Customer", (done) =>{
    cross_switch.customer.getCustomer({mobile: mobile})
    .then((body)=>{
      console.log(body, 'Get Customer');
      expect(body).to.have.property('status_code');
      expect(body).to.have.property('status_message');
      expect(body).to.have.property('data');
      done();
    })
    .catch((error)=>{
      return done(error);
    });
  });

});
