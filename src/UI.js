

import {getWeatherData, get7DayWeatherData} from './weatherAPICall';
import convertUnits from './unitConversion';

// html helper functions
function createContainer( {element, classes, identifier, childElements, customAttribute}){
  const node = document.createElement(element);
  if(classes){
      classes.forEach(item => node.classList.add(item));
  }
  if(identifier){
      node.setAttribute('id',identifier);
  }
  if(childElements){
      childElements.forEach(item => node.appendChild(item))
  }
  if(customAttribute){
      if(customAttribute.length > 1){
          node.setAttribute(customAttribute[0], customAttribute[1]);
      }
  }

  return node;
}

function createTag( {element, text, classes, identifier}){
  const node = document.createElement(element);
  if(classes){
      classes.forEach(item => node.classList.add(item));
  }
  if(identifier){
      node.setAttribute('id',identifier);
  }
  if(text){
      node.innerText = text;
  }
  return node;
}


const UI = function createUI (){

  const changeWeatherData = function changeCurrentWeatherDataToMatchDOM(currWeatherData){
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
    currentTemperature.innerText = `${convertUnits.kToF(currWeatherData.temperature)}°F`;
    currentHighTemperature.innerText = `High: ${convertUnits.kToF(currWeatherData.max_temperature)}°F`;
    currentLowTemperature.innerText = `Low: ${convertUnits.kToF(currWeatherData.min_temperature)}°F`;
    currentHumidity.innerText = `Humidity: ${currWeatherData.humidity}%`;
    currentWind.innerText = `Wind: ${convertUnits.mToMi(currWeatherData.wind_speed)} mph`;


    console.log(currWeatherData);
    // currentWeatherDOM.innerText = currWeatherData.description;

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
      const currWeatherDataPromise = getWeatherData(locationObj);
      // change the promise to an object
      currWeatherDataPromise.then((currWeatherData) => {
        changeWeatherData(currWeatherData);
      });
      // TO-DO empty form value if successful; otherwise write error
      event.preventDefault();
    })
  }



  function initialRender(){
    addLocationFormFunctionality();

    // initially render San Francisco
    const currWeatherDataPromise = getWeatherData(
      {city: "San Francisco"}
    );
    // change the promise to an object
    currWeatherDataPromise.then((currWeatherData) => {
      changeWeatherData(currWeatherData);
    });

  }

  function renderNewLocation(weatherData){

  }

  return {initialRender, renderNewLocation};

}();

export default UI;