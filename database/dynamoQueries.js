// scan and return the count aws dynamodb scan --table-name hosts --select "COUNT" --endpoint-url http://localhost:8000
// query by id aws dynamodb get-item --table-name hosts --key "{\"id\":{ \"N\" : \"2424\" } }"  --endpoint-url http://localhost:8000
// run dynamodb java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

// aws dynamodb put-item \ --table-name Hosts \ --item '{"id": {"N": "10000000"},"name": {"S": "I I am the last in 10 million"} ,
// "info": {}}' \--return-consumed-capacity TOTAL

var AWS = require("aws-sdk");
AWS.config.update({region: "us-west-1", endpoint: "https://dynamodb.us-west-1.amazonaws.com"});
var docClient = new AWS.DynamoDB.DocumentClient();


const getHostData = (id, callback) => {

    var params = {
        TableName: "Hosts",
        Key: {
            "id" : Number(id)
          }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:",id , JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(data);
        }
    });
  };


const createNewHost = (hostData, callback) => {

  var params = {
      TableName: "Hosts",
      Item:{
          "id": hostData.id,
          "name": hostData.name,
          "info": hostData
      }
  };

  docClient.put(params, function(err, data) {
      if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          callback(data);
      }
  });
}

const updateHost = (id, data, callback) => {

    var params = {
        TableName: "Hosts",
        Key:{
            "id": Number(id)
        },
        UpdateExpression: "set info.description = :d",
        ExpressionAttributeValues:{
            ":d":data.info.description
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            callback(data);
        }
    });
  }

  const deleteHost = (id, callback) => {

    var params = {
        TableName:"Hosts",
        Key:{
            "id": Number(id)
        }
    };

    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            callback();
        }
    });
  }



    module.exports.getHostData = getHostData;
    module.exports.createNewHost = createNewHost;
    module.exports.updateHost = updateHost;
    module.exports.deleteHost = deleteHost;