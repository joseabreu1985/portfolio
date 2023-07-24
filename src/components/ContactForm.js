import React, { useState } from 'react';

const ContactForm = () => {
	const [status, setStatus] = useState('Submit');
	const [mailerState, setMailerState] = useState({
		name: '',
		email: '',
		message: '',
	});

	function handleStateChange(e) {
		setMailerState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	const submitEmail = async (e) => {
		e.preventDefault();
		setStatus('Sending...');
		console.log({ mailerState });
		const response = await fetch('http://localhost:3000/contact', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ mailerState }),
		})
			.then((res) => res.json())
			.then(async (res) => {
				const resData = await res;
				console.log(resData);
				if (resData.status === 'success') {
					alert('Message Sent');
				} else if (resData.status === 'fail') {
					alert('Message failed to send');
				}
			})
			.then(() => {
				setMailerState({
					email: '',
					name: '',
					message: '',
				});
			});
		setStatus('Submit');
		let result = response;
		console.log('result', result);
	};

	return (
		<form onSubmit={submitEmail}>
			<fieldset>
				<legend>React NodeMailer Contact Form</legend>
				<input
					placeholder='Name'
					onChange={handleStateChange}
					name='name'
					value={mailerState.name}
				/>
				<input
					placeholder='Email'
					onChange={handleStateChange}
					name='email'
					value={mailerState.email}
				/>
				<textarea
					placeholder='Message'
					onChange={handleStateChange}
					name='message'
					value={mailerState.message}
				/>
				<button type='submit'>{status}</button>
			</fieldset>
		</form>
	);
};

export default ContactForm;
