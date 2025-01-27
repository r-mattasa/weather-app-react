/* Hourly Forecasts */
import "./../index.css";
import { WiCelsius } from "weather-icons-react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { PropTypes } from "prop-types";
import { weatherIconSwitch } from "../utils/dataValiditycheck";

const HourlyForecast = ({ forecasts }) => {
  const date = new Date();
  const today = moment(date).format("ddd Do");

  console.log("selectedday forecasts", forecasts);
  const getDayHourlyForecast = forecasts.filter((f) => {
    let d = moment.unix(f.dt).format("ddd Do");
    console.log("Day", d);
    return d === today;
  });

  return (
    <Row>
      <Col>
        <div className="flex-container">
          {/* Hourly forecast */}
          {getDayHourlyForecast.length > 0 ? (
            <div className="forecast-box">
              {getDayHourlyForecast.map((f) => (
                <div className="hourly" key={f.dt}>
                  <p> {moment.unix(f.dt).format("hh:mm:A")}</p>
                  <p> {weatherIconSwitch(f.weather[0].main)} </p>
                  <p>
                    {" "}
                    {Math.round(f.main.temp)}{" "}
                    <WiCelsius size={20} color="#fada5e" />{" "}
                  </p>

                  <p> {f.weather[0].main} </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="forecast-info-box">
              {" "}
              No hourly forecast available for today
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};
HourlyForecast.propTypes = {
  forecasts: PropTypes.array,
  getSelectedDay: PropTypes.string,
};

export default HourlyForecast;
