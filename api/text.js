var exports = module.exports = {};
module.exports.sendText = function(recipient, id, loanShark, callback) {
  var textbelt = require('textbelt');
  var message = 'This is a notification that you owe ' +  loanShark + ' some money.\n. Visit: http://isplit.com/pay/' + id  + ' To pay your dues.\n\n- iSplit team\n';
  textbelt(recipient, message, function(err) {
    console.log('ID is', id);
    if (err) {
      console.log(err);
    }
    callback();
  });
};
