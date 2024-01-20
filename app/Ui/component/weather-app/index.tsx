"use client"
import React, { useState } from 'react';
import styles from '../weather-app/styles.module.css';
import search_icons from '../../../../assets/search.png';
import Image, { StaticImageData } from 'next/image';
import clear_icon from '../../../../assets/clear.png';
import rain_icon from '../../../../assets/rain.png';
import drizzle_icon from '../../../../assets/drizzle.png';
import snow_icon from '../../../../assets/snow.png';
import wind_icon from '../../../../assets/wind.png'; // Assuming this is the wind icon
import humidity_icons from '../../../../assets/humidity.png';
import Logout from '../logout';

interface WeatherData {
  weather: {
    icon: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export default function WeatherAppPage() {
  const api_key = '99d890f1ba34d7cc74403ed8c9dac136';
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>();

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;

    if (searchInput.length === 0) {
      setWeatherData(null);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${api_key}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API request failed with status: ${response.status}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };
  const celsiusToFahrenheit = (celsius: number): number => {
    return (celsius * 9/5) + 32;
  };
  const getWeatherIcon = (iconCode: string):  StaticImageData => {
    switch (iconCode) {
      case '01n':
      case '01d':
        return snow_icon;
      case '02d':
      case '02n':
        return snow_icon; 
      case '03d':
      case '03n':
        return drizzle_icon;
      case '09d':
      case '09n':
        return rain_icon;
      case '10d':
      case '10n':
        return rain_icon; 
      case '13d':
      case '13n':
        return snow_icon;
      case '50d':
      case '50n':
        return wind_icon; 
      default:
        return clear_icon;
    }
  };

  return (
    <>
      <Logout />
      <div className={styles.container}>
        <div className={styles.topBar}>
          <input
            type="text"
            className={styles.input}
            placeholder="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className={styles.searchIcon} onClick={handleSearch}>
            <Image src={search_icons} alt="search icon" />
          </div>
        </div>
        <div className={styles.weatherImage}>
          <Image src={weatherData ? getWeatherIcon(weatherData.weather.icon) : snow_icon} alt="" width={50} height={50} />
        </div>
        <div className={styles.weatherTemp}>
        {weatherData && (
          <>
            {`${weatherData.main.temp}°C`}
            <div className={styles.fahrenheitTemp}>
              <p>{`${celsiusToFahrenheit(weatherData.main.temp).toFixed(2)}°F`}</p>
            </div>
          </>
        )}
      </div>
        <div className={styles.weatherLocation}>{searchInput}</div>
        <div className={styles.dataContainer}>
          <div className={styles.element}>
            <Image src={humidity_icons} alt="" className={styles.icon} />
            <div className={styles.data}>
              <div className={styles.humidityPercent}>{weatherData && `${weatherData.main.humidity}%`}</div>
              <div className={styles.text}>Humidity</div>
            </div>
          </div>
          <div className={styles.element}>
            <Image src={wind_icon} alt="" className={styles.icon} width={60} height={60} />
            <div className={styles.data}>
              <div className={styles.humidityPercent}>{weatherData && `${weatherData.wind.speed}km/hr`}</div>
              <div className={styles.text}>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
