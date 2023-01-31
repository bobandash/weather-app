

import {getWeatherData, get5DayWeatherData} from './weatherAPICall';
import convertUnits from './unitConversion';
import FutureWeather from './nextWeekWeather'

const UI = function createUI (){
  // changes all weather data for today
  const renderCurrentWeatherData = function changeCurrentWeatherDataToMatchDOM(currWeatherData, isFahrenheit){
    // gets all the elements that need to be changed
    const currentWeatherDOM = document.querySelector('[data-weather]');
    const currentLocationDOM = document.querySelector('[data-location]');
    const currentTimeDOM = document.querySelector('[data-time]');
    const currentTemperature = document.querySelector('[data-current-temperature');
    const currentHighTemperature = document.querySelector('[data-current-high');
    const currentLowTemperature = document.querySelector('[data-current-low');
    const currentWind = document.querySelector('[data-current-wind');
    const currentHumidity = document.querySelector('[data-current-humidity');

    currentWeatherDOM.innerText = currWeatherData.description;
    currentLocationDOM.innerText = currWeatherData.location;
    currentTimeDOM.innerText = currWeatherData.time;
    currentHumidity.innerText = `Humidity: ${currWeatherData.humidity}%`;

    if(isFahrenheit){
      currentTemperature.innerText = `${convertUnits.kToF(currWeatherData.temperature)}°F`;
      currentHighTemperature.innerText = `High: ${convertUnits.kToF(currWeatherData.max_temperature)}°F`;
      currentLowTemperature.innerText = `Low: ${convertUnits.kToF(currWeatherData.min_temperature)}°F`;
      currentWind.innerText = `Wind: ${convertUnits.mToMi(currWeatherData.wind_speed)} mph`;
    } else {
      currentTemperature.innerText = `${convertUnits.kToC(currWeatherData.temperature)}°C`;
      currentHighTemperature.innerText = `High: ${convertUnits.kToC(currWeatherData.max_temperature)}°C`;
      currentLowTemperature.innerText = `Low: ${convertUnits.kToC(currWeatherData.min_temperature)}°C`;
      currentWind.innerText = `Wind: ${currWeatherData.wind_speed} m/s`;      
    }
  }

  function remove5DayWeatherData (){
    const allWeatherCardElems = [...document.querySelectorAll('.weather-card')];
    allWeatherCardElems.forEach(elem => {
      elem.remove();
    })
  }

  // changes all weather data for the next 5 days
  const render5DayWeatherData = function change5DayWeatherDataToMatchDOM(weatherData){
    remove5DayWeatherData();
    const parentElement = document.getElementById('next-week-weather-container');
    weatherData.forEach(day => {
      const dayObject = new FutureWeather(day);
      parentElement.appendChild(dayObject.getDOM());
    })
  }

  function addLocationFormFunctionality() {
    const locationForm = document.getElementById('location-form');
    locationForm.addEventListener('submit', (event) => {
      const locationInput = document.getElementById('location');
      const location = locationInput.value;
      const locationArray = location.split(', ');
      const locationObj = {};
      locationArray.forEach((property, index) => {
        if(index === 0){
          locationObj.city = property;
        } else if(index === 1){
          locationObj.state = property;
        } else if(index === 2){
          locationObj.country = property;
        }
      })
      const currWeatherData = getWeatherData(locationObj);
      const next5DayWeather = get5DayWeatherData(locationObj);
      // change the promise to an object
      currWeatherData.then((value) => {
        renderCurrentWeatherData(value);
      });
      next5DayWeather.then((value) => {
        render5DayWeatherData(value);
      })
      // TO-DO empty form value if successful; otherwise write error
      event.preventDefault();
    })
  }

  function addChangeMetricBtn(currWeatherData, next5DayWeatherData){
    const changeMetricBtn = document.getElementById('change-units-btn');
    changeMetricBtn.addEventListener('click', function(){
      next5DayWeatherData.forEach(data => data.toggleUnits())
    })
    const isFahrenheit = next5DayWeatherData.isFahreheit;
    renderCurrentWeatherData(currWeatherData, isFahrenheit);
    render5DayWeatherData(next5DayWeatherData);
  }

  function initialRender(locationObj){
    addLocationFormFunctionality();
    
    const currWeatherDataPromise = getWeatherData(locationObj);
    const next5DayWeatherDataPromise = get5DayWeatherData(locationObj);
    // change the promise to an object
    currWeatherDataPromise.then((currWeatherData) => {
      renderCurrentWeatherData(currWeatherData, true);
    });
    next5DayWeatherDataPromise.then((fiveDayWeatherData) => {
      render5DayWeatherData(fiveDayWeatherData);
    });
  }

  function renderNewLocation(weatherData){

  }

  return {initialRender, renderNewLocation};

}();

export default UI;