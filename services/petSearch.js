//Declare logger
var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/service.log'), 'petSearch');
var logger = log4js.getLogger('petSearch');
var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var url = require('url');
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var clientSecret = 'G6xT5oB1aP0rN0oY3tS6aF2wA5gI8dM2lA7tF4iE5cK6mL4fK3';
var clientId = '24caccbd-1a07-4e88-8f21-240e03586a3b';
var apiBaseURL = 'https://api.apim.ibmcloud.com/banchasetthananau1ibmcom-dev/sb/petstore/v2';


var petstoreCreds = appEnv.getServiceCreds(/petstore/i);
if (petstoreCreds != null) {
  clientSecret = petstoreCreds.client_secret;
  clientId = petstoreCreds.client_id;
  apiBaseURL = petstoreCreds.url;
}


function ClientError(e) {
  return e.code >= 400 && e.code < 500;
};
//Implement findByTag module here. Hints: refer to findById
//You code goes here
//End of implementation


exports.findByTag = function(req, res) {
  //This can be replaced by VCAP_SERVICES and url from APIm
  var petAPIURL =
    apiBaseURL + '/pet/' +
    req.query.tag +
    '?client_id=' + clientId + '&client_secret=' + clientSecret;

  logger.info("petAPIURL : " + petAPIURL);
  request(petAPIURL).then(function(contents) {
    var data = JSON.parse(contents[1]);
    return res.json(data);

  }).catch(ClientError, function(e) {
    //A client error like 400 Bad Request happened
  });
};

exports.findById = function(req, res) {
  //This can be replaced by VCAP_SERVICES and url from APIm
  var petAPIURL =
    apiBaseURL + '/pet/' +
    req.query.petId +
    '?client_id=' + clientId + '&client_secret=' + clientSecret;

  logger.info("petAPIURL : " + petAPIURL);
  request(petAPIURL).then(function(contents) {
    var data = JSON.parse(contents[1]);
    return res.json(data);

  }).catch(ClientError, function(e) {
    //A client error like 400 Bad Request happened
  });
};
