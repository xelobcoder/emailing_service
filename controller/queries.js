const queries = {};


queries.addsubscriber = function(subscriber,email,code,active) {
 return `INSERT INTO subscribers (SUBSCRIBER,EMAIL,APP_CODE,ACTIVE) VALUES ('${subscriber}','${email}','${code}','${active}')`;
}

queries.isSubpresent = function(subscriber) {
 return `SELECT * FROM subscribers WHERE SUBSCRIBER = '${subscriber}'`;
}


queries.deactivate = function(subscriber,id) {
 return `UPDATE subscribers SET ACTIVE = 'false' WHERE SUBSCRIBER = '${subscriber}' AND ID = '${id}'`;
}




module.exports = queries;
