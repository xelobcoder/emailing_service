const queries = {};


queries.addsubscriber = function(subscriber,email,code,active) {
 return `INSERT INTO subscribers (SUBSCRIBER,EMAIL,APP_CODE,ACTIVE) VALUES ('${subscriber}','${email}','${code}','${active}')`;
}

queries.isSubpresent = function(subscriber) {
 return `SELECT * FROM subscribers WHERE SUBSCRIBER = '${subscriber}'`;
}




module.exports = queries;
