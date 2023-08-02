import axios from 'axios';
import { FC, useState } from 'react';

interface WeatherProps {}

export const Weather: FC<WeatherProps> = ({}) => {
  const [fetching, setFetching] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    console.log('fetching weather data');
    setFetching(true);
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?q=Bangalore&APPID=6a3c8c2af649f077778a0a112934b677'
      )
      .then((res) => {
        setWeatherData(res.data);
        setFetching(false);
      })
      .catch((err) => {
        console.error(err);
        setFetching(false);
      });
  };

  return (
    <div className='weather'>
      <button onClick={fetchWeather}>Get weather details</button>
      {fetching ? (
        <p>loading.....</p>
      ) : (
        weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
          </div>
        )
      )}
    </div>
  );
};
