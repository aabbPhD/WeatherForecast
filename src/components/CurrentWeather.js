import '../styles/currentweather.scss';
import React from 'react';


export default function CurrentWeather({weatherIcon, temp, windspeed, humidity, precipitationProbability, day, formattedTime, utcOffset, weather, tempUnits, latitude, longtitude}) {

    return (
        <div className='current-weather'>
            <div className='current--left-block'>
                <div className='current--weather-and-temp'>
                    <div className='current--weather-icon'><img src={weatherIcon} alt='weather_icon'/></div>
                    <div className='current--temp'><p>{temp}° {tempUnits}</p></div>
                </div>  
                <div className='current--all-params'>
                    <div className='current--other-params'>
                        <p>широта: {latitude}°</p>
                        <p>долгота: {longtitude}°</p>
                    </div> 
                    <div className='current--other-params'>
                        <p>влажность: {humidity}%</p>
                        <p>осадки: {precipitationProbability}%</p>
                        <p>ветер: {windspeed} м/c</p>
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