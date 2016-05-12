var exports = module.exports = {};

// mailgun account info

// email
// crlang44@gmail.com

// password
// csc668

module.exports.sendMail = function() {
	var Mailgun = require('mailgun').Mailgun;

	var mg = new Mailgun('key-61975220e8bab3fe4d58013353831ebc');
	mg.sendText('example@example.com', ['Recipient 1 <rec1@example.com>', 'rec2@example.com'],
		'This is the subject',
		'This is the text',
		'noreply@example.com', {},
		function(err) {
			if (err) console.log('Oh noes: ' + err);
			else     console.log('Success');
		});
};