import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const map_url = `https://api.openweathermap.org/data/2.5/onecall?`;
  const city_url = `https://api.openweathermap.org/data/2.5/weather?`;
  const API_KEY = `cda84759274791123030464c248efe8f`;
  const [lat, setLat]  = useState(null); 
  const [long, setLong]  = useState(null);
  const [cityName, setCityName] = useState("");
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    let apiCall = `${map_url}lat=${lat}&lon=${long}&exclude=current,minutely&units=metric&appid=${API_KEY}`;
    let cityApiCall = `${city_url}lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`;

    axios.get(cityApiCall)
    .then((response) => {
      console.log('weather : ', response.data);
      setCityName(response.data.name);
    })
    axios.get(apiCall)
    .then((response) => {
      console.log('onecall : ', response.data);
    })
  }, [lat, long]);
  
  return (
    <div className="App">
     <p>Your coordinates are - </p>
     <p>Lat : {lat}</p>
     <p>Long : {long}</p>
     <p>City : {cityName}</p>
   </div>
  );
}

export default App;
