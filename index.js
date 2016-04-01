var express = require('express');
var multer  = require('multer');
var vision = require('google-vision-api-client');
var requtil = vision.requtil;
var jsonfile = './secret/apikey.json';
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './tmp/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});
var upload = multer({storage: storage});
// initialize the Google vision API.
vision.init(jsonfile);
var app = express();

// in production, disable this, we will have nginx handle static files.
app.use(express.static('client'));

app.post('/', upload.single('image'), function(req, res) {
  // Build the request payloads
  var d = requtil.createRequests().addRequest(
  requtil.createRequest(req.file.path)
    .withFeature('TEXT_DETECTION')
    .build());
  // Do query to the api server
  console.log('Hello');
  vision.query(d, function(e, r, d) {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    } else {
      console.log(d);
      res.send(JSON.stringify(d));
    }
  });
});
app.listen(3000);
