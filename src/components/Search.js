import '../styles/search.scss';
import { width_changeButtonsToPictures } from './constants';
import { actionImages } from './allImages';

import React from 'react';
import { GeolocationLoader } from './Loaders';
import GeolocationErrorButton from './GeolocationErrorButton';
import NumberInput from './NumberInput';


const Search = React.memo(({inputLatitude, inputLongitude, setInputLatitude, setInputLongitude, triggerSearchButton, invalidInput, getMyLocation, geolocationLoading, isDataStillLoading, geolocationError, windowWidth}) => {
    
    //поиск по нажатию Enter
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            triggerSearchButton();
        }
    }
    
    return (
        <div className='search-bar' onKeyDownCapture={handleKeyDown}>
            <div className='left-block'>
                   
                {windowWidth >= width_changeButtonsToPictures ?
                    <button className='search--button' onClick={triggerSearchButton}>Поиск</button> : 
                    <img className='img-button search' src={actionImages['search']} alt='search' onClick={triggerSearchButton}/>
                }            
                <NumberInput
                    inputValue={inputLatitude}
                    setInputValue={setInputLatitude}
                    min={-90}
                    max={90}
                    placeholder={"Широта [-90; 90]"}
                    inputSuffix={windowWidth <= 450 ? '° шир.' : '° широты'}
                    isDataStillLoading={isDataStillLoading}
                    invalidInput={invalidInput}
                    inputWrapperStyle={"input-wrapper lat"}
                />
                <NumberInput
                    inputValue={inputLongitude}
                    setInputValue={setInputLongitude}
                    min={-180}
                    max={180}
                    placeholder={"Долгота [-180; 180]"}
                    inputSuffix={windowWidth <= 450 ? '° дол.' : '° долготы'}
                    isDataStillLoading={isDataStillLoading}
                    invalidInput={invalidInput}
                    inputWrapperStyle={"input-wrapper long"}
                />
            </div>       
                 
            <div className='my-geolocation-wrapper'>
                {geolocationError ? 
                    <GeolocationErrorButton geolocationError={geolocationError} windowWidth={windowWidth}/> :
                    <GeolocationLoader hidden={geolocationLoading ? false : true}/>}
                {windowWidth >= width_changeButtonsToPictures ?
                    <button className='my-geolocation--button' onClick={getMyLocation}>Моя геолокация</button> : 
                    <img className='img-button geolocation' src={actionImages['mygeolocation']} alt='my geolocation' onClick={getMyLocation}/>
                }
            </div>
        </div>
    )
});

export default Search;