import '../styles/search.scss';
import { actionImages } from '../assets/allImages';
import React from 'react';
import { useSelector } from 'react-redux';
import { translations } from '../config/translations';


export default function GeolocationErrorButton({geolocationError, windowWidth}) {
    const [isMessageVisible, setIsMessageVisible] = React.useState(false);
    const language = useSelector(state => state.language.language);

    function toggleMessage() {
        if (windowWidth > 980) return;
        setIsMessageVisible(prev => !prev);
    }

    return (
        <div className='geolocation-error-wrapper'>
            <img className='geolocation-error--img' src={actionImages['error']} alt='geolocation error' onClick={toggleMessage}/>
            {isMessageVisible && 
                <div className='geolocation-error--msg'>
                    <p className='warning'>{translations[language].error}</p>
                    <p>{geolocationError}</p>
                </div>}
        </div>
    )
}