import { Button } from '@material-ui/core';
import moment from 'moment';
import { UserContext } from './hoc/withUser';
import React, { useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';

export const Courses = ({ user }) => {
  const { setUser } = useContext(UserContext);
	const [courses, setCourses] = useState([]);
	const getCourses = async () => {
		const listcoursesResponse = await axiosClient.post('/courses/list');
		setCourses(listcoursesResponse.data.courses)
	}

  const enrollSection = async (userId, sectionId) => {
    const request = {
      userId,
      sectionId
    }
    const enrollResponse = await axiosClient.post('/courses/enrollUserForSection', request);
    setUser(enrollResponse.data.user)
  }

  const unenrollSection = async (userId, sectionId) => {
    const request = {
      userId,
      sectionId
    }
    const unenrollResponse = await axiosClient.post('/courses/unenrollUserForSection', request);
    setUser(unenrollResponse.data.user)
  }

  const isMySection = (user, section) => {
    if (section.users.some(el => el.id === user.id)){
      return false;
    }
    return true;
  }

	useEffect(() => {
		getCourses();
	},[user])

	return (
		<>
			<h1>Welcome: {user.username} </h1>
			<h2>Courses</h2>
			{courses.map(course =>{ 
				return(
					<React.Fragment key={course.id}>
						<h4 >{course.name}</h4>
            <p>{course.description}</p>
						<ul>
							{course.courseSections.map(section => {
								return (
									<li key={section.id} style={{width: '50%', display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
										<span>{section.nickname}: {moment(section.startDate).format("MMM Do YY")}</span>
                    <span>{section.users.length}</span>
                    {isMySection(user, section) ?
                      <Button size="small" variant="contained" color="primary" onClick={() => {enrollSection(user.id, section.id)}}>
                        Register
                      </Button> :
                      <Button size="small" variant="contained" color="primary" onClick={() => {unenrollSection(user.id, section.id)}}>
                        leave
                      </Button>
                    }
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
