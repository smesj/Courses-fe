import { Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, Container, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { Section } from './Section';
import PropTypes from 'prop-types';
import api from './api';

export const Courses = ({ user }) => {
  const classes = useStyles();
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		getCourses();
	},[user])

  const getCourses = async () => {
    api.getCourses().then(courses => setCourses(courses))
	}

  const isMyCourse = (user, course) => {
    if (user.courseSections?.some(el => el.courseId === course.id)) {
      return true
    }
    return false
  }

	return (
		<Container>
			<Typography variant="h3">Courses</Typography>
			{courses.map(course =>{ 
				return (
					<Card key={'course'+course.id} style={{margin:'16px'}}>
            <CardHeader
              title={course.name}
              subheader={course.description}
            />
            <div style={{display:"flex", flexDirection:"row"}}>
              {course.courseSections.map(section => 
                <Section key={section.id} user={user} section={section}></Section>	
              )}
            </div>
              
            {isMyCourse(user, course) &&
              <>
              {course.courseSessions.map(session => (
                <Accordion key={'session'+session.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography className={classes.heading}>{session.name}</Typography>
                    <Typography className={classes.subheading}>{session.description}</Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {session.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
              </>
            }
					</Card>		
				)
			})}
		</Container>
	);
};

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  subheading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

Courses.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    userName: PropTypes.string,
    email: PropTypes.string,
    courseSections: PropTypes.arrayOf(PropTypes.object)
  })
}
