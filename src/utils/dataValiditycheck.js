import { isEmpty, isNil } from 'lodash-es'
import { WiDaySunny, WiDaySunnyOvercast, WiSnowWind, WiCloudy, WiRain } from "weather-icons-react";
import moment from 'moment';
// import HourlyForecast from 'HourlyForecast';

/**
 * Check if the given value is valid or not
 * @param {*} value
 * @returns {Boolean}
 */
export const isValid = (value) => {
  return !isEmpty(value) && !isNil(value)
}


export const weatherIconSwitch=( (info)  =>{
    switch (info) {
      case "Sunny":
        return <WiDaySunny size={50} color="#fada5e" />;
      case "Partially Cloudy":
        return <WiDaySunnyOvercast size={50} color="#fada5e" />;
      case "Snow":
        return <WiSnowWind size={50} color="#fada5e" />;
      case "Clouds":
            return <WiCloudy size={50} color="#fada5e" />;
       case "Rain":
            return <WiRain size={50} color="#fada5e" />;
        default:
            return <WiDaySunny size={50} color="#fada5e" />;
    }
    })
  
export const itemData = date => {
    return moment(date, "YYYY-MM-DD HH:mm:ss")
}

