import '../styles/app.scss';
import { width_changeButtonsToPictures } from '../config/constants';
import { actionImages } from '../assets/allImages';

import React from 'react';
import Search from './Search';
import Weather from './Weather';
import { WeatherLoader } from './Loaders';
import { useSelector } from 'react-redux';
import { translations } from '../config/translations';


const MainContent = React.memo(({weatherRef, theme, setTheme, startMessageShown, setIsWeatherComponentVisible, inputLatitude, inputLongitude, setInputLatitude, setInputLongitude, curLatitude, curLongitude, currentData, tempUnits, timezone, invalidInput, triggerSearchButton, dataLoading, fetchError, getMyLocation, geolocationLoading, geolocationError, windowWidth}) => {
    const language = useSelector(state => state.language.language);

    const searchImgName = 'search_' + theme;
    const myGeolocationImgName = 'mygeolocation_' + theme;

    //стартовое сообщение в основном блоке
    const startMessage = (windowWidth >= width_changeButtonsToPictures) ? 
        <p className='app-msg'>{translations[language].startMessage}</p> :
        <>
            <p className='app-msg'>{translations[language].startMessage}</p>
            <p className='app-msg'><img src={actionImages[searchImgName]} alt='search'/> - {translations[language].startMessage_search}</p>
            <p className='app-msg'><img src={actionImages[myGeolocationImgName]} alt='search'/> - {translations[language].startMessage_myGeolocation}</p>
        </>
    
    return (
        <div className="main-content">
            <Search theme={theme}
                    inputLatitude={inputLatitude}
                    inputLongitude={inputLongitude}
                    setInputLatitude={setInputLatitude}
                    setInputLongitude={setInputLongitude}
                    triggerSearchButton={triggerSearchButton}
                    invalidInput={invalidInput}
                    getMyLocation={getMyLocation}
                    geolocationLoading={geolocationLoading}
                    geolocationError={geolocationError}
                    windowWidth={windowWidth}/>

            {startMessageShown && startMessage}
            {fetchError === null && dataLoading 
                ? <WeatherLoader theme={theme}/> 
                : (currentData['C'] && currentData['F'] && !fetchError) 
                    ? <Weather
                        theme={theme} 
                        setTheme={setTheme}
                        data={currentData[tempUnits]}
                        latitude={curLatitude}
                        longtitude={curLongitude}
                        selectedTimezone={timezone}
                        windowWidth={windowWidth}
                        weatherRef={weatherRef}
                        setIsWeatherComponentVisible={setIsWeatherComponentVisible}
                    />
                    : <p className='app-msg error'>{fetchError}</p>}
        </div>
    );
});

export default MainContent;