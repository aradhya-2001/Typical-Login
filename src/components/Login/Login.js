import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (emailState, action) => {
  if(action.type === "INPUT"){
    return {value: action.val, isValid: action.val.includes('@')} // emailState is the current email state and it is an object having 2 items -> value and isValid. In this if statement, these items are populated and returned to email variable and to emailState. 
  } else if(action.type === "BLUR"){
    return {value: emailState.value, isValid: emailState.isValid} // when we are typing in input field, dispatchEmail func triggers emailReducer func on every key stroke. Then emailReducer updates the emailState accordingly. Then when we click outside input, emailReducer func is called by dispatcher and React puts the latest state of email to its parameter emailState and else if is triggered which doesn't update state just returns the current one.
  } 
  return {value: "", isValid: false}
}

const passwordReducer = (state, action) => {
  if(action.type === "INPUT") {
    return {value: action.val, isValid: action.val.length > 6}
  } else if(action.type === "BLUR") {
    return {value:state.value, isValid: state.isValid}
  }
  return {value: "", isValid: false}
}

const Login = (props) => {
  const [email, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null}) // the initial state's isValid is set to null coz if its set to false then on page load up field will be coloured red.
  const [password, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: null})
  /* const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
  /* const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  /* useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        email.includes('@') && password.trim().length > 6
      );  
    }, 300);
    
    return (() => {  // This is a clean up func. It runs before the code inside useEffect func is executed except the 1st time i.e. when the app renders 1st time, only the setTimeout func will run but afterwards when either (or both) of the dependencies changes, 1st the cleap up func runs then setTimeout func. This is coz after every key stroke, a new setTimeout func is added to the callback queue. But clean up func before adding a new setTimeout func to the callback queue, dels the prev one. Clean up func also runs whenever the component it is defined in is unmounted from the DOM like when we click on login button, Login component is removed from DOM so clean up func runs. 
      console.log("clean up!")
      clearTimeout(timer)
    })
  }, [email, password]) */

  const emailChangeHandler = (event) => {  
    dispatchEmail({type: "INPUT", val: event.target.value}); // Here we are sending the action onject {type: "USER_INPUT", val: event.target.value} to emailReducer func. 
    setFormIsValid(
      email.isValid && password.isValid 
    ); 
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "INPUT", val: event.target.value});
    setFormIsValid(
     password.isValid && email.isValid
    ); 
  };

  const emailBlurHandler = () => {
    dispatchEmail({type: "BLUR"}) // here the action object that is being sent to emailReducer func has only 1 item i.e. type. So inside else if of emailReducer func there is only action.type
  };

  const passwordBlurHandler = () => {
    dispatchPassword({type: "BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${email.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        <div className={`${classes.control} ${password.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
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
