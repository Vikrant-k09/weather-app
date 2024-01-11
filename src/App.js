import './App.css';
import Search from './Search';
import CurrentWeather from './Current-weather';
import {Weather_api_url,Weather_api_key} from "./Api";
import { useState } from 'react';
import Forecast from './Forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${Weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_api_key}&units=metric`
    );
    const forecastFetch = fetch(
      `${Weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_api_key}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
         
      
    </div>
  );
}

export default App;