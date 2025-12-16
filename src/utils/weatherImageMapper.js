// Weather image mapper utility
// Maps OpenWeatherMap API conditions to local SVG images

import sunny from '../assets/images/sunny.svg';
import night from '../assets/images/night.svg';
import cloudy from '../assets/images/cloudy.svg';
import cloudyNight from '../assets/images/cloudyNight.svg';
import rain from '../assets/images/rain.svg';
import rainyNight from '../assets/images/rainyNight.svg';
import snow from '../assets/images/snow.svg';
import snowyNight from '../assets/images/snowyNight.svg';
import storm from '../assets/images/storm.svg';
import stormyNight from '../assets/images/stormyNight.svg';
import fog from '../assets/images/fog.svg';
import foggyNight from '../assets/images/foggyNight.svg';

/**
 * Determines if it's daytime or nighttime based on the API icon code
 * @param {string} icon - Weather icon code from API (e.g., "10d" or "10n")
 * @returns {boolean} - True if daytime, false if nighttime
 */
const isDaytime = (icon) => {
  if (!icon) return true; // Default to day if no icon provided
  return icon.endsWith('d');
};

/**
 * Maps weather condition ID to appropriate image based on time of day
 * @param {number} conditionId - Weather condition ID from OpenWeatherMap API
 * @param {string} icon - Weather icon code (for day/night detection)
 * @returns {string} - Path to the appropriate SVG image
 * 
 * Weather condition ID ranges:
 * - 200-232: Thunderstorm
 * - 300-321: Drizzle
 * - 500-531: Rain
 * - 600-622: Snow
 * - 701-781: Atmosphere (fog, mist, haze, etc.)
 * - 800: Clear sky
 * - 801-804: Clouds
 */
export const getWeatherImage = (conditionId, icon) => {
  const isDay = isDaytime(icon);
  
  // Thunderstorm (200-232)
  if (conditionId >= 200 && conditionId < 300) {
    return isDay ? storm : stormyNight;
  }
  
  // Drizzle (300-321) - treat as rain
  if (conditionId >= 300 && conditionId < 400) {
    return isDay ? rain : rainyNight;
  }
  
  // Rain (500-531)
  if (conditionId >= 500 && conditionId < 600) {
    return isDay ? rain : rainyNight;
  }
  
  // Snow (600-622)
  if (conditionId >= 600 && conditionId < 700) {
    return isDay ? snow : snowyNight;
  }
  
  // Atmosphere: fog, mist, haze, dust, etc. (701-781)
  if (conditionId >= 700 && conditionId < 800) {
    return isDay ? fog : foggyNight;
  }
  
  // Clear sky (800)
  if (conditionId === 800) {
    return isDay ? sunny : night;
  }
  
  // Clouds (801-804)
  if (conditionId >= 801 && conditionId <= 804) {
    return isDay ? cloudy : cloudyNight;
  }
  
  // Default fallback
  return isDay ? sunny : night;
};

/**
 * Gets alt text description for the weather image
 * @param {object} condition - Weather condition object from API
 * @returns {string} - Descriptive alt text
 */
export const getWeatherImageAlt = (condition) => {
  if (!condition || !condition.description) {
    return 'Weather illustration';
  }
  return `${condition.description} weather illustration`;
};
