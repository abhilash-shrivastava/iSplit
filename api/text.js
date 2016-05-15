var exports = module.exports = {};
module.exports.sendText = function(recipient, amountdue, loanShark) {
  var textbelt = require('textbelt');
  var message = 'This is a notification that you owe $' + amountdue + ' to ' + loanShark + '.\n Have a nice day.\n\n- iSplit team\n';
  textbelt(recipient, message, undefined, function(err) {
    if (err) {
      console.log(err);
    }
  });
};
