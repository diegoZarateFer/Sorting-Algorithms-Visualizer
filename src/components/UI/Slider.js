import classes from "./Slider.module.css";

const Slider = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <label className={`${classes["slider"]} ${props.disabled ? classes["slider__disabled"] : null}`}>
      {props.legend}
      <input
        value={props.value}
        type="range"
        disabled={props.disabled}
        min={props.min}
        max={props.max}
        step={1}
        onChange={handleChange}
      />
    </label>
  );
};

export default Slider;
