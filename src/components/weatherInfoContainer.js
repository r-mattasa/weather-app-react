import '.././App.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Search from './search';
import CurrentWeather from './CurrentWeather';
import WeeklyForecast from './weeklyForecast';


function WeatherInfoContainer() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [lon, setLon] = useState('');
    const [lat, setLat] = useState('');
    const [error, setErrorInfo] = useState(false);
    const [city, setCity] = useState('');
 

    //Daily or five day forecast api
    const currentWeather = `${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
    const dailyForecast = `${process.env.REACT_APP_API_URL}/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;//5 day forecast
    const getlocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${process.env.REACT_APP_API_KEY}`
    const onecallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

    const [intialLon, setIntialLon] = useState('');
    const [intiallat, setIntialLat] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setIntialLon(position.coords.latitude);
            setIntialLat(position.coords.longitude);
        });

        const fetchData = async () => {
            await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${intialLon}&lon=${intiallat}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(result => {
                    setWeatherData(result)
                });

        }
        fetchData();

    }, [intiallat, intialLon]);

    const [weatherInfo, setWeatherData] = useState([]);
    const [weeklyforecast, setweeklyforecastData] = useState([]);
    const [hourlyforecast, setHourlyForecastData] = useState([]);

    useEffect(() => {
        const fetchForecastData = async () => {
            Promise.all([fetch(currentWeather), fetch(onecallAPI), fetch(dailyForecast)])
                .then(([res1, res2, res3]) => {
                    if (res1.ok && res2.ok && res3.ok) {
                        return Promise.all([res1.json(), res2.json(), res3.json()]);
                    }
                    throw Error(res1.statusText, res2.statusText, res3.statusText);
                })
                .then(([r, r2, r3]) => {
                    setWeatherData(r);
                    setweeklyforecastData(r2.daily);
                    setHourlyForecastData(r3.list);
                    setErrorInfo(false)
                })
                .catch(error => {
                    console.log(error);
                    setQuery('');
                    setErrorInfo(true);
                    setWeatherData({})
                    setweeklyforecastData([]);
                    setHourlyForecastData([]);
                });

        }
        fetchForecastData();
    }, [lat, lon])

    const [cityList, setCityList] = useState([]);
    useEffect(() => {
        const loadCities = async () => {
            await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=FbFeDyouDKFDIsgvjDcc3ii9LutTTrMu&q=${city}`)
                .then(response => response.json())
                .then(result => {
                    setCityList(result);
                }).catch(error => {
                    console.log(error);
                    setErrorInfo(true);
                })
        }

        loadCities();

    }, [city])


    const onCityChangeHandler = (text) => {
        let matches = [];
        if (text.length > 0) {
            matches = cityList.filter(city => {
                const regex = new RegExp(`${text}`, "gi");
                return city.EnglishName.match(regex);
            })
        }
        setSuggestions(matches)
        //setCity(val);
    }

    const getLocationAPI = evt => {
        if (evt.key === "Enter") {
            fetch(getlocation)
                .then(response => response.json())
                .then(result => {

                    setLon(result[0].lon);
                    setLat(result[0].lat);
                }).catch(error => {
                    console.log(error);
                    setErrorInfo(true);
                })
        }
    };


    const onSuggestHandler = ((val, val2, val3) => {
        setCity(val + ',' + val3);
        setCityList([])
    })

    const hideVisibility = (() => {
        setTimeout(() => {
            setCityList([])
        }, 100
        )
    })

    return (
        <Container className='weatherinfopanel'>
            <Row >
                <Col>
                    <div className={(typeof weatherInfo.main !== "undefined") ? ((weatherInfo.main.temp > 16) ? 'app warm ' : 'app') : 'app'} >

                        {/* Search Component  */  }

                        <div>
                            <Search
                                cityValue={city}
                                cityChangeValue={e => (setCity(e.target.value))}
                                cityListSuggestions={cityList}
                                onClickItem={onSuggestHandler}
                                visibility={hideVisibility}
                                onSubmit={getLocationAPI}
                            />
                        </div>

                        {/* Current weather Component  */}
                        {weatherInfo &&
                            <CurrentWeather
                                weather={weatherInfo}
                            />}

                        {/* Days/weekly weather forecast Component  */}
                        {weeklyforecast &&
                            <WeeklyForecast
                            dayforecast={weeklyforecast}
                            hourlyforecast={hourlyforecast}
                            citySearch= {city}
                            />
                        }

                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default WeatherInfoContainer;
