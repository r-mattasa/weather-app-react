/* Hourly Forecasts */
import React, { useState, useEffect } from 'react';
import './../index.css';
import { PropTypes } from 'prop-types'
import { WiCelsius } from "weather-icons-react";
import moment from 'moment';
import { weatherIconSwitch, isValid } from "../utils/dataValiditycheck";
import HourlyForecast from './HourlyForecast';


const WeeklyForecast = ({ dayforecast, hourlyforecast,citySearch }) => {

  const date = new Date();
  const today = moment(date).format('ddd Do');
  const [chosenDay, setSelecetdDay] = useState(today);

  const getSelectedDay = (day) => {
    if (isValid(day))
      setSelecetdDay(day)
  }

  useEffect(() => {
    setSelecetdDay(chosenDay);
  }, [chosenDay,citySearch])

  return (
    <div className="flex-container">
      {dayforecast.length > 0 &&
        <p className='forecastTitle' > Weekly Forecast </p>}
      { /* Onclick event*/}
      <div className="sunset-box">
        {dayforecast.slice(0, 6).map((item) =>
          <div className="sunset" onClick={() => getSelectedDay(moment.unix(item.dt).format('ddd Do'))} key={item.dt}>
            <p>{moment.unix(item.dt).format('ddd  Do ')}</p>
            <p>{weatherIconSwitch(item.weather[0].main)} </p>
            <p>
              <span style={{ fontSize: "22px", paddingRight: "10px" }}>{Math.round(item.temp.max)}</span>
              <span style={{ fontSize: "15px", paddingRight: "2px" }}>{Math.round(item.temp.min)}</span>  <WiCelsius size={25} color='#fff' />
           </p>
            <p>{item.weather[0].main}</p>
          </div>
        )
        }
      </div>
      {/* Hourly weather forecast Component  */}
      {hourlyforecast && citySearch && 
        <HourlyForecast
        forecasts={hourlyforecast}
        getSelectedDay={chosenDay}
      />}
      {  /* end flex container */}
    </div>

  )
}

export default WeeklyForecast;

WeeklyForecast.propTypes = {
  dayforecast: PropTypes.object,
  hourlyforecast:PropTypes.object,
}