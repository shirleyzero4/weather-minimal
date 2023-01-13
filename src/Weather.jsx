import React, { useState, useEffect }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faChevronDown, faChevronUp, faCircle, faCloud, faCloudBolt, faCloudMeatball, faCloudMoonRain, faCloudShowersHeavy, faCloudSun, faCloudSunRain, faMagnifyingGlass, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';

const Weather = () => {
    const [search, setSearch] = useState("banning");
    const [data, setData] = useState([]);
    //const [location, setLocation] = useState('');

    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=a86ac6f164e80a61d42fa9ea208dbe2b`;

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

    // Sunrise
    const sunriseTime = data?.sys?.sunrise;
    const sunrise = moment.unix(sunriseTime).utc().add(timezone, 's').format('LT');
    
    //Sunset
    const sunsetTime = data?.sys?.sunset;
    const sunset = moment.unix(sunsetTime).utc().add(timezone, 's').format('LT');
 
    //Weather Icon
    const weatherIcon = data?.weather?.at(0)?.icon;
    function dayIcon (weatherIcon) {
      const map = new Map();

      map.set('01d', faCircle);
      map.set('02d', faCloudSun);
      map.set('03d', faCloud);
      map.set('04d', faCloud);
      map.set('09d', faCloudShowersHeavy);
      map.set('10d', faCloudSunRain);
      map.set('11d', faCloudBolt);
      map.set('13d', faSnowflake);
      map.set('50d', faBarsStaggered);

      return map.get(weatherIcon);
    }
    
    function nightIcon (weatherIcon) {
      const map = new Map();

      map.set('01n', faCircle);
      map.set('02n', faCloudSun);
      map.set('03n', faCloud);
      map.set('04n', faCloud);
      map.set('09n', faCloudShowersHeavy);
      map.set('10n', faCloudMoonRain);
      map.set('11n', faCloudBolt);
      map.set('13n', faSnowflake);
      map.set('50n', faBarsStaggered);

      return map.get(weatherIcon);
    }
    
    function correctIcon(weatherIcon) {
      if(dayIcon(weatherIcon) === undefined) {
        return nightIcon(weatherIcon);
      }
      else {
        return dayIcon(weatherIcon);
      }
    }

    return (
      <div className='body'>
        <header>
          <div className='search'>
            <input type='search' placeholder='Enter Location' />
            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
          </div>
          <div className='location'>{data.name}</div>
          <div className='units'>
            <div className='imperial'>
              F°
            </div>
            <p>/</p>
            <div className='metric'>
              C°
            </div>
          </div>
        </header>
        <div className='main'>
          <div className='icon'>
            <FontAwesomeIcon icon={correctIcon(weatherIcon)} className='image' />
          </div>
          <div className='weather-des'>
            <h1>{data.weather ? data.weather[0].description : null}</h1>
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
              <h5>Sunrise</h5>
              {sunrise}  
            </div>
            <div className='sunset'>
              <h5>Sunset</h5>
              {sunset} 
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default Weather;