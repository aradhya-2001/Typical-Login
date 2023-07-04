import classes from "./Input.module.css";

const Input = (props) => {
  const capsLabel = props.label.charAt(0).toUpperCase() + props.label.slice(1)

  return (
    <div className={`${classes.control} ${props.data.isValid === false ? classes.invalid : ""}`}
    >
      <label htmlFor={props.label}>{capsLabel}</label>
      <input
        type={props.label}
        id={props.label}
        value={props.data.value}
        onChange={props.onChange}
        onBlur={props.onBlur} // when we click somewhere out of the input field, validatePswordHandler func will run
      />
    </div>
  );
};

export default Input;
