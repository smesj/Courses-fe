import { Button } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import axiosClient from '../axiosClient';

export const Courses = ({ user }) => {

	const [thing, setCourses] = useState([]);

	const getCourses = async () => {
		const listcoursesResponse = await axiosClient.post('/courses/list');
		setCourses(listcoursesResponse.data.courses)
	}

	useEffect(() => {
		getCourses();
	}, [])

	return (
		<>
			<h1>Welcome: {user.username} </h1>
			<h2>Courses</h2>
			{thing.map(course =>{ 
				return(
					<React.Fragment key={course.id}>
						<h4 >{course.name}</h4>
						<ul>
							{course.courseSections.map(section => {
								return (
									<li key={section.id} style={{width: '50%', display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
										<span>{section.nickname}: {moment(section.startDate).format("MMM Do YY")}</span>
										<Button size="small" variant="contained" color="primary">
											Register
										</Button>
									</li>
										
								)
							})}
						</ul>
					</React.Fragment>		
				)
			})}
		</>
	);
};
