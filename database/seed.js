//const db  = require('./index.js');
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

  var file = 0;

  let hostId = 0;
  for (var x = 0; x < 7; x++) {
    var writer = csvWriter();
    writer.pipe(fs.createWriteStream(`data${x}.csv`));
    for (var i = 0; i < 1500000; i++) {

      writer.write({
        id: hostId++,
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
        pool.query(`\COPY hosts FROM '/Users/Anush/HR/sdc/data${file++}.csv' DELIMITER ',' CSV HEADER;`, (error, data) => {
          if (error) {
            return console.error(error);
          }
          console.log('successfully seeded the db')
        });
        }
    });

  }
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

generateCSV();
//insertSampleData();





