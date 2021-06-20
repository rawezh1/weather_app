import './style.css';

/* eslint-disable comma-dangle */
window.onload = () => {
  const desc = document.getElementById('desc');
  const ctName = document.getElementById('cityName');
  const icon = document.getElementById('icon');
  const temperature = document.getElementById('temperature');
  const humidity = document.getElementById('humidity');
  const wSpeed = document.getElementById('wSpeed');
  const wDirection = document.getElementById('wDirection');
  const inputField = document.getElementById('inputField');
  const inputBtn = document.getElementById('inputBtn');

  async function getWeather(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=31e7f068072c35d264cfd5ecd16b5e93`,
      { mode: 'cors' }
    );
    const data = await response.json();
    return data;
  }

  async function getData(weatherObj) {
    const data = await weatherObj;
    const info = {
      cityName: data.name,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
    };
    return info;
  }
  inputBtn.onclick = () => {
    async function setWeather() {
      const cityWeth = await getData(getWeather(inputField.value));
      console.log(cityWeth);
      ctName.textContent = cityWeth.cityName;
      desc.textContent = cityWeth.description;
      icon.src = `http://openweathermap.org/img/wn/${cityWeth.icon}@2x.png`;
      temperature.textContent = `${cityWeth.temp} C`;
      humidity.textContent = `Humidity: ${cityWeth.humidity}`;
      wSpeed.textContent = cityWeth.windSpeed;
      wDirection.textContent = `Wind Direction: ${cityWeth.windDirection} degrees`;
    }
    setWeather();
    return false;
  };
};
