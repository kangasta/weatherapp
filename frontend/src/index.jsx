import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (lat, lon) => {
  try {
    const query = lat && lon ? `?lat=${lat}=&lon=${lon}` : '';
    const response = await fetch(`${baseURL}/weather${query}`);
    return response.json();
  } catch (error) {
    throw new Error('Fetching weather data failed');
  }
};

const getUserLocation = options => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  } else {
    reject('Geolocation is not supported or allowed by this browser.');
  }
});

function Weather() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('Waiting for location data');

  useEffect(() => {
    async function fetchData() {
      try {
        const location = await getUserLocation();
        const { latitude: lat, longitude: lon } = location.coords;

        setData(await getWeatherFromApi(lat, lon));
        setMessage(null);
      } catch (error) {
        setMessage(error.toString());
      }
    }
    fetchData();
  }, []);

  let icon = null;

  try {
    icon = data && data.icon.slice(0, -1);
  } catch (e) {
    setMessage('Received invalid data');
  }

  return (
    <div className="icon">
      { icon && <img alt={data.main} src={`/img/${icon}.svg`} /> }
      { message }
    </div>
  );
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
