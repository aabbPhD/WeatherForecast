import '../styles/sidebar.scss';
import React from 'react';
import { truncateString } from '../utils/utils';
import { actionImages } from '../assets/allImages';
import { useSelector } from 'react-redux';
import { translations } from '../config/translations';



export default function WorldCityInput({worldCitiesMap, setSelectedCity, isDataStillLoading, windowWidth}) {   
    const [inputValue, setInputValue] = React.useState('');//значение города в инпуте
    const [filteredCityList, setFilteredCityList] = React.useState([]);//список городов, начинающихся на значение в инпуте
    const [highlightedCityInputIndex, setHighlightedCityInputIndex] = React.useState(-1);//подсветка элементов списка городов в инпуте
    const language = useSelector(state => state.language.language);

    //ввод значений в инпут
    function handleInputWorldCity(e) {
        setSelectedCity(null);
        const value = e.target.value;
        setInputValue(value);

        if (value === '') {
            setFilteredCityList([]);
            return;
        }

        //ищем вхождения sample в названия городов (сначала выводим префиксы, а потом просто вхождения)
        function filterStringsBySample(database, sample) {
            if (!database || !sample) return []
            const startsWithSample = [];
            const containsSample = [];        
            for (const item of database) {
                if (language === 'ru') {
                    const city_trans = item.city_trans.toLowerCase();
                    if (city_trans.startsWith(sample)) startsWithSample.push(item); 
                    else if (city_trans.includes(sample)) containsSample.push(item);
                } else if (language === 'en') {
                    const city = item.city.toLowerCase();
                    if (city.startsWith(sample)) startsWithSample.push(item); 
                    else if (city.includes(sample)) containsSample.push(item);
                }
                
            }
            return [...startsWithSample, ...containsSample];
        }

        const filtered = filterStringsBySample(worldCitiesMap, value.toLowerCase()).slice(0, 8);
        setFilteredCityList(filtered);
    }

    function selectCity(item) {
        if (isDataStillLoading()) return;//прошлые данные еще не загрузились, пока не реагируем
        if (!item) return;
        setInputValue(language === 'ru' ? item.city_trans : item.city);
        setFilteredCityList([]);
        setSelectedCity(item);
    };

    function eraseCityInput() {
        setInputValue('');
        setFilteredCityList([]);
        setSelectedCity(null);
    }

    //обработка клавиш для инпута городов
    function handleCityInputKeyDown(e) {
        if (e.key === "Escape") eraseCityInput();
        if (filteredCityList.length > 0) {
            if (e.key === "ArrowDown") 
                setHighlightedCityInputIndex((prevIndex) => prevIndex < filteredCityList.length - 1 ? prevIndex + 1 : 0);
            else if (e.key === "ArrowUp") 
                setHighlightedCityInputIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : filteredCityList.length - 1);
            else if (e.key === "Enter") 
                //нужна доп. проверка, т.к. не всегда может подсвечиваться выбранный элемент списка
                if (highlightedCityInputIndex >= 0 && filteredCityList[highlightedCityInputIndex]) selectCity(filteredCityList[highlightedCityInputIndex]);
        }
    }
    
    const filteredCityListItems = filteredCityList.map((item, index) => {
        let maxStringLen = 22;
        if (windowWidth <= 430) maxStringLen = 18;
        if (windowWidth <= 400) maxStringLen = 16;
        const cityName = language === 'ru' ? item.city_trans : item.city;
        const countryName = language === 'ru' ? item.country_trans : item.country

        return <li  key={index}
                    className={`city-input--item${highlightedCityInputIndex === index ? ' highlighted' : ''}`}
                    onClick={()=>selectCity(item)}
                    onMouseEnter={()=>setHighlightedCityInputIndex(index)}>
            <p className='city-name'>{truncateString(cityName, maxStringLen)}</p>
            <p className='country-name'>{truncateString(countryName, maxStringLen)}</p>
        </li>}
    )


    return (
        <div className='city-input-wrapper'>
            <p className='city-input--label'>{translations[language].worldCity}</p>
            <img src={actionImages['cross']} alt='erase' onClick={eraseCityInput}/>
            <input  type="text"
                    value={inputValue}
                    placeholder={translations[language].worldCity_placeholder}
                    onChange={handleInputWorldCity}
                    onKeyDown={handleCityInputKeyDown}/>
            {filteredCityList.length > 0 && <ul>{filteredCityListItems}</ul>}
        </div>
    )
}