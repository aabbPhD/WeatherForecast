import '../styles/app.scss';
import { width_changeButtonsToPictures } from './constants';
import { actionImages } from './allImages';

import React from 'react';
import Search from './Search';
import Weather from './Weather';
import { WeatherLoader } from './Loaders';


const MainContent = React.memo(({weatherRef, setIsWeatherComponentVisible, inputLatitude, inputLongitude, setInputLatitude, setInputLongitude, curLatitude, curLongitude, currentData, tempUnits, timezone, invalidInput, loading, searchTriggered, triggerSearchButton, isDataStillLoading, fetchError, getMyLocation, geolocationLoading, geolocationError, windowWidth}) => {

    //стартовое сообщение в основном блоке
    const startMessage = (windowWidth >= width_changeButtonsToPictures) ? 
        <p className='app-msg'>Введите координаты</p> :
        <>
            <p className='app-msg'>Введите координаты</p>
            <p className='app-msg'><img src={actionImages['search']} alt='search'/> - поиск</p>
            <p className='app-msg'><img src={actionImages['mygeolocation']} alt='search'/> - моя геолокация</p>
        </>
    
    return (
        <div className="main-content">
            <Search inputLatitude={inputLatitude}
                    inputLongitude={inputLongitude}
                    setInputLatitude={setInputLatitude}
                    setInputLongitude={setInputLongitude}
                    triggerSearchButton={triggerSearchButton}
                    invalidInput={invalidInput}
                    getMyLocation={getMyLocation}
                    geolocationLoading={geolocationLoading}
                    isDataStillLoading={isDataStillLoading}
                    geolocationError={geolocationError}
                    windowWidth={windowWidth}/>

            {!fetchError && !searchTriggered && !currentData['C'] && !currentData['F'] && 
                startMessage}
            {!fetchError && searchTriggered && loading 
                ? <WeatherLoader/> 
                : (currentData['C'] && currentData['F'] && <Weather data={currentData[tempUnits]} 
                                                                    latitude={curLatitude}
                                                                    longtitude={curLongitude}
                                                                    selectedTimezone={timezone}
                                                                    windowWidth={windowWidth}
                                                                    weatherRef={weatherRef}
                                                                    setIsWeatherComponentVisible={setIsWeatherComponentVisible}/>)}
            {fetchError && <p className='app-msg error'>{fetchError}</p>}
        </div>
    );
});

export default MainContent;