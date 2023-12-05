import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${classes["button"]} ${
        props.disabled ? classes["button__disabled"] : null
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
