import { useState } from 'react'
import './App.css'
import axios from 'axios';

const API_KEY = 'd52e50e34214ff0b92247f788638eeb9';
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OWM_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {

  const [temperature, setTemperature] = useState(null);
  const [address, setAddress] = useState(null);

  const getTemperature = async () => {
    if(!address) {
      return;
    }
    // faire une requète pour récupérer les coordonnées
    const results = await axios.get(NOMINATIM_URL, { params: { 
      q: address, 
      format: 'json' 
    } });
    if(!results.data.length >= 1) {
      return;
    }
    // faire une requète pour recupérer la meteo
    const meteoResult = await axios.get(OWM_URL, { params: { 
      appid: API_KEY,
      lat: results.data[0].lat,
      lon: results.data[0].lon,
      units: 'metric'
    } });

    if(meteoResult.data.main.temp) {
      setTemperature(meteoResult.data.main.temp)
    }
  }

  return (
    <>
      <input type="text" onChange={e => setAddress(e.target.value)} />
      <button onClick={getTemperature}>+</button>
      { temperature && <p>Température { temperature }°C</p> }
    </>
  )
}

export default App
