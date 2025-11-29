/**
 * Utility function to determine weather condition based on temperature
 * @param {number} temperature - Temperature in Fahrenheit
 * @returns {string} - Weather condition: 'hot', 'warm', or 'cold'
 */

export const getWeatherCondition = (temperature) => {
  //temperature += 50; // Adjust temperature scale
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  }
  return "cold";
};
