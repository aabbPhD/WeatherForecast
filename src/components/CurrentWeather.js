import '../styles/currentweather.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { translations } from '../config/translations';


export default function CurrentWeather({weatherIcon, temp, windspeed, humidity, precipitationProbability, day, formattedTime, utcOffset, weather, tempUnits, latitude, longtitude}) {
    const language = useSelector(state => state.language.language);

    return (
        <div className='current-weather'>
            <div className='current--left-block'>
                <div className='current--weather-and-temp'>
                    <div className='current--weather-icon'><img src={weatherIcon} alt='weather_icon'/></div>
                    <div className='current--temp'><p>{temp}° {tempUnits}</p></div>
                </div>  
                <div className='current--all-params'>
                    <div className='current--other-params'>
                        <p>{translations[language].weather_lat}: {latitude}°</p>
                        <p>{translations[language].weather_long}: {longtitude}°</p>
                    </div> 
                    <div className='current--other-params'>
                        <p>{translations[language].weather_humidity}: {humidity}%</p>
                        <p>{translations[language].weather_precipitation}: {precipitationProbability}%</p>
                        <p>{translations[language].weather_wind}: {windspeed} {translations[language].weather_wind_units}</p>
                    </div>  
                </div>     
            </div>
            <div className='current--right-block'>
                <p className='current--day'>{day}</p>
                <p><span className='utc'>UTC({utcOffset})</span> <span>{formattedTime}</span></p>
                <p className='current--weather-description'>{weather}</p>
            </div>         
        </div>   
    )
}