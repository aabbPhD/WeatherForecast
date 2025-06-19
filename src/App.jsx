import './styles/reset.css';
import './styles/global.scss';
import './styles/app.scss';
import { actionImages, weatherImages } from './assets/allImages';

import React from 'react';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import { shallowCopy, delay } from './utils/utils';
import useWindowWidth from './hooks/useWindowWidth';
import { useSelector } from 'react-redux';
import { translations } from './config/translations';


function App() {
    const windowWidth = useWindowWidth();//хук для определения ширины экрана
    const language = useSelector(state => state.language.language);//текущий язык

    //параметры для запроса
    const [inputLatitude, setInputLatitude] = React.useState(null);//широта в input
    const [curLatitude, setCurLatitude] = React.useState(null);//широта в текущих отображенных данных
    const [inputLongitude, setInputLongitude] = React.useState(null);//долгота в input
    const [curLongitude, setCurLongitude] = React.useState(null);//долгота в текущих отображенных данных
    const [invalidInput, setInvalidInput] = React.useState(false);//при невалидных данных для инпутов другой стиль
    const [tempUnits, setTempUnits] = React.useState('C');//градусы Цельсия / Фаренгейта
    const [timezone, setTimezone] = React.useState('Europe/Moscow');//временная зона

    //загрузка данных
    const [loading, setLoading] = React.useState(false);//происходит загрузка данных о погоде
    const [geolocationLoading, setGeolocationLoading] = React.useState(false);//происходит загрузка координат моей геолокации
    const [searchTriggered, setSearchTriggered] = React.useState(false);//триггер кнопки поиска, выводит на экран новые данные, если они уже загружены. если нет - блокирует действия до конца загрузки
    const [currentData, setCurrentData] = React.useState({'C': null, 'F': null});//данные на экране
    const [fetchedData, setFetchedData] = React.useState({'C': null, 'F': null});//данные, грузящиеся асинхронно [для введенных координат координат]
        
    //ошибки сервера
    const [weatherErrorCode, setWeatherErrorCode] = React.useState(null);
    const [geolocationErrorCode, setGeolocationErrorCode] = React.useState(null);

    //АМ [key - название города на русском языке, data - вся информация о нем]
    const [worldCitiesMap, setWorldCitiesMap] = React.useState(null);

    //для скролла экрана до графика на широких экранах
    const weatherRef = React.useRef(null);
    const [isWeatherComponentVisible, setIsWeatherComponentVisible] = React.useState(false);//прокрутка будет совершена только после создания компонента, изначально он не создан


    //предварительная загрузка изображений
    React.useEffect(() => {
        [...Object.values(actionImages), ...Object.values(weatherImages)].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    //предварительная загрузка JSON-файла с названиями городов
    React.useEffect(() => {
        async function loadWorldCitiesJSON() {
            const response = await fetch('./data/worldcities.json');
            const data = await response.json();
            data.sort((a, b) => a.city_trans.localeCompare(b.city_trans));
            setWorldCitiesMap(data);
        }

        loadWorldCitiesJSON()
    }, []) 

    //для малых значений width: прокрутка экрана до графика после того как он отрендерится
    React.useEffect(() => {
        if (windowWidth <= 690) {
            if (isWeatherComponentVisible && weatherRef.current) {
                weatherRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        } 
    }, [isWeatherComponentVisible, windowWidth]);

    //асинхронная загрузка данных при изменении координат (и если они не совпадают с текущими) 
    React.useEffect(() => {
        setInvalidInput(false);//при любом изменении значений - стили некорректного ввода сбрасываются
        if (checkDataValidity()) fetchWeatherData(inputLatitude, inputLongitude, tempUnits);       
    }, [inputLatitude, inputLongitude]);   

    //рендеринг данных при триггере поиска и по окончанию загрузки
    React.useEffect(() => {
        if (searchTriggered && !loading && checkFetchedDataExistance()) {
            updateData();            
            setSearchTriggered(false);
        }
    }, [searchTriggered, loading, fetchedData]);

    //запрос к серверу для получения данных о погоде
    async function fetchWeatherData(latitude, longitude) {
        if (checkDataValidity()) {
            setLoading(true);
            try {
                const tempRequest_C = '';
                const tempRequest_F = '&temperature_unit=fahrenheit';
                const getRequest = (tempRequest) => {
                    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}${tempRequest}&hourly=relative_humidity_2m,precipitation_probability,temperature_2m,wind_speed_10m,weather_code&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=${timezone}`;
                    //return `https://invalid-hostname.com`;//не удалось подключиться к серверу
                    //return 'https://api.open-meteo.com/v1/nonexistent-endpoint';//ошибка 404
                }
                const [response_C, response_F] = await Promise.all([
                    fetch(getRequest(tempRequest_C)),
                    fetch(getRequest(tempRequest_F)),
                ]);               
                if (!response_C.ok || !response_F.ok) {
                    const error = new Error();
                    error.code = 'http_404';
                    throw error;
                }
                const newData_C = await response_C.json();
                const newData_F = await response_F.json();

                //await delay(3000);//искуственная задержка ('плохой интернет')

                //в идеале надо делать полную проверку на валидность данных?
                if (!newData_C || !response_F) {
                    const error = new Error();
                    error.code = 'invalidData';
                    throw error;
                }
                setFetchedData({'C': newData_C, 'F': newData_F});
                setWeatherErrorCode(null);
            } catch (err) {
                //ошибка внутри fetch (например, неправильный URL)
                if (err.name === "TypeError" && err.message === "Failed to fetch") {
                    setWeatherErrorCode('failedToFetch');
                } else {
                    setWeatherErrorCode(err.code);
                }
            } finally {
                setLoading(false);
            }
        }
    };
    
    //когда данные загрузились, при нажатии поиска данные обновляются и выводятся на экран
    function updateData() {
        setCurrentData(shallowCopy(fetchedData));
        setCurLatitude(inputLatitude);
        setCurLongitude(inputLongitude);
    }

    //проверка, что подгруженные данные существуют 
    //(в идеале надо сравнивать и то, что они именно для тех координат, НО в ответе от сервера координаты отличаются на небольшую величину)
    const checkFetchedDataExistance = () => (fetchedData['C'] && fetchedData['F']);

    //если мы нажали поиск, а данные еще грузятся - выводим лоадер и блокируем некоторые кнопки
    const isDataStillLoading = React.useCallback(() => (searchTriggered && loading), [searchTriggered]);

    //проверка введенных координат на валидность
    function checkDataValidity() {
        if (inputLatitude === null || inputLongitude === null) return false;
        if (inputLatitude === '' || inputLongitude === '') return false;
        if (inputLatitude === '-' || inputLongitude === '-') return false;
        if ((typeof inputLatitude === 'string' && inputLatitude.endsWith('.')) || 
            (typeof inputLongitude === 'string' && inputLongitude.endsWith('.'))) return false;
        return true;
    }   

    //по нажатию Поиска выводим данные по готовности
    const triggerSearchButton = React.useCallback(() => {
        if (isDataStillLoading()) return;//прошлые данные еще не загрузились, пока не реагируем
        if (!checkDataValidity()) {
            setInvalidInput(true);
            return;
        }
        //если значения координат совпадают с текущими, значит ничего подгружать не надо
        if (curLatitude !== null && curLongitude !== null && 
            parseFloat(inputLatitude) === parseFloat(curLatitude) && parseFloat(inputLongitude) === parseFloat(curLongitude)) return;
        
        setSearchTriggered(true);
        if (!loading && checkFetchedDataExistance()) {
            updateData();
            setSearchTriggered(false);
        }
    }, [inputLatitude, curLatitude, inputLongitude, curLongitude, loading]);

    //запрос к серверу для получения геолокации
    function fetchLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject({ code: 'fail' });
                return;
            }
    
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (err) => {
                    let errorCode;
                    switch (err.code) {
                        case err.PERMISSION_DENIED:
                            errorCode = "noPermission";
                            break;
                        case err.POSITION_UNAVAILABLE:
                            errorCode = "positionUnavailable";
                            break;
                        case err.TIMEOUT:
                            errorCode = "timeout";
                            break;
                        default:
                            errorCode = "unknownError";
                    }
                    reject({ code: errorCode });
                }
            );
        });
    }

    //определение координат моей геолокации
    const getMyLocation = React.useCallback(async () => {
        if (isDataStillLoading()) return;//прошлые данные еще не загрузились, пока не реагируем
        setGeolocationErrorCode(null);
        setGeolocationLoading(true);
        try {
            //await delay(3000);//искуственная задержка ('плохой интернет')
            await delay(400);//для красоты (иначе при быстром ответе сервера будет странно мигать)
            const coords = await fetchLocation();
            const formattedLat = Number(coords.latitude.toFixed(3));
            const formattedLong = Number(coords.longitude.toFixed(3));
            setInputLatitude(formattedLat);
            setInputLongitude(formattedLong);
            setGeolocationErrorCode(null);
        } catch (error) {
            setGeolocationErrorCode(error.code);
        } finally {
            setGeolocationLoading(false);
        }
    }, [isDataStillLoading]);


    //на основе полученной ошибки выводим соответствующее сообщение
    const fetchError = translations[language].fetchWeatherDataError[weatherErrorCode] || null;
    const geolocationError = translations[language].fetchGeolocationError[geolocationErrorCode] || null;

    return (
        <div className="app">
            <MainContent weatherRef={weatherRef}
                         setIsWeatherComponentVisible={setIsWeatherComponentVisible}
                         inputLatitude={inputLatitude}
                         inputLongitude={inputLongitude}
                         setInputLatitude={setInputLatitude}
                         setInputLongitude={setInputLongitude}
                         curLatitude={curLatitude}
                         curLongitude={curLongitude}
                         currentData={currentData}
                         tempUnits={tempUnits}
                         timezone={timezone}
                         invalidInput={invalidInput}
                         loading={loading}
                         searchTriggered={searchTriggered}
                         triggerSearchButton={triggerSearchButton} 
                         isDataStillLoading={isDataStillLoading}
                         fetchError={fetchError}
                         getMyLocation={getMyLocation}
                         geolocationLoading={geolocationLoading}
                         geolocationError={geolocationError}
                         windowWidth={windowWidth}/>
                         
            <Sidebar setInputLatitude={setInputLatitude}
                     setInputLongitude={setInputLongitude}
                     tempUnits={tempUnits}
                     setTempUnits={setTempUnits}
                     timezone={timezone}
                     setTimezone={setTimezone}
                     isDataStillLoading={isDataStillLoading}
                     fetchWeatherData={fetchWeatherData}
                     setSearchTriggered={setSearchTriggered}
                     geolocationError={geolocationError}
                     worldCitiesMap={worldCitiesMap}
                     windowWidth={windowWidth}/>
        </div>
        
    );
}

export default App;