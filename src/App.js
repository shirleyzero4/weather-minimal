import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <div className='menu'>
          <FontAwesomeIcon icon={faBars} />
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
