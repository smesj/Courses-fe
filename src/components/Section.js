import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Chip, Typography } from '@material-ui/core';
import isMoment from 'moment';
import moment from 'moment';
import axiosClient from '../axiosClient';
import { UserContext } from './hoc/withUser';

export const Section = ({section, user}) => {

  const { setUser } = useContext(UserContext);
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

  const isFull = (section) => {
    if (section.users.length >= 5) {
      return true;
    }
    return false;
  }

  const isPast = (startDate) => {
    if (moment(startDate).isBefore(moment())){
      return true
    }
    return false
  }

  return (
    <Card style={{width: "300px", margin:"16px", backgroundColor: isPast(section.startDate)?"lightGrey":""}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {section.nickname}
        </Typography>
        <Typography color="textSecondary">
          {isMoment(section.startDate).format("MMM Do YY")}
        </Typography>
        <Typography color="textSecondary">
          {section.users.length} / 5
        </Typography>
      </CardContent>
      <CardActions>
        {!isPast(section.startDate) ? 
          <>
            {isMySection(user, section) ?
              <>
                {!isFull(section) ? 
                  <Button size="small" variant="contained" color="primary" onClick={() => {enrollSection(user.id, section.id)}}>
                    Register
                  </Button> :
                  <Chip
                    label="Section Full"
                    color="secondary"
                  />
                }
              </>
              :
              <Button size="small" variant="contained" color="primary" onClick={() => {unenrollSection(user.id, section.id)}}>
                leave
              </Button>
            }
          </> 
          :
          <Chip
            label="Registration Closed"
            color="secondary"
          />
        }
      </CardActions>
    </Card>
  )
}

Section.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    startDate: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.object)
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
    userName: PropTypes.string,
    email: PropTypes.string,
    courseSections: PropTypes.arrayOf(PropTypes.object)
  })
}