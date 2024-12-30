import '../styles/sidebar.scss';
import { actionImages } from './allImages';
import React from 'react';
import { truncateString } from './utils';



export default function WorldCityInfo({language, selectedCity, setCoords ,windowWidth}) {
    const maxStringLen = 36;//урезаем строку при ширине экрана < 380
    let cityName, countryName;
    if (selectedCity) {
        cityName = language === 'RU' ? selectedCity.city_trans : selectedCity.city;
        if (windowWidth <= 380) cityName = truncateString(cityName, maxStringLen);
        countryName = language === 'RU' ? selectedCity.country_trans : selectedCity.country;
        if (windowWidth <= 380) countryName = truncateString(countryName, maxStringLen);
    }  

    return (
        <div className='world-city-info'>
            {selectedCity ? 
            <>
                <p className='var-name'>Населенный пункт:</p>
                <div className='var-value'>{cityName}</div>
                <p className='var-name'>Страна / Территория:</p>
                <div className='var-value'>{countryName}</div>
                <p className='var-name'>Координаты:</p>
                <div className='var-value' onClick={windowWidth > 780 ? null : setCoords}>
                    [{parseFloat(selectedCity.latitude).toFixed(3)}°; {parseFloat(selectedCity.longtitude).toFixed(3)}°]
                    {(windowWidth > 780) ? 
                        <p className='copy-coords' onClick={setCoords}>[скопировать]</p> :
                        <img className='copy-coords-img' src={actionImages['copy']} alt='copy coords' onClick={setCoords}/>}
                </div>
            </> : <p className='city-not-selected'>Населенный пункт:</p>}
            
        </div>
    )
}