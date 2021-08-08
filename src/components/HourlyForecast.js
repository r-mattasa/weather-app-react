/* Hourly Forecasts */
import React from 'react';
import './../index.css';
import { WiCelsius } from "weather-icons-react";
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { PropTypes } from 'prop-types'
import { weatherIconSwitch } from "../utils/dataValiditycheck";


const HourlyForecast = ({ forecasts, getSelectedDay }) => {
    const getDayHourlyForecast =
        forecasts.filter((f) => {
            let d = (moment.unix(f.dt).format('ddd Do'));
            return (d === getSelectedDay);
        })

    return (
        <Row>
            <Col>
                <div className="flex-container">
                    {/* Hourly forecast */}
                    { getDayHourlyForecast.length > 0 ? 
                    ( <div className="forecast-box">
                        {
                            getDayHourlyForecast.map((f) =>
                                <div className="hourly" key={f.dt}>
                                    <p> {moment.unix(f.dt).format('ddd  Do ')}</p>
                                    <p> {weatherIconSwitch(f.weather[0].main)} </p>
                                    <p> {Math.round(f.main.temp)} <WiCelsius size={20} color='#fada5e' /> </p>
                                    <p> {moment.unix(f.dt).format('hh:mm:A')}</p>
                                    <p> {f.weather[0].main} </p>
                                </div>
                            )
                        }
                        </div>  ) : (<div className="forecast-info-box"> No more hourly forecast available for {getSelectedDay} </div>)
                     }
                </div>
            </Col>
        </Row>
    )
}
HourlyForecast.propTypes = {
    forecast: PropTypes.array,
    getSelectedDay: PropTypes.string
};

export default HourlyForecast
