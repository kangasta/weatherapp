import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    throw new Error('Fetching weather data failed');
  }
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      message: 'Waiting weather data',
    };
  }

  async componentWillMount() {
    let data;
    let message;

    try {
      data = await getWeatherFromApi();
    } catch (error) {
      message = error;
    }

    this.setState({ data, message });
  }

  render() {
    const { data, message } = this.state;
    const icon = data && data.icon.slice(0, -1);

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
