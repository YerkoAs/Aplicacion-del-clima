import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import background from './services/background';
import { WeatherCard } from './components/WeatherCard'
const key = 'f010fb73520b21c63d89bd9682d903f4'



function App() {
const [weather, setweather] = useState()
const [temp, settemp] = useState()
  const [coords, setcoords] = useState()
  const success = (pos) => {
    setcoords({
      lat:pos.coords.latitude,
      lon:pos.coords.longitude
    })

    
 }
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
   navigator.geolocation.getCurrentPosition(success) 
  }, [])

  useEffect(() => {
    if(coords){
      const {lat, lon} = coords
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    axios.get(url)
      .then(res => {
        const k = res.data.main.temp;
        const c = (k - 273.15).toFixed(2);
        const f = (c * 9/5 +32).toFixed(2);
        settemp({cel: c, fah: f})
        setweather(res.data)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setisLoading(false)
        }, 1000);
      });

      
    }
    
  }, [coords])
  const bckg = (weather?.weather[0].icon)
  const bgimage = background(bckg)
    const appStyle = {
      backgroundImage : `url(${bgimage})`
      }
 console.log(background)
  return (
    <div className='app' style={appStyle}>
      {
        isLoading?
        <figure className='app-img'>
          <img src="https://jyu-jyu.net/wp-content/themes/jj-2014/images/loading.gif" alt="is loading" />
        </figure>
        :
        <WeatherCard
       weather = {weather}
       temp = {temp}
      />
      }
      
    </div>
  )
}

export default App
