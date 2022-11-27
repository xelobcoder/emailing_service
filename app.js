const express = require('express');
const app = express();
const Register = require('./controller/register');
const PORT = process.env.PORT || 8080;


// middleware

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
 res.send({ message: 'hellow world' })
})
app.listen(PORT, (err) => {
 if (err) { throw err };
 console.log('connection successfully')
})





app.post('/register', (req, res) => {
 const { subscriber, email, code, active } = req.body;
 const client = new Register(subscriber, email, code, active);
 client.isHaveSubscriber()
  .then((result) => {
   if (result) {
    res.send({
     message: 'subscriber already exist',
     status: 200
    })
   } else {
    client.createSubscriber(res);
   }
  })
})