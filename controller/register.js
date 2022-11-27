const { response } = require('express');
const connection = require('./db');
const queries = require('./queries');
// create a user if not exist
// must contain company name,email, app verifcation code

// get data source from db




const register_user = class Register {
 constructor(subscriber, email, code, active) {
  this.subscriber = subscriber;
  this.code = code;
  this.email = email;
  this.activate = active
 }

 isEmailValid = () => {
  const regex = /^([w-]+(?:.[w-]+)*)@((?:[w-]+.)*w[w-]{0,66}).([com net org]{3}(?:.[a-z]{6})?)$/i
  return this.email.match(regex) ? true : false;
 }

 createSubscriber = (response) => {
  connection.query(queries.addsubscriber(this.subscriber, this.email, this.code, this.activate), (err, result) => {
   if (err) throw err;
   response.send({
    message: 'subscriber created successfully',
    status: 200,
   })
  });
 }


 isHaveSubscriber = (subscriber) => {
  return new Promise((resolve, reject) => {
   connection.query(queries.isSubpresent(subscriber), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
     resolve(true)
    } else {
     resolve(false)
    }
   })
  })
 }

 deactivateSubscriber = (response,subscriber,id) => {
  this.isHaveSubscriber(subscriber).then((result) => {
   if (result) {
    connection.query(queries.deactivate(subscriber,id), (err, result) => {
     if (err) throw err;
     response.send({
      message: 'subscriber deactivated successfully',
      status: 200,
     })
    })
   } else {
    response.send({
     message: 'subscriber not found',
     status: 404
    })
   }
  })
 }

}




module.exports = register_user






