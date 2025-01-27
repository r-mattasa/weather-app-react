import ".././App.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CurrentWeather from "./CurrentWeather";
import WeeklyForecast from "./WeeklyForecast";
import Search from "./search";
import HourlyForecast from "./HourlyForecast";
import Autocomplete from "react-google-autocomplete";

function WeatherInfoContainer() {
  // const [query, setQuery] = useState("");
  // const [suggestions, setSuggestions] = useState([]);
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [error, setErrorInfo] = useState(false);
  const [city, setCity] = useState("");
  // const [currentCity, setcurrentCity] = useState("");
  const [weatherInfo, setWeatherData] = useState([]);
  const [weeklyforecast, setweeklyforecastData] = useState([]);
  const [hourlyforecast, setHourlyForecastData] = useState([]);

  //Daily or five day forecast api
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const API_URL = import.meta.env.VITE_OPENWEATHER_API_URL;
  const ACCU_KEY = import.meta.env.VITE_APP_ACCU_KEY;
  const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_KEY;
  const currentWeather = `${API_URL}/weather/?q=${city}&units=metric&APPID=${API_KEY}`;
  const dailyForecast = `${API_URL}/forecast?q=${city}&units=metric&cnt=40&appid=${API_KEY}`; //5 day forecast
  const dailyweather = `${API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`; //dailyweather by coordinates
  const getlocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${API_KEY}`;
  // const onecallAPI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const onecallAPI = `${API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`;

  // const [intialLon, setIntialLon] = useState('');
  // const [intiallat, setIntialLat] = useState('');
  const handleGeolocationError = () => {
    console.log("Geolocation access failed");
    setErrorInfo(true);
  };

  // get users geolocation

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLon(position.coords.longitude);
      setLat(position.coords.latitude);
    }, handleGeolocationError);
  }, []);

  useEffect(() => {
    if (lat && lon) {
      const fetchData = async () => {
        await fetch(dailyweather)
          .then((res) => res.json())
          .then((result) => {
            console.log("Resukts..", result, result.name);
            setWeatherData(result);
            // setcurrentCity(result.name);
            setCity(result.name);
            setHourlyForecastData(result.list);
          });
      };
      fetchData();
    }
  }, [dailyweather, lat, lon]);

  useEffect(() => {
    const fetchForecastData = async () => {
      Promise.all([
        // fetch(currentWeather),
        fetch(onecallAPI),
        fetch(dailyForecast),
      ])
        .then(([res2, res3]) => {
          if (res2.ok && res3.ok) {
            return Promise.all([res2.json(), res3.json()]);
          }
          throw Error(res2.statusText, res3.statusText);
        })
        .then(([r2, r3]) => {
          // setWeatherData(r);
          console.log("r3 results....", r2, r3);
          const dailyForecastsData = r3.list.filter((reading) =>
            reading.dt_txt.includes("12:00:00")
          );
          console.log("Daily forecasts", dailyForecastsData);
          setweeklyforecastData(dailyForecastsData);
          setHourlyForecastData(r3.list);
          setErrorInfo(false);
        })
        .catch((error) => {
          console.log("What us the error please", error);
          // setQuery("");
          setErrorInfo(true);
          setWeatherData({});
          setweeklyforecastData([]);
          setHourlyForecastData([]);
        });
    };
    if (city) fetchForecastData();
  }, [city, dailyForecast, onecallAPI]);

  const [cityList, setCityList] = useState([]);
  /*   useEffect(() => {
    const loadCities = async () => {
      await fetch(
        `api/locations/v1/cities/autocomplete?apikey=${ACCU_KEY}&q=${city}&language=en-us`
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("cities", result);
          setCityList(result);
        })
        .catch((error) => {
          console.log(error);
          setErrorInfo(true);
        }); 
    };

    loadCities();
  }, [city]); */

  const loadCities = async (query) => {
    if (!query) {
      // setSuggestions([]);
      setCityList([]);
      return;
    }

    if (query.length > 5) {
      await fetch(
        `api/locations/v1/cities/autocomplete?apikey=${ACCU_KEY}&q=${city}&language=en-us`
      )
        /*  await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      ) */
        .then((response) => response.json())
        .then((result) => {
          console.log("Onchange citie list", result);
          setCityList(result);
        })
        .catch((error) => {
          console.log(error);
          setErrorInfo(true);
        });
    }
  };

  const handleCityInputChange = (e) => {
    /*     let matches = [];
    if (text.length > 0) {
      matches = cityList.filter((city) => {
        const regex = new RegExp(`${text}`, "gi");
        return city.EnglishName.match(regex);
      });
    }
    setSuggestions(matches); */
    const cityText = e.target.value;
    setCity(cityText);
    loadCities(cityText);
  };

  const getLocationAPI = () => {
    // if (evt.key === "Enter") {
    fetch(getlocation)
      .then((response) => response.json())
      .then((result) => {
        setLon(result[0].lon);
        setLat(result[0].lat);
      })
      .catch((error) => {
        console.log(error);
        setErrorInfo(true);
      });
    // }
  };

  const onSuggestHandler = (val) => {
    setCity(val);
    setCityList([]);
  };

  const hideVisibility = () => {
    setTimeout(() => {
      setCityList([]);
    }, 100);
  };

  const handleSearch = () => {
    if (city.trim()) {
      getLocationAPI(city);
      // setSuggestions([]);
      setCityList([]);
    }
  };

  return (
    <Container className="weatherinfopanel">
      <Row>
        <Col>
          {/* Search Component  */}
          <div>{city}</div>
          <Autocomplete
            apiKey={GOOGLE_API_KEY}
            onPlaceSelected={(place) => {
              console.log(place);
            }}
          />
          ;
          {
            <div>
              {
                <Search
                  cityValue={city}
                  cityChangeValue={handleCityInputChange}
                  cityListSuggestions={cityList}
                  onClickItem={onSuggestHandler}
                  visibility={hideVisibility}
                  onSubmit={handleSearch}
                />
              }
            </div>
          }
          <div
            className={
              typeof weatherInfo.main !== "undefined"
                ? weatherInfo.main.temp > 16
                  ? "app warm "
                  : "app"
                : "app"
            }
          >
            <div>
              {/* Current weather Component  */}

              {weatherInfo.main && city && (
                <CurrentWeather weather={weatherInfo} />
              )}
              {/* hourly forecasts */}
              <p className="forecastTitle"> Hourly forecasts</p>
              {hourlyforecast && <HourlyForecast forecasts={hourlyforecast} />}
            </div>
            <div>
              {/* weekly weather forecast Component  */}
              {weeklyforecast && (
                <WeeklyForecast
                  dayforecast={weeklyforecast}
                  citySearch={city}
                />
              )}
            </div>
            <div>
              {" "}
              {!weatherInfo.main && !weeklyforecast
                ? error
                : "Weather Forecast excercises"}{" "}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WeatherInfoContainer;
