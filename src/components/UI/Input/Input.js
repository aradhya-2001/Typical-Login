import { useRef, useImperativeHandle, forwardRef } from "react";

import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const capsLabel = props.label.charAt(0).toUpperCase() + props.label.slice(1)

  const inputRef = useRef()

  const activateFocus = () => {
    inputRef.current.focus()
  }
  useImperativeHandle(ref, () => {
    return{
      activateFocus:activateFocus // the func activateFocus() is exported to parent component under name activateFocus and will be availabe to ref of parent component.
    }
  }) 

  return (
    <div className={`${classes.control} ${props.data.isValid === false ? classes.invalid : ""}`}
    >
      <label htmlFor={props.label}>{capsLabel}</label>
      <input
        ref={inputRef}
        type={props.label}
        id={props.label}
        value={props.data.value}
        onChange={props.onChange}
        onBlur={props.onBlur} // when we click somewhere out of the input field, validatePswordHandler func will run
      />
    </div>
  );
});

export default Input;
