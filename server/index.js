
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const axios = require('axios');

const {
  //getCoHostData,
  getHostData,
  createNewHost,
  updateHost,
  deleteHost
}  = require('../database/dynamoQueries.js');
// const {
//   getHostData
// }  = require('../database/postgres.js');
const sampleData = require('../database/sampleData.js');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//returns host data based on the id
app.get('/hosts/:id', function(req, res, next = () => {}) {
  getHostData(req.params.id, (data) => {
    res.status(200).json(data);
    next();

  })
});

//returns all host data
app.get('/hosts', function(req, res, next = () => {}) {

  getHostData(req.params.id, (data) => {
    res.status(200).json(data);
    next();

  })
});

// returns co-host data for cohost component
app.get('/hosts/:id/co-hosts', (req, res) => {

  getCoHostData(req.params.id, (data) => {
    res.status(200).json(data);

  })
});


app.get('/listings/:id/hosts', function(req, res, next = () => {}) {

  axios.get(`http://204.236.167.174/listings/${req.params.id}`)
  .then(data => {
    getHostData(data.data.hostId, (data) => {
      res.status(200).json(data[0]);
      next();

    })

  })
  .catch(err =>{
    console.error('Failed', err);
  });
});

app.post('/hosts', function(req, res) {

  createNewHost(req.body, (data) => {
    res.status(200).json(data);
  })
});

app.put('/hosts/:id', function(req, res) {
  console.log(req.body);

  updateHost(req.params.id, req.body, (data) => {
    res.status(200).json(data);
  });


});

app.delete('/hosts/:id', function(req, res) {

  deleteHost(req.params.id, () => {
    console.log('suxxessfully deleted')
    res.sendStatus(200);
  });

});

app.get('/assets/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/assets/' + req.params.id));
});

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});


module.exports = app;
