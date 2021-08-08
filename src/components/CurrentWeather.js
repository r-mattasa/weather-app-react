import React from 'react';
import './../index.css';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

import { WiDaySunny, WiCelsius, WiDaySunnyOvercast, WiSnowWind, WiCloudy, WiRain, WiDayThunderstorm } from "weather-icons-react";

const CurrentWeather = ({ weather }) => {

  const weatherIconSwitch = ((info) => {
    switch (info) {
      case "Sunny":
        return <WiDaySunny size={50} color="#fff" />;
      case "Partially Cloudy":
        return <WiDaySunnyOvercast size={50} color="#fff" />;
      case "Snow":
        return <WiSnowWind size={50} color="#fff" />;
      case "Clouds":
        return <WiCloudy size={50} color="#fff" />;
      case "Rain":
        return <WiRain size={50} color="#fff" />;
      case "ThunderStrom":
        return <WiDayThunderstorm size={50} color="#fff" />;
      default:
        return <WiDaySunny size={50} color="#fff" />;
    }
  })

  return (

    <Row>
      <Col>
        <div>
          {(typeof weather.main != "undefined") ? (
            <div className="weather-box">
              <div className="location-box">
                <div className="location"> {weather.name}, {weather.sys.country}</div>
                <div className="location">{moment().format('dddd')}  {moment().format('LL')} </div>
              </div>

              <div className="temp-info-box">
                <div >
                  <div className="temp"> {Math.round(weather.main.temp)}<WiCelsius size={45} color='#fff' /></div>
                  <p>  {weatherIconSwitch(weather.weather[0].main)} </p>
                  <p className="description" > {weather.weather[0].description}</p>
                 </div>
                  <div className="temp">
                  <p> High: {Math.round(weather.main.temp_max)} <WiCelsius size={25} color='#fff' /> </p>
                  <p> Humidity: {weather.main.humidity}  </p>
                 </div>
                  <div className="temp">
                  <p> Low: {Math.round(weather.main.temp_min)} <WiCelsius size={25} color='#fff' /> </p>
                  <p> Wind: {weather.wind.speed} </p>
                </div>

              </div>

            </div>

          ) : ( '')}
        </div>

      </Col>
    </Row>

  )
}
export default CurrentWeather;