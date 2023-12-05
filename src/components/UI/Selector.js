import classes from "./Selector.module.css";
import SelectorButton from "./SelectorButton";

const Selector = (props) => {
  const { options, selectedIndex } = props;

  const handleOptionChange = (selectedOptionIndex) => {
    props.onChange(selectedOptionIndex);
  };

  return (
    <div className={classes["selector"]}>
      {options.map((option, optionIndex) => {
        return (
          <SelectorButton key={optionIndex} selected={props.selectedIndex === optionIndex} onClick={handleOptionChange.bind(null,optionIndex)}>
            {option}
          </SelectorButton>
        );
      })}
    </div>
  );
};

export default Selector;
