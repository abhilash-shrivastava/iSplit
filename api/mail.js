var exports = module.exports = {};

module.exports.sendMail = function() {
	var Mailgun = require('mailgun').Mailgun;

	var mg = new Mailgun('key-61975220e8bab3fe4d58013353831ebc');
	
	var sender = 'crlang44@gmail.com';
	// Recipient can be a list of emails as well
	var recipient = ['crlang44@gmail.com'];

	var subject = 'This is the subject of the email';
	var body = 'This is the body of the email';

	
	mg.sendText(sender, recipient, subject, body);
};