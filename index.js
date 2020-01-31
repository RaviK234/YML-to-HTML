const express = require('express');
// const path = require('path');
const app = express();
const { exec } = require('child_process');

// Cross Origin Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  const input = req.query.input;
  const output = req.query.output;

  if (input && output) {
    const url = `bootprint openapi ${input} ${output}`;

  exec(url, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
      res.send(stdout);
    }
  });
  } else {
    res.send('There is an Error in query param');
  }
});



const server = app.listen(3000, () => {
  console.log('Server started at 3000');
})
