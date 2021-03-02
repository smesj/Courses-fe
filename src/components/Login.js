import React, { useContext, useState } from 'react';
import { UserContext } from './hoc/withUser';
import { Button, makeStyles, TextField } from '@material-ui/core';
import api from './api';

export const Login = () => {
	const { setUser } = useContext(UserContext);
	const [creds, setCreds] = useState({ username: null, email: null });
  const classes = useStyles();

	const login = async (e) => {
		e.preventDefault();
    api.login(creds).then(user => setUser(user))
	};

	const onChange = (e) => {
		setCreds({ ...creds, [e.target.name]: e.target.value });
	};

	return (
		<div className={classes.container}>
        <form className={classes.form} noValidate  onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            id="email"
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
  container: {
    display:'flex',
    justifyContent:'center'
  },
  form: {
    width: '25%',
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
