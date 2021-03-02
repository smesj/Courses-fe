import React, { useContext, useState } from 'react';
import { UserContext } from './hoc/withUser';
import axiosClient from '../axiosClient';

export const Login = () => {
	const { setUser } = useContext(UserContext);
	const [creds, setCreds] = useState({ username: null, email: null });

	const login = async (e) => {
		e.preventDefault();
		const loginResponse = await axiosClient.post('/users/login', creds);
		setUser(loginResponse.data.user);
	};

	const onChange = (e) => {
		setCreds({ ...creds, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h2>Login</h2>
			<form onSubmit={login}>
				<input
					type='text'
					placeholder='Username'
					name='username'
					onChange={(e) => onChange(e)}
				/>
				<input
					type='text'
					placeholder='Email'
					name='email'
					onChange={(e) => onChange(e)}
				/>
				<button type='submit'>Log In</button>
			</form>
		</>
	);
};
