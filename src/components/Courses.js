import React, { useEffect, useState } from 'react';
import axiosClient from '../axiosClient';
import { Section } from './Section';

export const Courses = ({ user }) => {
	const [courses, setCourses] = useState([]);
	const getCourses = async () => {
		const listcoursesResponse = await axiosClient.post('/courses/list');
		setCourses(listcoursesResponse.data.courses)
	}

	useEffect(() => {
		getCourses();
	},[user])

	return (
		<>
			<h1>Welcome: {user.username} </h1>
			<h2>Courses</h2>
			{courses.map(course =>{ 
				return (
					<React.Fragment key={course.id}>
						<h4 >{course.name}</h4>
            <p>{course.description}</p>		
              <div style={{display:"flex", flexDirection:"row"}}>
                {course.courseSections.map(section => 
                  <Section key={section.id} user={user} section={section}></Section>	
                )}
              </div>
					</React.Fragment>		
				)
			})}
		</>
	);
};
