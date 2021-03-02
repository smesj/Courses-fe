import './App.css';

import React, { useContext } from 'react';
import withUser, { UserContext } from './components/hoc/withUser';

import { Courses } from './components/Courses';
import { Login } from './components/Login';

function App() {
	const { user } = useContext(UserContext);
	return (
		<div className='App'>
			{!!user ? <Courses user={user} /> : <Login />}
		</div>
	);
}

export default withUser(App);
