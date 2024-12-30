import '../styles/dailyforecast.scss';
import React from 'react';
import { daysOfWeek_short, weatherIcons } from './constants';

const DailyForecast = React.memo(({daily, selectedDay, setSelectedDay}) => {

    //список элементов дней недели, по нажатию на которые можно посмотреть погоду в этот день
    const dailyForecast = React.useMemo(() => {
        return daily.time.map((item, index) => {
            const day = daysOfWeek_short[(new Date(item).getDay())]
            const weatherCode = daily.weathercode[index]
            const weatherIcon = [0, 1, 2].includes(weatherCode)
                ? weatherIcons[weatherCode][0]
                : weatherIcons[weatherCode];
    
            return  <li key={index} className={`daily-forecast--item${index === selectedDay ? ' active' : ''}`}>
                        <p className='daily-forecast--day'>{day}</p>
                        <img className='daily-forecast--weather-icon' 
                                src={weatherIcon} 
                                alt='weather_icon'
                                onClick={()=>setSelectedDay(index)}/>
                        <p className='daily-forecast--temp'>
                            <span>{Math.round(daily.temperature_2m_max[index])}° </span>
                            <span>{Math.round(daily.temperature_2m_min[index])}°</span>
                        </p>
                    </li>
        })
    }, [daily, selectedDay]) 

    return (
        <ul className='daily-forecast'>
            {dailyForecast}
        </ul>   
    )
});

export default DailyForecast;