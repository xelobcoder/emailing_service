const express = require('express');
const app = express();
const Register = require('./controller/register');
const PORT = process.env.PORT || 8080;


// middleware

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));






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


app.post('/deactivate', (req, res) => {
  const { subscriber, id } = req.body;
  new Register().deactivateSubscriber(res, subscriber, id);
})


app.listen(PORT, (err) => {
  if (err) { throw err };
  console.log('connection successfully')
})

