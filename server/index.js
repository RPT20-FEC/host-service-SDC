
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const axios = require('axios');

var redis = require('redis');
var client = redis.createClient({no_ready_check: true});

const {
  getCoHostData,
  createNewHost,
  updateHost,
  deleteHost
}  = require('../database/postgres.js');
const {
  getHostData
}  = require('../database/postgres.js');
const sampleData = require('../database/sampleData.js');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(
  __dirname + '/../client/dist'
 // {
   //   setHeaders: (res) => {
     //     res.setHeader('Content-Encoding', 'br');
     // }
 // }
))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


//returns host data based on the id
app.get('/hosts/:id', function(req, res) {
  var id = req.params.id;
  //console.log('fetching data ...')
  client.get(id, (err, data) => {
    if (err) console.error(err);
    if (data !== null) {
      res.status(200).json(JSON.parse(data));
      res.end();
    } else {
      getHostData(id, (data) => {
        client.setex(id, 60, JSON.stringify(data))
        res.status(200).json(data);
        res.end();
      })
    }
  })

});

//returns all host data
app.get('/hosts', function(req, res) {

  getHostData(req.params.id, (data) => {
    res.status(200).json(data);
    res.end();

  })
});

// returns co-host data for cohost component
app.get('/hosts/:id/co-hosts', (req, res) => {

  getCoHostData(req.params.id, (data) => {
    res.status(200).json(data);
    res.end();

  })
});


app.get('/listings/:id/hosts', function(req, res) {

  // getHostData('1000', (data) => {
  //       res.status(200).json(data[0]);
  //       res.end();

  //     })
  axios.get(`http://13.52.235.18/listings/${req.params.id}`)
  .then(data => {
    getHostData(data.data.host_id, (data) => {
      res.status(200).json(data[0]);
      res.end();

    })

  })
  .catch(err =>{
    console.error('Failed', err);
  });
});

app.post('/hosts', function(req, res) {
  //console.log(req.url);

  createNewHost(req.body, (data) => {
    res.status(200).json(data);
    res.end();
  })
});

app.put('/hosts/:id', function(req, res) {
  console.log(req.body);

  updateHost(req.params.id, req.body, (data) => {
    res.status(200).json(data);
    res,end();
  });


});

app.delete('/hosts/:id', function(req, res) {

  deleteHost(req.params.id, () => {
    console.log('suxxessfully deleted')
    res.sendStatus(200);
    res.end();
  });

});


app.get('/loaderio-5f546121555cd3d7fab044311486f315.txt', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/loaderio-5f546121555cd3d7fab044311486f315.txt'));
});

app.get('/assets/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/assets/' + req.params.id));
});

app.get('/:id', (req, res) => {
  //res.header({'Content-Encoding': 'br'});
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});


module.exports = app;
