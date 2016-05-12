/**
 * Created by Abhi on 4/16/16.
 */
var fs = require('fs');
var parser = require('./api/parser');

// read the dummy file
var data = JSON.parse(fs.readFileSync('output.json'), 'utf8');
parser.parse(data);

