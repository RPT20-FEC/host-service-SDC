//const db  = require('./index.js');

var myArgs = process.argv.slice(2);
var start = parseInt(myArgs[0]) || 0;
console.log(start, " this is initial id!")
var end = start + 500000;
const pool = require('./pool.js');
const {seedDatabase} = require('./postgres.js');
var moment = require('moment');
const fs = require('fs');
const csvWriter = require('csv-write-stream');


const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


var randomLocation = ['San Jose, CA', 'New Deli, India', 'Moscow, Russia', 'Paris, France', 'Yerevan, Armenia', 'San Francisco, CA', 'Berlin, Germany', 'Rome, Italy', 'Napa, CA'];
var randomLanguage = ['English', 'Chinese', 'Spanish', 'Hindi', 'Arabic', 'PORTUGUESE', 'Russian'];
var randomResponse = ['within an hour', 'within a day', 'within a minute', 'within a week' ,'within 2 hours'];

const insertSampleData = () => {

  // var file = 0;

 // let hostId = 0;

  //for (var x = start; x < 1; x++) {
    var writer = csvWriter();
    writer.pipe(fs.createWriteStream("data.csv"));

    
    for (var i = start; i < end; i++) {

      

      writer.write({
        id: i,
        name: lorem.generateWords(2),
        description: lorem.generateSentences(5),
        duringstay: lorem.generateSentences(3),
        reviews: Math.round(Math.random() * 1000),
        verified: Math.random() >= 0.1,
        superhost: Math.random() >= 0.7,
        joined_at: moment(new Date(+(new Date()) - Math.floor(Math.random()*1000000000000)))
        .format(),
        languages: randomLanguage[Math.round(Math.random() * 6)],
        responsetime: randomResponse[Math.round(Math.random() * 4)],
        responserate: Math.round(Math.random() * 100),
        location: randomLocation[Math.round(Math.random() * 8)],
        avatarurl: `https://host-service.s3-us-west-1.amazonaws.com/${Math.round(Math.random() * 30)}.jpg`
      })
console.log(i);

    }
    writer.end(err => {
      console.log(`ended stream`);
      if (err) {
        console.log(err);
      } else {

        pool.query(`\COPY hosts FROM '/home/ubuntu/host-service-SDC/data.csv' DELIMITER ',' CSV HEADER;`, (error, data) => {
          if (error) {
            return console.error(error);
          }
          console.log('successfully seeded the db');

         // fs.unlinkSync('/home/ubuntu/host-service-SDC/data${start}.csv');
        });
        }
    });

  
};

const generateCSV = () => {

    var writer = csvWriter();
    writer.pipe(fs.createWriteStream(`hosts.csv`));
    for (var i = 0; i < 50; i++) {

      writer.write({
        name: lorem.generateWords(2),
        description: lorem.generateSentences(5),
        duringstay: lorem.generateSentences(3),
        reviews: Math.round(Math.random() * 1000),
        verified: Math.random() >= 0.1,
        superhost: Math.random() >= 0.7,
        joined_at: moment(new Date(+(new Date()) - Math.floor(Math.random()*1000000000000)))
        .format(),
        languages: randomLanguage[Math.round(Math.random() * 6)],
        responsetime: randomResponse[Math.round(Math.random() * 4)],
        responserate: Math.round(Math.random() * 100),
        location: randomLocation[Math.round(Math.random() * 8)],
        avatarurl: `https://host-service.s3-us-west-1.amazonaws.com/${Math.round(Math.random() * 30)}.jpg`
      })


    }
    writer.end(err => {
      console.log(`ended stream`);
      if (err) {
        console.log(err);
      } else {
        console.log("doc for load testing is ready")
        }
    });

};

//generateCSV();
insertSampleData();





