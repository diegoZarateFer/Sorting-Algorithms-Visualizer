import { MAX_SAMPLE_HEIGHT, MIN_SAMPLE_HEIGHT } from "./constraints";

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArray = (n) => {
  const array = [];
  for (let i = 0; i < n; i++)
    array.push({
      height: getRandomInteger(MIN_SAMPLE_HEIGHT, MAX_SAMPLE_HEIGHT),
      style: "",
    });

  return array;
};
