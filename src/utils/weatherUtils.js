// Utility function to determine weather condition based on temperature
export const getWeatherCondition = (temperature) => {
  // I use this as a test line to test hot, warm, and cold conditions.
  // I wanted to set it to where the pop-up model would automatically select hot, warm, or cold as a default depending on the current temperature.
  // temperature = Number(temperature+90);
  // console.log("Adjusted temperature:", temperature);
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
