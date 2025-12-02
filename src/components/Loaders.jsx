import '../styles/app.scss';
import { PuffLoader, ClockLoader } from "react-spinners";



const color = {
    neutral: 'rgb(44, 55, 255)',
    night: 'orange',
    day: 'rgba(242, 255, 0, 1)',
}



export function WeatherLoader({theme}) {
    return (
        <div className='weather-loader'>
            <PuffLoader color={color[theme]} 
                        size={120} 
                        speedMultiplier={1}/>
        </div>
    )
}

export function GeolocationLoader({theme, hidden}) {
    return (
        <div className={`my-geolocation--loader${hidden ? ' hidden' : ''}`}> 
            <ClockLoader color={color[theme]} 
                        size={20} 
                        speedMultiplier={1}/>
        </div>
    )
}