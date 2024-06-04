import React, { useState } from 'react'
import './styles/weatherCards.css';

export const WeatherCard = ({weather, temp}) => {

    const [isCel, setisCel] = useState(true)
    const handleTemp = () => {
        setisCel(!isCel)
    }

    console.log(weather)
  return (
    <div className='weathercard'>
        <h1 className='weathercard-title'>Weather app</h1>
        <h2 className='weathercard-city'>{weather?.name}, {weather?.sys.country} </h2>
        <section className='weathercard-body'>
            <figure className='weathercard-img'>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather image" />
            </figure>
            <article className='weathercard-data'>
                <h3 className='weathercard-desceiption'>{weather?.weather[0].description} </h3>
                <ul className='weathercard-list'>
                    <li className='weathercard-item'><span>wind speed:</span>  <span>{weather?.wind.speed} m/s</span></li>
                    <li className='weathercard-item'><span>clouds:</span><span> {weather?.clouds.all} % </span></li>
                    <li className='weathercard-item'><span>pressure:</span><span> {weather?.main.pressure} hPa </span></li>
                </ul>
            </article>
        </section>
    
            <h2 className='weathercard-temp'>
            {
            isCel?
            temp?.cel + '  '+'°C'
            :
            temp?.fah + '  '+'°F'

             }
            
            </h2>
        
        
        <button className='weathercard-btn' onClick={handleTemp}>Change to {isCel? '°F' : '°C'}</button>
    </div>
  )
}
