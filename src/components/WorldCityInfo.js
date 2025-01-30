import '../styles/sidebar.scss';
import React from 'react';
import { truncateString } from '../utils/utils';
import { useSelector } from 'react-redux';
import { translations } from '../config/translations';



export default function WorldCityInfo({selectedCity, windowWidth}) {
    const maxStringLen = 36;//урезаем строку при ширине экрана < 380
    const language = useSelector(state => state.language.language);

    let cityName, countryName;
    if (selectedCity) {
        cityName = language === 'ru' ? selectedCity.city_trans : selectedCity.city;
        if (windowWidth <= 380) cityName = truncateString(cityName, maxStringLen);
        countryName = language === 'ru' ? selectedCity.country_trans : selectedCity.country;
        if (windowWidth <= 380) countryName = truncateString(countryName, maxStringLen);
    }  

    return (
        <div className='world-city-info'>
            {selectedCity ? 
            <>
                <p className='var-name'>{translations[language].worldCity}</p>
                <div className='var-value'>{cityName}</div>
                <p className='var-name'>{translations[language].worldCity_country}</p>
                <div className='var-value'>{countryName}</div>
                <p className='var-name'>{translations[language].worldCity_coords}</p>
                <div className='var-value'>
                    [{parseFloat(selectedCity.latitude).toFixed(3)}°; {parseFloat(selectedCity.longtitude).toFixed(3)}°]
                </div>
            </> : <p className='city-not-selected'>{translations[language].worldCity}</p>}
            
        </div>
    )
}