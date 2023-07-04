import React, { useReducer, useEffect, useState, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

const emailReducer = (emailState, action) => {
  if (action.type === "INPUT") {
    return { value: action.val, isValid: action.val.includes("@") }; // emailState is the current email state and has been set as an object having 2 items -> value and isValid. In this if statement, these items are populated and returned to email variable and to emailState.
  } else if (action.type === "BLUR") {
    return { value: emailState.value, isValid: emailState.isValid }; // when we are typing in input field, dispatchEmail func triggers emailReducer func on every key stroke. Then emailReducer updates the emailState accordingly. Then when we click outside input, emailReducer func is called by dispatcher and React puts the latest state of email to its parameter emailState and else if is triggered which doesn't update state just returns the current one.
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.val, isValid: action.val.length > 6 };
  } else if (action.type === "BLUR") {
    return { value: state.value, isValid: state.isValid };
  }
  return { value: "", isValid: false };
};

/* const formReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return {
      email: { value: action.val, isValid: action.val.includes("@") },
      password: {
        value: state.password.value,
        isValid: state.password.isValid,
      },
      formIsValid: action.val.includes("@") && state.password.isValid,
    };
  } else if (action.type === "PASSWORD_INPUT") {
    return {
      email: { value: state.email.value, isValid: state.email.isValid },
      password: { value: action.val, isValid: action.val.length > 6 },
      formIsValid: state.email.isValid && action.val.length > 6,
    };
  } else if (action.type === "BLUR") {
    return {
      email: { value: state.email.value, isValid: state.email.isValid },
      password: {
        value: state.password.value,
        isValid: state.password.isValid,
      },
      formIsValid: state.email.isValid && state.password.isValid,
    };
  }

  return {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    formIsValid: false,
  };
}; */

const Login = () => {
  const [email, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  }); // the initial state's isValid is set to null coz if its set to false then on page load up field will be coloured red.
  const [password, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  /* const [form, dispatchForm] = useReducer(formReducer, {
    email: { value: "", isValid: null },
    password: { value: "", isValid: null },
    formIsValid: null,
  }); */
  /* const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); 
   const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("checking validity");
      setFormIsValid(email.isValid && password.isValid);
    }, 300);

    return () => {
      // This is a clean up func. It runs before the code inside useEffect func is executed except the 1st time i.e. when the app renders 1st time, only the setTimeout func will run but afterwards when either (or both) of the dependencies changes, 1st the cleap up func runs then setTimeout func. This is coz after every key stroke, a new setTimeout func is added to the callback queue. But clean up func before adding a new setTimeout func to the callback queue, dels the prev one. Clean up func also runs whenever the component it is defined in is unmounted from the DOM like when we click on login button, Login component is removed from DOM so clean up func runs.
      console.log("clean up!");
      clearTimeout(timer);
    };
  }, [
    email.isValid,
    password.isValid,
  ]); /* earlier this was running for every key strokes. After the form is valid we dont need to check further */

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "INPUT", val: event.target.value }); // Here we are sending the action onject {type: "USER_INPUT", val: event.target.value} to emailReducer func.
    /* setFormIsValid(
      email.isValid && password.isValid 
    ); */
    /*  dispatchForm({ type: "EMAIL_INPUT", val: event.target.value }); // Here we are sending the action onject {type: "USER_INPUT", val: event.target.value} to emailReducer func.*/
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "INPUT", val: event.target.value });
    /* setFormIsValid(
     password.isValid && email.isValid
    ); */
    /* dispatchForm({ type: "PASSWORD_INPUT", val: event.target.value }); */
  };

  const emailBlurHandler = () => {
    dispatchEmail({ type: "BLUR" }); // here the action object that is being sent to Reducer func has only 1 item i.e. type. So inside else if of Reducer func there is only action.type
  };

  const passwordBlurHandler = () => {
    dispatchPassword({ type: "BLUR" });
  };

  const ctx = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          data={email}
          label="e-mail"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        ></Input>
        <Input
          data={password}
          label="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
