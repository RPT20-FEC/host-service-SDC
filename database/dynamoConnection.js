var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

//AWS.config.update({endpoint: "https://dynamodb.us-west-1.amazonaws.com"});
var dynamodb = new AWS.DynamoDB();

var table = {
  TableName : "hosts"
};

// dynamodb.deleteTable(table, function(err, data) {
//   if (err) {
//       console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//   } else {
//       console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
//   }
// });

var params = {
  TableName : "hosts",
  KeySchema: [
      { AttributeName: "id", KeyType: "HASH"}  //Partition key
     // { AttributeName: "name", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" }
      //{ AttributeName: "name", AttributeType: "S" }
      // { AttributeName: "reviews", AttributeType: "N" },
      // { AttributeName: "verified", AttributeType: "Bool" },
      // { AttributeName: "superhost", AttributeType: "Bool" },
      // { AttributeName: "cohost", AttributeType: "SS" },
      // { AttributeName: "duringStay", AttributeType: "S" },
      // { AttributeName: "description", AttributeType: "S" },
      // { AttributeName: "location", AttributeType: "S" },
      // { AttributeName: "joined_at", AttributeType: "S" },
      // { AttributeName: "languages", AttributeType: "S" },
      // { AttributeName: "responseTime", AttributeType: "S" },
      // { AttributeName: "responseRate", AttributeType: "N" },
      // { AttributeName: "avatarUrl", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
      ReadCapacityUnits: 5000,
      WriteCapacityUnits: 5000
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

module.exports.dynamodb = dynamodb;