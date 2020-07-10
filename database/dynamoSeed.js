
var generateData = require('./seed.js');
var myArgs = process.argv.slice(2);
var start = parseInt(myArgs[0]) || 0;
//console.log(start, " this is initial id!")
var end = start + 50000;

function generateChunk (chunk) {

  var itemsArray = [];
  for (var x = 0; x < chunk.length; x ++ ) {
    var someItem = chunk[x];
    var item = {
                PutRequest: {
                 Item: someItem
                }
             };
    if (item) {
      itemsArray.push(item);
    }
  }
  return itemsArray;

}

const seed = () => {

  var AWS = require("aws-sdk");
  var fs = require('fs');
  //AWS.config.logger = console;

  // AWS.config.update({
  //     region: "us-west-2",
  //     endpoint: "http://localhost:8000"
  // });
  AWS.config.update({region: "us-west-1", endpoint: "https://dynamodb.us-west-1.amazonaws.com"});

  var docClient = new AWS.DynamoDB.DocumentClient();
  console.log("Importing hosts into DynamoDB. Please wait.");

  //var allHosts = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  for (i = start; i < end; i+=25) {

    var items = generateData(start);
    start += 25;
    //var items = generateChunk(data);
    //console.log('ATTENTION!!!!!!!!!!!!!!'+ JSON.stringify(items[0].id));
    var params = {         n
      RequestItems: {
        'Hosts': items
      }
    };
    docClient.batchWrite(params, function(err, data) {
      if (err) {
        console.log(err, i, '    ids ---------', JSON.stringify(params.RequestItems.hosts[0]));
      }
      else  {
        // console.log('Added ' +items.length + JSON.stringify(items[0]) + '////////////////////////////////////////////////////' + JSON.stringify(items[items.length-1]) + ' items to DynamoDB');
        console.log('Added ' + items.length + ' items to DynamoDB');
      }
    });

  }
}

//   var allHosts = JSON.parse(fs.readFileSync(fileName, 'utf8'));
//   allHosts.forEach(function(host) {
//     var params = {
//         TableName: "hosts",
//         Item: {
//             "id":  host.id,
//             "name": host.name,
//             "info":  host.info
//         }
//     };

//     docClient.put(params, function(err, data) {
//         if (err) {
//         console.error("Unable to add host", host.id, ". Error JSON:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("PutItem succeeded:", host.id);
//         }
//     });
//   });

//}

seed();


