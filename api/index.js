var express = require('express');
var multer  = require('multer');
var vision = require('google-vision-api-client');
var requtil = vision.requtil;
var path = require('path');
var jsonfile = path.join(__dirname, 'secret/apikey.json');
var mailer = require(path.join(__dirname, 'mailer.js'));
var textbot = require(path.join(__dirname, 'text.js'));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../tmp/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({storage: storage});

// initialize the Google vision API.
vision.init(jsonfile);
var app = express();

app.post('/', upload.single('image'), function(req, res) {
  // Build the request payloads
  var d = requtil.createRequests().addRequest(
  requtil.createRequest(req.file.path)
    .withFeature('TEXT_DETECTION')
    .build());
  vision.query(d, function(e, r, d) {
    if (e) {
      res.sendStatus(500);
    } else {
      res.send(JSON.stringify(d));
    }
  });
});

app.post('/mail', function(req, res) {
  var response = mailer.sendMail('technologyvp@gatorhack.com', 50, 'Thomas');
  res.send(response);
});

app.post('/text', function(req, res) {
  var response = textbot.sendText('4088288121', 50, 'Thomas');
  res.send(response);
});

app.listen(3000);
