var exports = module.exports = {};

module.exports.sendMail = function() {
  var Mailgun = require('mailgun').Mailgun;
  var mg = new Mailgun('key-61975220e8bab3fe4d58013353831ebc');
  var sender = 'no-reply@iSplit.com';
	// Recipient can be a list of emails as well
  var recipient = ['crlang44@gmail.com'];
	// Might have to purchase iSplit domain for an iSplit email address
  var subject = 'iSplit Notification';
  var body = 'This is the body of the email';
  mg.sendText(sender, recipient, subject, body, function(err) {
    if (err) {
      console.log(err);
    }
  });
	// The function(err) is the callback. err is null when successful.
};
