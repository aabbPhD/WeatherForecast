import '../styles/app.scss';
import { PuffLoader, ClockLoader } from "react-spinners";


export function WeatherLoader() {
    return (
        <div className='weather-loader'>
            <PuffLoader color="rgb(44, 55, 255)" 
                        size={120} 
                        speedMultiplier={1}/>
        </div>
    )
}

export function GeolocationLoader({hidden}) {
    return (
        <div className={`my-geolocation--loader${hidden ? ' hidden' : ''}`}> 
            <ClockLoader color="rgb(44, 55, 255)" 
                        size={20} 
                        speedMultiplier={1}/>
        </div>
    )
}