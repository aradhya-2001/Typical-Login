import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        email.includes('@') && password.trim().length > 6
      );  
    }, 300);
    
    return (() => {  // This is a clean up func. It runs before the code inside useEffect func is executed except the 1st time i.e. when the app renders 1st time, only the setTimeout func will run but afterwards when either (or both) of the dependencies changes, 1st the cleap up func runs then setTimeout func. This is coz after every key stroke, a new setTimeout func is added to the callback queue. But clean up func before adding a new setTimeout func to the callback queue, dels the prev one. Clean up func also runs whenever the component it is defined in is unmounted from the DOM like when we click on login button, Login component is removed from DOM so clean up func runs. 
      console.log("clean up!")
      clearTimeout(timer)
    })
  }, [email, password])

  const emailChangeHandler = (event) => {  
    setEmail(event.target.value);
    /* setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6  // here we are using event.target.value instead of enteredEmail coz in the curr func i.e. emailChangeHandler we are updating the value of enteredEmail state which will reflect the change after some time (outside the func).
    );  */
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    /* setFormIsValid(
     event.target.value.trim().length > 6 && enteredPassword.includes('@') 
    ); */ 
  };

  const emailBlurHandler = () => {
    setEmailIsValid(email.includes('@'));
  };

  const passwordBlurHandler = () => {
    setPasswordIsValid(password.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email, password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler} // when we click somewhere out of the input field, validatePswordHandler func will run
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
