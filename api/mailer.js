var exports = module.exports = {};
module.exports.sendMail = function(mailRecipient, amountdue, loanShark) {
  var Mailgun = require('mailgun').Mailgun;
  var mg = new Mailgun('key-61975220e8bab3fe4d58013353831ebc');
  var sender = 'no-reply@iSplit.com';
	// Recipient can be a list of emails as well
  var recipient = [mailRecipient];
	// Might have to purchase iSplit domain for an iSplit email address
  var subject = 'iSplit Notification';
  var body = 'This is a notification that you owe $' + amountdue + ' to ' + loanShark + '.\n Have a nice day.\n\n- iSplit team\n';
  var ret = '';
  mg.sendText(sender, recipient, subject, body, function(err) {
    if (err) {
      ret = err;
    }
    ret = 'SUCghfhgfCESS';
  });
  return ret;
	// The function(err) is the callback. err is null when successful.
};
