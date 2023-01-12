import React, { useState, useEffect }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';

const Weather = () => {
    const [search, setSearch] = useState("tokyo");
    const [data, setData] = useState([]);
    //const [location, setLocation] = useState('');
  
    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=a86ac6f164e80a61d42fa9ea208dbe2b`);
      
      response.json().then(response => 
      {      
        setData(response);
      })
    }
  
    useEffect(() => {
      fetchWeather();
    }, []);
    
    const timezone = data?.timezone; //needs to be converted in minutes 
    const timezoneInMinutes = timezone / 60;
    const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
   //let sunriseHours = new Date(data?.sys?.sunrise * 1000).getHours();
   //let sunriseMin = new Date(data?.sys?.sunrise * 1000).getMinutes();
   console.log(currTime);

    return (
      <div className='body'>
        <header>
          <div className='search'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
          </div>
          <div className='location'>{data.name}</div>
          <div className='units'>C°/F°</div>
        </header>
        <div className='main'>
          <div className='icon'>
            <FontAwesomeIcon icon={faCircle} className='image' />
          </div>
          <div className='temp'>
            <div className='low-temp'>
              <FontAwesomeIcon icon={faChevronDown} />
              {data.main ? <h2>{data.main.temp_min.toFixed()}°</h2> : null} 
            </div>
            {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null} 
            <div className='high-temp'>
              <FontAwesomeIcon icon={faChevronUp} />
              {data.main ? <h2>{data.main.temp_max.toFixed()}°</h2> : null} 
            </div>
          </div>
          <div className='sun'>
            <div className='sunrise'>
              <p>Sunrise</p>
              {}  
            </div>
            <div className='sunset'>
              <p>Sunset</p>
              {} 
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default Weather;