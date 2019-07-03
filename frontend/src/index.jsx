import React from 'react';
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

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      message: 'Waiting for location data',
    };
  }

  async componentWillMount() {
    let data;
    let message;

    try {
      const location = await getUserLocation();
      const { latitude: lat, longitude: lon } = location.coords;

      data = await getWeatherFromApi(lat, lon);
    } catch (error) {
      message = error;
    }

    this.setState({ data, message });
  }

  render() {
    const { data } = this.state;
    let { message } = this.state;
    let icon = null;

    try {
      icon = data && data.icon.slice(0, -1);
    } catch (e) {
      message = 'Received invalid data';
    }

    return (
      <div className="icon">
        { icon && <img alt={data.main} src={`/img/${icon}.svg`} /> }
        { message }
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
