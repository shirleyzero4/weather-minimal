import React, { useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a86ac6f164e80a61d42fa9ea208dbe2b`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div>
      <header>
        <div className='search'>
          <div className='icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className='location'>Banning</div>
        <div className='units'>C°/F°</div>
      </header>
      <div className='main'>
        <div className='icon'>
          <FontAwesomeIcon icon={faCircle} className='image' />
        </div>
        <div className='temp'>
          <div className='low-temp'>
            <FontAwesomeIcon icon={faChevronDown} />
            <h2>46°</h2>
          </div>
          <h1>50°</h1>
          <div className='high-temp'>
            <FontAwesomeIcon icon={faChevronUp} />
            <h2>50°</h2>
          </div>
        </div>
        <div className='sun'>
          <div className='sunrise'>
            <p>Sunrise</p>
            <p>5:04 AM</p>
          </div>
          <div className='sunset'>
            <p>Sunset</p>
            <p>6:00 PM</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
