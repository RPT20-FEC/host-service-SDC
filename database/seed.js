const { seedDatabase }  = require('./dynamoSeed.js');
var moment = require('moment');
const fs = require('fs');

var async = require('async');

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
var randomCohosts = [[Math.round(Math.random() * 1000), Math.round(Math.random() * 10000)], [Math.round(Math.random() * 1000)], null];

const generateData = (start) => {

  var items = [];

    for (let i = 0; i < 25; i++) {


      var item = {
                  PutRequest: {
                   Item: {
                    id: start++,
                    name: lorem.generateWords(2),
                    info: {
                      description: lorem.generateSentences(5),
                      duringStay: lorem.generateSentences(3),
                      reviews: Math.round(Math.random() * 1000),
                      verified: Math.random() >= 0.1,
                      superhost: Math.random() >= 0.7,
                      joined_at: moment(new Date(+(new Date()) - Math.floor(Math.random()*1000000000000)))
                    .format(),
                      languages: randomLanguage[Math.round(Math.random() * 6)],
                      responseTime: randomResponse[Math.round(Math.random() * 4)],
                      responseRate: Math.round(Math.random() * 100),
                      location: randomLocation[Math.round(Math.random() * 8)],
                      avatarUrl: `https://host-service.s3-us-west-1.amazonaws.com/${Math.round(Math.random() * 30)}.jpg`,
                      cohosts: randomCohosts[Math.round(Math.random() * 2)]

                    }

                  }
                  }
               };


      items.push(item)

      //console.log(hostsJson);
    }
    // fs.writeFile(`data${x}.json`, JSON.stringify(hostsJson), function (err) {
    //   if (err) console.error(err);
    //   console.log('successfully create json data file', x);

      //seedDatabase(`data${x}.json`);
      console.log('ATTENTION!!!!!!!!!!!!!!'+ items[0].PutRequest.Item.id);
      return items;
    //});

  //})

};



//insertSampleData();
module.exports = generateData;




