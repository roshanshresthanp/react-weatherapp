import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [city,setCity] = useState("Nepal");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clouds':
      return "./icons/cloudy.png";
      break;

      case 'Clear':
      return "./icons/cloudy.png";
      break;

      case 'Rain':
      return "./icons/rain.png";
      break;

      case 'Mist':
      return "./icons/clouds.png";
      break;

      case 'Haze':
      return "./icons/sun.png";
      break;
      
      case 'Rain':
        return "./icons/rain.png";
        break;
      default:
        return null;
    }
  }

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const date = `${month} ${day}, ${year}`
  const API_KEY = "24deb6a0ac1f60637fcb29cb564a555a";

  const fetchWeatherData = async () => {
    try{

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const data = await response.json();
      console.log(data);

      setWeatherData(data)

    }catch(error){
      console.log(error)
    }
    
  }

  useEffect(()=>{
      fetchWeatherData();
  },[])

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
     event.preventDeffault();
     fetchWeatherData();
  }

  const intoC = (f) =>{
    return (f-273.15).toFixed(0);
  }

  return (
    <div className="App">
      <h1>Weather App </h1>
      <div className="weather-app">

        {weatherData && 
        <>

        <div className="location">{weatherData.name}</div>
                  <div className="date">{date}</div>
                  <div className="icon">
                    <img height="50px" width="50px" src={getWeatherIcon(weatherData.weather[0].main)} />
                    

                  </div>
                  <div className="temperature">{intoC(weatherData.main.temp)} °C</div>
                  <div className="description">{weatherData.weather[0].main}</div>
                  <div className="details">

                    <form className='form' onSubmit={handleSubmit}>
                      <input type="text" placeholder='Enter City' name="city" onChange={handleInputChange}></input>
                      <button type="submit">Submit</button>
                  </form>
                    {/* <div>

                      <span>Humidity</span>
                      <p>45%</p>
                    </div>
                    <div>
                      <span>Wind</span>
                      <p>10 km/h</p>
                    </div> */}
                  </div>
        
        </>}
         
          </div>
          

    </div>
  );
}

export default App;
 