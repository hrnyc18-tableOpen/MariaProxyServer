const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/restaurants', express.static(path.join(__dirname, '/public')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/api/:id', (req, res) => {
  axios.get(`http://localhost:3010/api/${req.params.id}`)
    .then(({data}) => {
      res.send(data);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    })
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

