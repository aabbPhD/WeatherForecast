import '../styles/sidebar.scss';
import React from 'react';
import TimezoneSelect from './TimezoneSelect';
import WorldCityInput from './WorldCityInput';
import WorldCityInfo from './WorldCityInfo';


const Sidebar = React.memo(({setInputLatitude, setInputLongitude, tempUnits, setTempUnits, timezone, setTimezone, isDataStillLoading, geolocationError, worldCitiesMap, windowWidth}) => {
    const [language, setLanguage] = React.useState('RU');//возможность в поиске вводить слова на RU и ENG
    const [selectedCity, setSelectedCity] = React.useState(null);
    
    function chooseTemp(desiredTemp) {
        if (isDataStillLoading()) return;//прошлые данные еще не загрузились, пока не реагируем
        if (tempUnits === desiredTemp) return;//уже выбрано
        else setTempUnits(desiredTemp);
    }   

    //выбор языка для ввода в инпут
    function chooseLanguage(desiredLanguage) {
        if (language === desiredLanguage) return;//уже выбрано
        else setLanguage(desiredLanguage);
    }
    
    function setCoords() {
        if (isDataStillLoading()) return;//прошлые данные еще не загрузились, пока не реагируем
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
                                        isDataStillLoading={isDataStillLoading}/>
                    </div>
                    
                    <WorldCityInput language={language}
                                    chooseLanguage={chooseLanguage}
                                    setSelectedCity={setSelectedCity}
                                    worldCitiesMap={worldCitiesMap}
                                    windowWidth={windowWidth}/> 
                </div>              
                <WorldCityInfo  language={language} 
                                selectedCity={selectedCity} 
                                setCoords={setCoords}
                                windowWidth={windowWidth}/>
                {geolocationError && 
                    <div className='geolocation-error'>
                        <p className='warning'>Ошибка</p>
                        <p>{geolocationError}</p>
                    </div>}
            </div>
    )
});

export default Sidebar;