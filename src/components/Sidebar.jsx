import '../styles/sidebar.scss';
import React from 'react';
import TimezoneSelect from './TimezoneSelect';
import WorldCityInput from './WorldCityInput';
import WorldCityInfo from './WorldCityInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/Store';
import { translations } from '../config/translations';


const Sidebar = React.memo(({setInputLatitude, setInputLongitude, tempUnits, setTempUnits, timezone, setTimezone, dataLoading, geolocationLoading, fetchWeatherData, setSearchTriggered, setWeatherErrorCode, geolocationError, worldCitiesMap, windowWidth}) => {
    const [selectedCity, setSelectedCity] = React.useState(null);
    const language = useSelector(state => state.language.language);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (selectedCity !== null) {
            setWeatherErrorCode(null);
            setCoords();
            fetchWeatherData(selectedCity.latitude, selectedCity.longtitude);
            setSearchTriggered(true);
        }
    }, [selectedCity])

    
    function chooseTemp(desiredTemp) {
        if (dataLoading) return;//прошлые данные еще не загрузились, пока не реагируем
        if (tempUnits === desiredTemp) return;//уже выбрано
        else setTempUnits(desiredTemp);
    }   

    //выбор языка для ввода в инпут
    function chooseLanguage(newLanguage) {
        if (language !== 'ru' && language !== 'en') return;
        if (language === newLanguage) return;//уже выбрано
        else dispatch(setLanguage(newLanguage));
    }
    
    function setCoords() {
        if (dataLoading || geolocationLoading) return;//прошлые данные еще не загрузились, пока не реагируем
        setInputLatitude(parseFloat(selectedCity.latitude).toFixed(3));
        setInputLongitude(parseFloat(selectedCity.longtitude).toFixed(3));
    }


    return (
            <div className={`sidebar ${selectedCity ? 'city-selected' : ''}`}>
                <div className='set-params-block'>
                    <div className='buttons-and-form-elem'>
                        <div className='button-wrapper'>  
                            <button className={`side-button ${tempUnits === 'C' ? 'active' : ''}`} onClick={()=>chooseTemp('C')}>°C</button>
                            <button className={`side-button ${tempUnits === 'F' ? 'active' : ''}`} onClick={()=>chooseTemp('F')}>°F</button>
                        </div>
                        <TimezoneSelect timezone={timezone}
                                        setTimezone={setTimezone} 
                                        dataLoading={dataLoading}/>
                    </div>
                    
                    <div className='buttons-and-form-elem world-city'>
                        <div className='button-wrapper'>  
                            <button className={`side-button ${language === 'ru' ? 'active' : ''}`} onClick={()=>chooseLanguage('ru')}>RU</button>
                            <button className={`side-button ${language === 'en' ? 'active' : ''}`} onClick={()=>chooseLanguage('en')}>EN</button>
                        </div>
                        <WorldCityInput worldCitiesMap={worldCitiesMap}
                                        setSelectedCity={setSelectedCity}
                                        dataLoading={dataLoading}
                                        geolocationLoading={geolocationLoading}
                                        windowWidth={windowWidth}/> 
                    </div>
                </div>              
                <WorldCityInfo  selectedCity={selectedCity} 
                                windowWidth={windowWidth}/>
                {geolocationError && 
                    <div className='geolocation-error'>
                        <p className='warning'>{translations[language].error}</p>
                        <p>{geolocationError}</p>
                    </div>}
            </div>
    )
});

export default Sidebar;