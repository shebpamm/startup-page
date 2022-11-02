import React from "react";

import {
  WiRain, WiSprinkle, WiCloudy, WiThunderstorm, WiDaySunny,
  WiSnowflakeCold, WiFog, WiRaindrops, WiDust, WiDayHaze,
  WiTornado, WiDayCloudy, WiNightCloudy, WiCloud,
  WiMoonWaxingCrescent3, WiHumidity
} from "react-icons/wi";

import { BiWind } from "react-icons/bi";
import {BsChevronDoubleDown} from "react-icons/bs";

const key = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
const unit = import.meta.env.VITE_OPEN_WEATHER_MAP_UNIT;

if (key === '') document.getElementById('temp').innerHTML = ('Remember to add your api key!');

export default class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.temperature,
      location: this.props.location,
      icon: this.props.icon,
      desc: this.props.desc,
      link: this.props.link,
      humidity: this.props.humidity,
      pressure: this.props.pressure,
      windSpeed: this.props.windSpeed,
      windAngle: this.props.windAngle,
    }
  }

  async fetchData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()

    return this.getWeather(data)
  }

  getWeather(data) {
    let weather = [
      { weather: 'Clear', icon_day: <WiDaySunny />, icon_night: <WiMoonWaxingCrescent3 /> },
      {
        weather: 'Clouds', icon_few_day: <WiDayCloudy />, icon_few_night: <WiNightCloudy />,
        icon_scatter_day: <WiDayCloudy />, icon_scatter_night: <WiNightCloudy />,
        icon_broken: <WiCloud />, icon_overcast: <WiCloudy />
      },
      { weather: 'Drizzle', icon: <WiSprinkle /> },
      { weather: 'Rain', icon: <WiRain /> },
      { weather: 'Thunderstorm', icon: <WiThunderstorm /> },
      { weather: 'Snow', icon: <WiSnowflakeCold /> },
      { weather: 'Fog', icon: <WiFog /> },
      { weather: 'Mist', icon: <WiRaindrops /> },
      { weather: 'Haze', icon: <WiDayHaze /> },
      { weather: 'Tornado', icon: <WiTornado /> },
      { weather: 'Dust', icon: <WiDust /> }
    ]

    let icon = '';
    let weatherIcon = weather.find(element => element.weather === data.weather[0].main);

    if (weatherIcon.weather === 'Clear') {
      icon = this.isDay() ? weatherIcon.icon_day : weatherIcon.icon_night
    }
    else if (weatherIcon.weather === 'Clouds') {
      if (data.weather[0].id === 801) {
        icon = this.isDay() ? weatherIcon.icon_few_day : weatherIcon.icon_few_night
      }
      else if (data.weather[0].id === 802) {
        icon = this.isDay() ? weatherIcon.icon_scatter_day : weatherIcon.icon_scatter_night
      }
      else if (data.weather[0].id === 803) {
        icon = weatherIcon.icon_broken
      }
      else if (data.weather[0].id === 804) {
        icon = weatherIcon.icon_overcast
      }
    }
    else {
      icon = weatherIcon.icon
    }

    var temperature = String(Math.round(data.main.temp) + '\xB0C');

    let link = "https://darksky.net/forecast/" + String(data.coord.lat) + "," + String(data.coord.lon) + "/us12/en";
    console.log(link);
    this.setState({
      ...this.state,

      location: data.name,
      temperature: temperature,
      icon: icon,
      desc: data.weather[0].description,
      link: link,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: String(Math.round(data.wind.speed)),
      windAngle: data.wind.deg,
    })
  }

  isDay() {
    return ((new Date()).getHours() >= 6 && (new Date()).getHours() < 18);
  }

  componentDidMount() {
    if (import.meta.env.VITE_LAT) {
      this.fetchData(import.meta.env.VITE_LAT, import.meta.env.VITE_LON);
    } else if (navigator.geolocation) { // get location
      navigator.geolocation.getCurrentPosition((position) => {
        this.fetchData(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  render() {
    return (
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex justify-between">
          <h6 className="font-bold text-l">
            {this.state.location}
          </h6>
          <h6>00:00</h6>
        </div>

        <div className="flex flex-col text-center mt-5 mb-4">
          <span className="text-5xl font-sans" >
            {" "} {this.state.temperature} {" "}
          </span>
          <span className="text-pale capitalize">
            {this.state.desc}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            <div>
              <BiWind className="inline"></BiWind>
              <span className="ms-1"> {this.state.windSpeed} m/s</span>
            </div>
            <div>
              <WiHumidity className="inline text-xl"></WiHumidity>
              <span className="ms-1">{this.state.humidity}%</span>
            </div>
            <div>
              <BsChevronDoubleDown className="inline text-l"></BsChevronDoubleDown>
              <span className="ms-1"> {this.state.pressure} mBar</span>
            </div>
          </div>
          <a className="flex justify-center text-7xl" href={this.state.link}>
            <span className="">{this.state.icon}</span>
          </a>
        </div>
      </div>
    );
  }
}
