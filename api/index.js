var express = require('express');
var multer  = require('multer');
var vision = require('google-vision-api-client');
var requtil = vision.requtil;
var path = require('path');
var jsonfile = path.join(__dirname, 'secret/apikey.json');
var textbot = require(path.join(__dirname, 'text.js'));
var parser = require('./parser');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var cache = require('memory-cache');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './tmp/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({storage: storage});

// initialize the Google vision API.
vision.init(jsonfile);
var app = express();
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.post('/', upload.single('image'), function(req, res) {
  // Build the request payloads
  var d = requtil.createRequests().addRequest(
  requtil.createRequest(req.file.path)
    .withFeature('TEXT_DETECTION')
    .build());
  vision.query(d, function(e, r, d) {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    } else {
      res.send(JSON.stringify(parser.parse(d)));
    }
  });
});

function makeid() {
  var text = '';
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

app.use(bodyParser.json({type: 'application/*+json'}));
app.get('/:id', function(req, res) {
  res.send(JSON.stringify(cache.get(req.param('id'))));
});
app.post('/save', jsonParser, function(req, res) {
  var state = req.body;
  var id = makeid();
  cache.put(id, state);
  var response = textbot.sendText('2485679221', id, state.people.me.name, function() {
    res.sendStatus(200);
  });
});

app.listen(3000);
