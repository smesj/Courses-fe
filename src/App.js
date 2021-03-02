import './App.css';
import ClassIcon from '@material-ui/icons/Class';
import React, { useContext } from 'react';
import withUser, { UserContext } from './components/hoc/withUser';
import { makeStyles } from '@material-ui/core/styles';
import { Courses } from './components/Courses';
import { Login } from './components/Login';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

function App() {
	const { user, setUser } = useContext(UserContext);
	const classes = useStyles();

  const logout = () => {
    setUser(null)
  }
  
	return (
		<div className='App'>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
            <ClassIcon  className={classes.menuIcon}/>
						<Typography variant="h6" className={classes.title}>
							My Courses
						</Typography>
            {user &&
              <Button color="inherit" onClick={() => logout()}>Logout</Button>
            }			
					</Toolbar>
				</AppBar>
			</div>
			{!!user ? <Courses user={user} /> : <Login />}
		</div>
	);
}

export default withUser(App);

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
	},
	menuIcon: {
    marginRight: theme.spacing(2),
	},
	title: {
    flexGrow: 1,
	},
}));
