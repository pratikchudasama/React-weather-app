import { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from './assets/background.jpg';

function App() {
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({});
  const [location, setLocation] = useState('');
  const [animate, setAnimate] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8337a324017d62ebddb626e1140e66be`;

  const getWeather = () => {
    axios.get(url)
      .then((response) => {
        setNewData(response.data);
        setLocation('');
        setAnimate(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      getWeather();
    }
  };

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setData(newData);
        setAnimate(false);
      }, 450); 
      return () => clearTimeout(timer);
    }
  }, [animate, newData]);

  return (
    <>
      <div className="bg-cover bg-center h-screen flex flex-col"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="flex items-center justify-center">
          <input
            className="border-slate-300 border-2 mt-5 px-1 text-xl capitalize rounded bg-black bg-opacity-30 hover:bg-opacity-40 text-white"
            type="text"
            placeholder="Enter city name..."
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={handleChange}
          />
          <button
            className="border-2 border-slate-300 mt-5 ml-2 py-0.5 px-2 rounded bg-black bg-opacity-30 hover:bg-opacity-40 text-white"
            onClick={handleChange}>Search
          </button>
        </div>
        <div className={`flex flex-col text-white transition-opacity duration-500 ${animate ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex-col justify-between px-40 ">
            <p className="text-4xl">{data.name}</p>
            {data.main ? <h1 className="text-8xl">{data.main.temp.toFixed()}°C</h1> : null}
            <div className="flex flex-row ">
              {data.main ? <p className="text-2xl">↑H: {data.main.temp_max.toFixed()}°C</p> : null}
              {data.main ? <p className="text-2xl ml-6">↓L: {data.main.temp_min.toFixed()}°C</p> : null}
            </div>
          </div>
          <div>
            {data.weather ? <p className="text-4xl flex flex-col px-40 pt-6">Condition: {data.weather[0].main}</p> : null}
          </div>
          {data.name != undefined &&
          <div className="shadow-md absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 w-11/12 max-w-4xl flex flex-row justify-evenly bg-black bg-opacity-50 p-4 rounded-t-lg ">
            {data.main ? <p className="text-2xl">Feels Like: {data.main.feels_like.toFixed()}°C</p> : null}
            {data.main ? <p className="text-2xl">Humidity: {data.main.humidity}%</p> : null}
            {data.wind ? <p className="text-2xl">Wind Speed: {data.wind.speed}MPH</p> : null}
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default App;
