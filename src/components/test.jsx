import ".././App.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CurrentWeather from "./CurrentWeather";
import WeeklyForecast from "./WeeklyForecast";
import Search from "./search";

function WeatherInfoContainer() {
  const [suggestions, setSuggestions] = useState([]);
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [error, setErrorInfo] = useState(false);
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherData] = useState(null);
  const [weeklyforecast, setWeeklyForecastData] = useState([]);
  const [hourlyforecast, setHourlyForecastData] = useState([]);
  const [cityList, setCityList] = useState([]);

  // API Configuration
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const API_URL = import.meta.env.VITE_OPENWEATHER_API_URL;
  const ACCU_KEY = import.meta.env.VITE_APP_ACCU_KEY;

  const currentWeather = `${API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;
  const dailyForecast = `${API_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  const dailyWeatherByCoords = `${API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const oneCallAPI = `${API_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  const handleGeolocationError = () => {
    console.error("Geolocation access failed");
    setErrorInfo(true);
  };

  // Fetch initial location-based weather data
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLon(position.coords.longitude);
      setLat(position.coords.latitude);
    }, handleGeolocationError);
  }, []);

  useEffect(() => {
    if (lat && lon) {
      const fetchInitialWeather = async () => {
        try {
          const response = await fetch(dailyWeatherByCoords);
          const result = await response.json();
          setWeatherData(result);
        } catch (error) {
          console.error("Error fetching initial weather data:", error);
          setErrorInfo(true);
        }
      };
      fetchInitialWeather();
    }
  }, [lat, lon]);

  // Fetch forecast data when latitude and longitude are updated
  useEffect(() => {
    if (lat && lon) {
      const fetchForecastData = async () => {
        try {
          const [res1, res2, res3] = await Promise.all([
            fetch(currentWeather),
            fetch(oneCallAPI),
            fetch(dailyForecast),
          ]);
          if (res1.ok && res2.ok && res3.ok) {
            const [data1, data2, data3] = await Promise.all([
              res1.json(),
              res2.json(),
              res3.json(),
            ]);
            setWeatherData(data1);
            setWeeklyForecastData(data2.daily);
            setHourlyForecastData(data3.list);
            setErrorInfo(false);
          } else {
            throw new Error("Error fetching forecast data");
          }
        } catch (error) {
          console.error(error);
          setErrorInfo(true);
        }
      };
      fetchForecastData();
    }
  }, [lat, lon]);

  // Fetch city suggestions
  useEffect(() => {
    if (city) {
      const loadCities = async () => {
        try {
          const response = await fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCU_KEY}&q=${city}`
          );
          const result = await response.json();
          setCityList(result);
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
          setErrorInfo(true);
        }
      };
      loadCities();
    }
  }, [city]);

  // Handle city input changes
  const onCityChangeHandler = (text) => {
    setCity(text);
  };

  // Handle suggestion click
  const onSuggestHandler = (val) => {
    setCity(val);
    setCityList([]);
  };

  // Hide suggestions after a timeout
  const hideVisibility = () => {
    setTimeout(() => {
      setCityList([]);
    }, 100);
  };

  return (
    <Container className="weatherinfopanel">
      <Row>
        <Col>
          <div
            className={
              weatherInfo?.main
                ? weatherInfo.main.temp > 16
                  ? "app warm"
                  : "app"
                : "app"
            }
          >
            {/* Search Component */}
            <Search
              cityValue={city}
              cityChangeValue={onCityChangeHandler}
              cityListSuggestions={cityList}
              onClickItem={onSuggestHandler}
              visibility={hideVisibility}
            />
            {/* Current Weather Component */}
            {weatherInfo && <CurrentWeather weather={weatherInfo} />}
            {/* Weekly Forecast Component */}
            {weeklyforecast.length > 0 && (
              <WeeklyForecast
                dayForecast={weeklyforecast}
                hourlyForecast={hourlyforecast}
                citySearch={city}
              />
            )}
            {/* Error or Placeholder */}
            {!weatherInfo?.main && !weeklyforecast.length && error && (
              <div>Could not fetch weather information. Please try again.</div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WeatherInfoContainer;
