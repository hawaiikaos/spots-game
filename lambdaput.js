/** Loads the right library and object for accessing DynamoDB **/
var doc = require('dynamodb-doc'); 
var dynamo = new doc.DynamoDB();

function getUUID() {
	return 'xxxxxxxxx'.replace(/[x]/g, function(c) {
    	var r = Math.random()*10|0, v = c == 'x' ? r : (r&0x3|0x8);
    	return v;
	});
}

exports.handler = function(event, context) {
    
    var initials = event.initials;
    var score = event.score;
    var uuid = parseInt(getUUID());
 
    var params = { 
        "TableName": "spots2", 
        "Item": {
            "score_id": uuid, 
            "initials": initials, 
            "score": score
        }
    };
    
    /**Tries to put the item in the database asynchronously **/
    dynamo.putItem(params, function(err,data) { 
        console.log(err);
        console.log('in putItem'); 
        context.succeed(uuid);
    });
};