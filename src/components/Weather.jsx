import '../styles/app.scss';
import React from 'react';
import { DAY_START, NIGHT_START, HOURS_PER_DAY, MIN_PER_HOUR } from '../config/constants';
import { formatUTCOffset } from '../utils/utils';
import DailyForecast from './DailyForecast';
import TemperatureGraph from './TemperatureGraph';
import CurrentWeather from './CurrentWeather';
import moment from "moment-timezone";
import { useSelector } from 'react-redux';
import { weatherIcons } from '../config/weathericons';
import { translations, daysOfWeek_full, weatherCodeDescriptions } from '../config/translations';


const Weather = React.memo(({data, latitude, longtitude, selectedTimezone, windowWidth, weatherRef, setIsWeatherComponentVisible}) => {  
    //важно обозначить, что компонент был отрендерен, теперь до него можно делать прокрутку экрана
    React.useEffect(() => setIsWeatherComponentVisible(true), []);

    const language = useSelector(state => state.language.language);
    
    const { daily, hourly, current_weather, current_weather_units } = data;

    //для избежания путаницы в названиях
    const dataTimezone = data.timezone;

    //индекс элемента в hourly, совпадающий с текущим часом для часового пояса из запроса (dataTimezone)
    const currentHourlyIndex = React.useMemo(() => {
        const currentHour = new Date(current_weather.time).getHours();
        return hourly.time.findIndex((time) => (new Date(time)).getHours() === currentHour);
    }, [hourly, current_weather]);

    const [selectedDay, setSelectedDay] = React.useState(0);   
    const [selectedDataIndex, setSelectedDataIndex] = React.useState(currentHourlyIndex);//индекс выбранной точки на графике [0..23]
    const [selectedHourlyIndex, setSelectedHourlyIndex] = React.useState(currentHourlyIndex);//индекс элемента из массива hourly [0..167]

    //для нового запроса возвращаемся на текущее время
    React.useEffect(() => {
        setSelectedDay(0);
        setSelectedDataIndex(currentHourlyIndex);
        setSelectedHourlyIndex(currentHourlyIndex);
    }, [latitude, longtitude]);
    
    //при выборе дня или часа меняются текущие погодные данные
    React.useEffect(() => {
        setSelectedHourlyIndex(HOURS_PER_DAY * selectedDay + selectedDataIndex);
    }, [selectedDay, selectedDataIndex]);

    //погодные данные для выбранной временной отметки и выбранного часового пояса 
    const utcOffsetHours_dataTZ = moment().tz(dataTimezone).utcOffset() / MIN_PER_HOUR;
    const utcOffsetHours_selectedTZ = moment().tz(selectedTimezone).utcOffset() / MIN_PER_HOUR;
    const offsetDifference = utcOffsetHours_selectedTZ - utcOffsetHours_dataTZ;
    const formattedUtcOffset = formatUTCOffset(utcOffsetHours_selectedTZ);
    const tempUnits = current_weather_units.temperature[1];
    //сначала получаем дату для запроса с час. поясом "dataTimezone", а потом конвертируем в выбранный час. пояс "selectedTimezone"
    const date = moment.tz(hourly.time[selectedHourlyIndex], dataTimezone).tz(selectedTimezone);
    const day = daysOfWeek_full[language][date.day()];
    const hour = date.hour();
    const formattedTime = date.format("HH:mm");
    const weatherCode = hourly.weather_code[selectedHourlyIndex];
    const weather = weatherCodeDescriptions[language][weatherCode];
    const isDayTime = hour >= DAY_START && hour < NIGHT_START;
    const weatherIcon = React.useMemo(() => {
        return [0, 1, 2].includes(weatherCode)
            ? weatherIcons[weatherCode][isDayTime ? 0 : 1]
            : weatherIcons[weatherCode];
    }, [weatherCode, isDayTime]);
    const temp = Math.round(hourly.temperature_2m[selectedHourlyIndex]);
    const windspeed = Math.round(hourly.wind_speed_10m[selectedHourlyIndex] * 10) / 10;
    const humidity = hourly.relative_humidity_2m[selectedHourlyIndex];
    const precipitationProbability = hourly.precipitation_probability[selectedHourlyIndex];

    return (
        <div className='weather' ref={weatherRef}>
            <CurrentWeather weatherIcon={weatherIcon} 
                            temp={temp} 
                            windspeed={windspeed} 
                            humidity={humidity} 
                            precipitationProbability={precipitationProbability} 
                            day={day} 
                            formattedTime={formattedTime} 
                            utcOffset={formattedUtcOffset}
                            weather={weather}
                            tempUnits={tempUnits}
                            latitude={latitude}
                            longtitude={longtitude}/>
            <TemperatureGraph   hourly={hourly} 
                                firstTimestamp={HOURS_PER_DAY * selectedDay}
                                selectedDataIndex={selectedDataIndex}
                                setSelectedDataIndex={setSelectedDataIndex}
                                offsetDifference={offsetDifference}
                                windowWidth={windowWidth}/>
            <DailyForecast  daily={daily} 
                            selectedDay={selectedDay} 
                            setSelectedDay={setSelectedDay}/>
            <p className='open-meteo'>{translations[language].dataProvided} <a target="_blank" rel='noreferrer' href="https://open-meteo.com/en/about">Open-Meteo.com</a></p>
        </div>
    )
});

export default Weather;