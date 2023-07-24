const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
		clientId: process.env.OAUTH_CLIENTID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
	},
});

transporter.verify((err, success) => {
	err ? console.log(err) : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post('/contact', function(req, res) {
	let mailOptions = {
		from: `${req.body.mailerState.email}`,
		to: process.env.EMAIL,
		subject: `Message from: ${req.body.mailerState.email}`,
		text: `${req.body.mailerState.message}`,
	};

	transporter.sendMail(mailOptions, function(err, data) {
		if (err) {
			res.json({
				status: 'fail',
			});
		} else {
			console.log('== Message Sent ==');
			res.json({
				status: 'success',
			});
		}
	});
});

app.listen(process.env.PORT, () => console.log(`Server is running on port: ${process.env.PORT}`));
