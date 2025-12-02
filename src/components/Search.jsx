import '../styles/search.scss';
import { width_changeButtonsToPictures } from '../config/constants';
import { actionImages } from '../assets/allImages';

import React from 'react';
import { GeolocationLoader } from './Loaders';
import GeolocationErrorButton from './GeolocationErrorButton';
import NumberInput from './NumberInput';
import { useSelector } from 'react-redux';
import { translations } from '../config/translations';


const Search = React.memo(({theme, inputLatitude, inputLongitude, setInputLatitude, setInputLongitude, triggerSearchButton, invalidInput, getMyLocation, geolocationLoading, geolocationError, windowWidth}) => {
    const language = useSelector(state => state.language.language);
    
    //поиск по нажатию Enter
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            triggerSearchButton();
        }
    }

    const searchImgName = 'search_' + theme;
    const myGeolocationImgName = 'mygeolocation_' + theme;
    
    return (
        <div className='search-bar' onKeyDownCapture={handleKeyDown}>
            <div className='left-block'>
                   
                {windowWidth >= width_changeButtonsToPictures ?
                    <button className='search--button' onClick={triggerSearchButton}>{translations[language].searchButton}</button> : 
                    <img className='img-button search' src={actionImages[searchImgName]} alt='search' onClick={triggerSearchButton}/>
                }            
                <NumberInput
                    inputValue={inputLatitude}
                    setInputValue={setInputLatitude}
                    min={-90}
                    max={90}
                    placeholder={translations[language].inputLat_placeholder}
                    inputSuffix={windowWidth <= 450 ? translations[language].inputLat_suffix_short : translations[language].inputLat_suffix_full}
                    invalidInput={invalidInput}
                    inputWrapperStyle={"input-wrapper lat"}
                />
                <NumberInput
                    inputValue={inputLongitude}
                    setInputValue={setInputLongitude}
                    min={-180}
                    max={180}
                    placeholder={translations[language].inputLong_placeholder}
                    inputSuffix={windowWidth <= 450 ? translations[language].inputLong_suffix_short : translations[language].inputLong_suffix_full}
                    invalidInput={invalidInput}
                    inputWrapperStyle={"input-wrapper long"}
                />
            </div>       
                 
            <div className='my-geolocation-wrapper'>
                {geolocationError ? 
                    <GeolocationErrorButton geolocationError={geolocationError} windowWidth={windowWidth}/> :
                    <GeolocationLoader theme={theme} hidden={geolocationLoading ? false : true}/>}
                {windowWidth >= width_changeButtonsToPictures ?
                    <button className='my-geolocation--button' onClick={getMyLocation}>{translations[language].myGeolocationButton}</button> : 
                    <img className='img-button geolocation' src={actionImages[myGeolocationImgName]} alt='my geolocation' onClick={getMyLocation}/>
                }
            </div>
        </div>
    )
});

export default Search;