import '../styles/search.scss';
import { actionImages } from './allImages';
import React from 'react';


export default function GeolocationErrorButton({geolocationError, windowWidth}) {
    const [isMessageVisible, setIsMessageVisible] = React.useState(false);

    function toggleMessage() {
        if (windowWidth > 980) return;
        setIsMessageVisible(prev => !prev);
    }

    return (
        <div className='geolocation-error-wrapper'>
            <img className='geolocation-error--img' src={actionImages['error']} alt='geolocation error' onClick={toggleMessage}/>
            {isMessageVisible && 
                <div className='geolocation-error--msg'>
                    <p className='warning'>Ошибка</p>
                    <p>{geolocationError}</p>
                </div>}
        </div>
    )
}