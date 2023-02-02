/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _weatherAPICall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherAPICall */ "./src/weatherAPICall.js");
/* harmony import */ var _unitConversion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unitConversion */ "./src/unitConversion.js");
/* harmony import */ var _weatherObjects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weatherObjects */ "./src/weatherObjects.js");






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
    currentTimeDOM.innerText = _unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].unixToRegularTime(currWeatherData.time, currWeatherData.timezone);
    currentHumidity.innerText = `Humidity: ${currWeatherData.humidity}%`;

    if(isFahrenheit){
      currentTemperature.innerText = `${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.temperature)}°F`;
      currentHighTemperature.innerText = `High: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.max_temperature)}°F`;
      currentLowTemperature.innerText = `Low: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.min_temperature)}°F`;
      currentWind.innerText = `Wind: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].mToMi(currWeatherData.wind_speed)} mph`;
    } else {
      currentTemperature.innerText = `${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToC(currWeatherData.temperature)}°C`;
      currentHighTemperature.innerText = `High: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToC(currWeatherData.max_temperature)}°C`;
      currentLowTemperature.innerText = `Low: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToC(currWeatherData.min_temperature)}°C`;
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
  const render5DayWeatherData = function change5DayWeatherDataToMatchDOM(weatherData, isFahrenheit){
    remove5DayWeatherData();
    const parentElement = document.getElementById('next-week-weather-container');
    weatherData.forEach(day => {
      day.isFahrenheit = isFahrenheit;  // eslint-disable-line no-param-reassign
      const dayObject = new _weatherObjects__WEBPACK_IMPORTED_MODULE_2__.FutureWeather(day);
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
      const currWeatherData = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(locationObj);
      const next5DayWeather = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.get5DayWeatherData)(locationObj);
      // change the promise to an object
      currWeatherData.then((value) => {
        renderCurrentWeatherData(value, true);
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
    changeMetricBtn.addEventListener('click', () => {
      _weatherObjects__WEBPACK_IMPORTED_MODULE_2__.currentUnits.toggleUnits();
      const isFahrenheit = _weatherObjects__WEBPACK_IMPORTED_MODULE_2__.currentUnits.getIsFahrenheit();
      renderCurrentWeatherData(currWeatherData, isFahrenheit);
      render5DayWeatherData(next5DayWeatherData, isFahrenheit);      
  })}


  function renderBackground(){

  }

  function initialRender(locationObj){
    addLocationFormFunctionality();
    const currWeatherDataPromise = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(locationObj);
    const next5DayWeatherDataPromise = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.get5DayWeatherData)(locationObj);
    const isFahrenheit = _weatherObjects__WEBPACK_IMPORTED_MODULE_2__.currentUnits.getIsFahrenheit();
    Promise.all([currWeatherDataPromise, next5DayWeatherDataPromise]).then((values) => {
      renderCurrentWeatherData(values[0], isFahrenheit);
      render5DayWeatherData(values[1], isFahrenheit);
      addChangeMetricBtn(values[0], values[1]);
    });
    renderBackground();
  }


  return {initialRender};

}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);

/***/ }),

/***/ "./src/unitConversion.js":
/*!*******************************!*\
  !*** ./src/unitConversion.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const convertUnits = (() => {
  const kToC = function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(0);
  }
  
  const kToF = function kelvinToFahrenheit(kelvin) {
    return (1.8*(kelvin - 273)+32).toFixed(0);
  }

  const mToMi = function metersToMiles(meters){
    const mi = (meters/1609.344).toFixed(1);
    if(mi === "0.0"){
      return 0;
    }
    return mi;
  }

  function getDayName(dateStr){
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayIndex = new Date(dateStr).getDay();
      return days[dayIndex];    
  }

  // TO-DO - UNIX TIME TO LOCAL TIME IN THAT TIME ZONE
  // format like 4:13PM, Monday, January 28, 2023
  const unixToRegularTime = function convertUnitTimeStampToRegularTime(unixTime, timezone){
    const unixActualTime = unixTime + timezone;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // TO-DO, fix code to deal with ISOString
    const isoString = new Date(unixActualTime * 1000).toISOString();
    const dateExcludingTime = new Date(isoString.substring(0,10));
    const day = days[dateExcludingTime.getDay()];
    const dateFormat = `${months[dateExcludingTime.getMonth()]} ${dateExcludingTime.getDate()}, ${dateExcludingTime.getFullYear()}`;
    // time is in HH:MM:SS format
    const time = isoString.substring(11, 18);
    const hour = Number(time.substring(0, 2));
    const minutes = String(time.substring(3,5));
    let timeFormat;
    if(hour === 0){
      timeFormat = `12:${minutes} AM`;
    }
    else if(hour > 12){
      timeFormat = `${hour % 12}:${minutes} PM`
    } else {
      timeFormat= `${hour}:${minutes} AM`;
    }

    return `${timeFormat}, ${day}, ${dateFormat}`;
  }
  return {kToC, kToF, mToMi, getDayName, unixToRegularTime};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (convertUnits);

/***/ }),

/***/ "./src/weatherAPICall.js":
/*!*******************************!*\
  !*** ./src/weatherAPICall.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get5DayWeatherData": () => (/* binding */ get5DayWeatherData),
/* harmony export */   "getWeatherData": () => (/* binding */ getWeatherData)
/* harmony export */ });
/* harmony import */ var _unitConversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unitConversion */ "./src/unitConversion.js");


// should keep API Key in back-end once learn how to
const APIKey = '84648df1cd8895fa8526452f3725c93c';

async function getCoords ({city, state, country} = {}){
  const obj = {city, state, country};
  let apiLocationString = '';
  Object.values(obj).forEach(val => {
    if(val !== undefined) {
      if(apiLocationString === ''){
        apiLocationString = val;
      } else {
        apiLocationString = `${apiLocationString},${val}`; 
      }
    }
  })

  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${apiLocationString}&limit=1&appid=${APIKey}`, {mode: 'cors'});
  const coordinatesData = await response.json();
  const coordinates = {
    latitude: coordinatesData[0].lat,
    longitude: coordinatesData[0].lon
  }
  return coordinates;
}

async function getWeather ({latitude, longitude} = {}){
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`, {mode: 'cors'});
  const weatherData = await response.json();
  const relevantWeatherData = {
    location: weatherData.name,
    // default unit is %
    humidity: weatherData.main.humidity,
    // default unit is kelvin
    temperature: weatherData.main.temp,
    max_temperature: weatherData.main.temp_max,
    min_temperature: weatherData.main.temp_min,
    // default unit is m/s
    wind_speed: weatherData.wind.speed,
    // timezone is in seconds var d = new Date((new Date().getTime())-25200*1000)
    // d.toISOString()
    time: weatherData.dt,
    timezone: weatherData.timezone,
    description: weatherData.weather[0].description
  }
  return relevantWeatherData;
}



function getWeatherIconDOM(weather){
  const icon = document.createElement('i');
  switch(weather){
    case 'Clear':
      icon.classList.add('fa-solid','fa-sun','big');
      break;
    case 'Clouds':
      icon.classList.add('fa-solid','fa-cloud','big');
      break;
    case 'Thunderstorm':
      icon.classList.add('fa-solid','fa-cloud-bolt','big');
      break;
    case 'Drizzle':
      icon.classList.add('fa-solid','fa-cloud-sun-rain','big');
      break;
    case 'Rain':
      icon.classList.add('fa-solid','fa-cloud-rain','big');
      break;
    case 'Snow':
      icon.classList.add('fa-solid','fa-snowflake','big');
      break;
    case 'Tornado':
      icon.classList.add('fa-solid','fa-tornado','big');
      break;      
    default:
      icon.classList.add('fa-solid','fa-smog','big');
      break;
  }
  return icon;
}

// the only free API call for forecast is 5 day, 3 hour periods
async function get5DayWeather({latitude, longitude} = {}){
  // TO-DO api call is invalid because it's not free, need to use the 5 day one
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`, {mode: 'cors'});
  const weatherData = await response.json();
  const weatherDataArray = weatherData.list;
  const relevantWeatherDataArray = [];
  // clean up the weather data array to only get relevant values
  weatherDataArray.forEach(rawDataObj => {
    const day = _unitConversion__WEBPACK_IMPORTED_MODULE_0__["default"].getDayName(rawDataObj.dt_txt.substring(0,10))
    const maxTemperature = rawDataObj.main.temp_max;
    const minTemperature = rawDataObj.main.temp_min;
    // weather has potential values Thunderstorm, Drizzle, Rain, Snow, A lot of Different Atmosphere Ones, Clear, Clouds
    const weather = rawDataObj.weather[0].main;
    let insideArray = false;
    
    // mutate min, max temperature, weather if object is already in array
    relevantWeatherDataArray.forEach(relevantObj => {
      if(day === relevantObj.day){
        relevantObj.maxTemperature = Math.max(relevantObj.maxTemperature, maxTemperature);  // eslint-disable-line no-param-reassign
        relevantObj.minTemperature = Math.min(relevantObj.minTemperature, minTemperature);  // eslint-disable-line no-param-reassign
        if((relevantObj.weather === 'Clear' || relevantObj.weather === 'Clouds') &&
          (!(weather === 'Clear' || weather === 'Clouds'))){
            relevantObj.weather = weather;  // eslint-disable-line no-param-reassign
        }
        insideArray = true;
      }
    })
    
    if(!insideArray){
      relevantWeatherDataArray.push({day, maxTemperature, minTemperature, weather})
    }
  })

  relevantWeatherDataArray.forEach(data => {
    data.weatherIconDOM = getWeatherIconDOM(data.weather); // eslint-disable-line no-param-reassign
  })

  return relevantWeatherDataArray;
}

async function getWeatherData (locationObj){
  const weather = await getWeather(await getCoords(locationObj));
  return weather;
}
 
async function get5DayWeatherData (locationObj){
  const weather = await get5DayWeather(await getCoords(locationObj));
  return weather;
}



/***/ }),

/***/ "./src/weatherObjects.js":
/*!*******************************!*\
  !*** ./src/weatherObjects.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FutureWeather": () => (/* binding */ FutureWeather),
/* harmony export */   "currentUnits": () => (/* binding */ currentUnits)
/* harmony export */ });
/* harmony import */ var _unitConversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unitConversion */ "./src/unitConversion.js");


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

const FutureWeather = class {
  constructor({day, maxTemperature, minTemperature, weather, weatherIconDOM, isFahrenheit}){
    this.day = day;
    this.maxTemperature = maxTemperature;
    this.minTemperature = minTemperature;
    this.weather = weather;
    this.weatherIconDOM = weatherIconDOM;
    this.isFahrenheit = isFahrenheit;
  }


  getDOM(){
    const dayText = createTag({
      element: 'h2',
      classes: ['normal-header'],
      text: this.day
    })

    const weatherIcon = this.weatherIconDOM;

    const highTemperature = createTag({
      element: 'h2',
      classes: ['normal-header'],
      text: this.isFahrenheit ? `${_unitConversion__WEBPACK_IMPORTED_MODULE_0__["default"].kToF(this.maxTemperature)}°` : `${_unitConversion__WEBPACK_IMPORTED_MODULE_0__["default"].kToC(this.maxTemperature)}°`
    })

    const lowTemperature = createTag({
      element: 'h2',
      classes: ['normal-header','low-temperature'],
      text: this.isFahrenheit ? `${_unitConversion__WEBPACK_IMPORTED_MODULE_0__["default"].kToF(this.minTemperature)}°` : `${_unitConversion__WEBPACK_IMPORTED_MODULE_0__["default"].kToC(this.minTemperature)}°`
    })

    const highLowTemperatureContainer = createContainer({
      element: 'h2',
      classes: ['high-low-temperatures'],
      childElements: [highTemperature, lowTemperature]
    })

    const container = createContainer({
      element: 'div',
      classes: ['weather-card'],
      childElements: [dayText, weatherIcon, highLowTemperatureContainer]
    })

    return container;
  }
}

const currentUnits =  (() => {
  let isFahrenheit = true;

  function getIsFahrenheit(){
    return isFahrenheit;
  }

  function toggleUnits(){
    isFahrenheit = !isFahrenheit;
  }

  return {getIsFahrenheit, toggleUnits};
})();





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


// creates the weather page
const main = function doAllOperations(){
  const initialLocation = {
    city: 'San Francisco'
  }
  _UI__WEBPACK_IMPORTED_MODULE_0__["default"].initialRender(initialLocation);
}

main();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDREQUFpQixzQkFBc0IsUUFBUSw0REFBaUIsc0JBQXNCO0FBQ3pILEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0REFBaUIsc0JBQXNCLFFBQVEsNERBQWlCLHNCQUFzQjtBQUN6SCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLENBQUM7QUFDRDtBQUNBO0FBQ3FDOzs7Ozs7O1VDcEdyQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUseURBQWdCO0FBQ2xCO0FBQ0E7QUFDQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1VJLmpzIiwid2VicGFjazovLy8uL3NyYy91bml0Q29udmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2VhdGhlckFQSUNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYXRoZXJPYmplY3RzLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB7Z2V0V2VhdGhlckRhdGEsIGdldDVEYXlXZWF0aGVyRGF0YX0gZnJvbSAnLi93ZWF0aGVyQVBJQ2FsbCc7XHJcbmltcG9ydCBjb252ZXJ0VW5pdHMgZnJvbSAnLi91bml0Q29udmVyc2lvbic7XHJcbmltcG9ydCB7RnV0dXJlV2VhdGhlciwgY3VycmVudFVuaXRzfSBmcm9tICcuL3dlYXRoZXJPYmplY3RzJ1xyXG5cclxuY29uc3QgVUkgPSBmdW5jdGlvbiBjcmVhdGVVSSAoKXtcclxuICAvLyBjaGFuZ2VzIGFsbCB3ZWF0aGVyIGRhdGEgZm9yIHRvZGF5XHJcbiAgY29uc3QgcmVuZGVyQ3VycmVudFdlYXRoZXJEYXRhID0gZnVuY3Rpb24gY2hhbmdlQ3VycmVudFdlYXRoZXJEYXRhVG9NYXRjaERPTShjdXJyV2VhdGhlckRhdGEsIGlzRmFocmVuaGVpdCl7XHJcbiAgICAvLyBnZXRzIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBuZWVkIHRvIGJlIGNoYW5nZWRcclxuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtd2VhdGhlcl0nKTtcclxuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbkRPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxvY2F0aW9uXScpO1xyXG4gICAgY29uc3QgY3VycmVudFRpbWVET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10aW1lXScpO1xyXG4gICAgY29uc3QgY3VycmVudFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC10ZW1wZXJhdHVyZScpO1xyXG4gICAgY29uc3QgY3VycmVudEhpZ2hUZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWN1cnJlbnQtaGlnaCcpO1xyXG4gICAgY29uc3QgY3VycmVudExvd1RlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC1sb3cnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC13aW5kJyk7XHJcbiAgICBjb25zdCBjdXJyZW50SHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LWh1bWlkaXR5Jyk7XHJcblxyXG4gICAgY3VycmVudFdlYXRoZXJET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgY3VycmVudExvY2F0aW9uRE9NLmlubmVyVGV4dCA9IGN1cnJXZWF0aGVyRGF0YS5sb2NhdGlvbjtcclxuICAgIGN1cnJlbnRUaW1lRE9NLmlubmVyVGV4dCA9IGNvbnZlcnRVbml0cy51bml4VG9SZWd1bGFyVGltZShjdXJyV2VhdGhlckRhdGEudGltZSwgY3VycldlYXRoZXJEYXRhLnRpbWV6b25lKTtcclxuICAgIGN1cnJlbnRIdW1pZGl0eS5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7Y3VycldlYXRoZXJEYXRhLmh1bWlkaXR5fSVgO1xyXG5cclxuICAgIGlmKGlzRmFocmVuaGVpdCl7XHJcbiAgICAgIGN1cnJlbnRUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgJHtjb252ZXJ0VW5pdHMua1RvRihjdXJyV2VhdGhlckRhdGEudGVtcGVyYXR1cmUpfcKwRmA7XHJcbiAgICAgIGN1cnJlbnRIaWdoVGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYEhpZ2g6ICR7Y29udmVydFVuaXRzLmtUb0YoY3VycldlYXRoZXJEYXRhLm1heF90ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgICAgY3VycmVudExvd1RlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGBMb3c6ICR7Y29udmVydFVuaXRzLmtUb0YoY3VycldlYXRoZXJEYXRhLm1pbl90ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgICAgY3VycmVudFdpbmQuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7Y29udmVydFVuaXRzLm1Ub01pKGN1cnJXZWF0aGVyRGF0YS53aW5kX3NwZWVkKX0gbXBoYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgJHtjb252ZXJ0VW5pdHMua1RvQyhjdXJyV2VhdGhlckRhdGEudGVtcGVyYXR1cmUpfcKwQ2A7XHJcbiAgICAgIGN1cnJlbnRIaWdoVGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYEhpZ2g6ICR7Y29udmVydFVuaXRzLmtUb0MoY3VycldlYXRoZXJEYXRhLm1heF90ZW1wZXJhdHVyZSl9wrBDYDtcclxuICAgICAgY3VycmVudExvd1RlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGBMb3c6ICR7Y29udmVydFVuaXRzLmtUb0MoY3VycldlYXRoZXJEYXRhLm1pbl90ZW1wZXJhdHVyZSl9wrBDYDtcclxuICAgICAgY3VycmVudFdpbmQuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7Y3VycldlYXRoZXJEYXRhLndpbmRfc3BlZWR9IG0vc2A7ICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmU1RGF5V2VhdGhlckRhdGEgKCl7XHJcbiAgICBjb25zdCBhbGxXZWF0aGVyQ2FyZEVsZW1zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53ZWF0aGVyLWNhcmQnKV07XHJcbiAgICBhbGxXZWF0aGVyQ2FyZEVsZW1zLmZvckVhY2goZWxlbSA9PiB7XHJcbiAgICAgIGVsZW0ucmVtb3ZlKCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy8gY2hhbmdlcyBhbGwgd2VhdGhlciBkYXRhIGZvciB0aGUgbmV4dCA1IGRheXNcclxuICBjb25zdCByZW5kZXI1RGF5V2VhdGhlckRhdGEgPSBmdW5jdGlvbiBjaGFuZ2U1RGF5V2VhdGhlckRhdGFUb01hdGNoRE9NKHdlYXRoZXJEYXRhLCBpc0ZhaHJlbmhlaXQpe1xyXG4gICAgcmVtb3ZlNURheVdlYXRoZXJEYXRhKCk7XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25leHQtd2Vlay13ZWF0aGVyLWNvbnRhaW5lcicpO1xyXG4gICAgd2VhdGhlckRhdGEuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICBkYXkuaXNGYWhyZW5oZWl0ID0gaXNGYWhyZW5oZWl0OyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICBjb25zdCBkYXlPYmplY3QgPSBuZXcgRnV0dXJlV2VhdGhlcihkYXkpO1xyXG4gICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGRheU9iamVjdC5nZXRET00oKSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTG9jYXRpb25Gb3JtRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIGNvbnN0IGxvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbi1mb3JtJyk7XHJcbiAgICBsb2NhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24nKTtcclxuICAgICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbklucHV0LnZhbHVlO1xyXG4gICAgICBjb25zdCBsb2NhdGlvbkFycmF5ID0gbG9jYXRpb24uc3BsaXQoJywgJyk7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uT2JqID0ge307XHJcbiAgICAgIGxvY2F0aW9uQXJyYXkuZm9yRWFjaCgocHJvcGVydHksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoaW5kZXggPT09IDApe1xyXG4gICAgICAgICAgbG9jYXRpb25PYmouY2l0eSA9IHByb3BlcnR5O1xyXG4gICAgICAgIH0gZWxzZSBpZihpbmRleCA9PT0gMSl7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5zdGF0ZSA9IHByb3BlcnR5O1xyXG4gICAgICAgIH0gZWxzZSBpZihpbmRleCA9PT0gMil7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5jb3VudHJ5ID0gcHJvcGVydHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBjb25zdCBjdXJyV2VhdGhlckRhdGEgPSBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbk9iaik7XHJcbiAgICAgIGNvbnN0IG5leHQ1RGF5V2VhdGhlciA9IGdldDVEYXlXZWF0aGVyRGF0YShsb2NhdGlvbk9iaik7XHJcbiAgICAgIC8vIGNoYW5nZSB0aGUgcHJvbWlzZSB0byBhbiBvYmplY3RcclxuICAgICAgY3VycldlYXRoZXJEYXRhLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcmVuZGVyQ3VycmVudFdlYXRoZXJEYXRhKHZhbHVlLCB0cnVlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG5leHQ1RGF5V2VhdGhlci50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHJlbmRlcjVEYXlXZWF0aGVyRGF0YSh2YWx1ZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIFRPLURPIGVtcHR5IGZvcm0gdmFsdWUgaWYgc3VjY2Vzc2Z1bDsgb3RoZXJ3aXNlIHdyaXRlIGVycm9yXHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkQ2hhbmdlTWV0cmljQnRuKGN1cnJXZWF0aGVyRGF0YSwgbmV4dDVEYXlXZWF0aGVyRGF0YSl7XHJcbiAgICBjb25zdCBjaGFuZ2VNZXRyaWNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhbmdlLXVuaXRzLWJ0bicpO1xyXG4gICAgY2hhbmdlTWV0cmljQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBjdXJyZW50VW5pdHMudG9nZ2xlVW5pdHMoKTtcclxuICAgICAgY29uc3QgaXNGYWhyZW5oZWl0ID0gY3VycmVudFVuaXRzLmdldElzRmFocmVuaGVpdCgpO1xyXG4gICAgICByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEoY3VycldlYXRoZXJEYXRhLCBpc0ZhaHJlbmhlaXQpO1xyXG4gICAgICByZW5kZXI1RGF5V2VhdGhlckRhdGEobmV4dDVEYXlXZWF0aGVyRGF0YSwgaXNGYWhyZW5oZWl0KTsgICAgICBcclxuICB9KX1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckJhY2tncm91bmQoKXtcclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0aWFsUmVuZGVyKGxvY2F0aW9uT2JqKXtcclxuICAgIGFkZExvY2F0aW9uRm9ybUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIGNvbnN0IGN1cnJXZWF0aGVyRGF0YVByb21pc2UgPSBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbk9iaik7XHJcbiAgICBjb25zdCBuZXh0NURheVdlYXRoZXJEYXRhUHJvbWlzZSA9IGdldDVEYXlXZWF0aGVyRGF0YShsb2NhdGlvbk9iaik7XHJcbiAgICBjb25zdCBpc0ZhaHJlbmhlaXQgPSBjdXJyZW50VW5pdHMuZ2V0SXNGYWhyZW5oZWl0KCk7XHJcbiAgICBQcm9taXNlLmFsbChbY3VycldlYXRoZXJEYXRhUHJvbWlzZSwgbmV4dDVEYXlXZWF0aGVyRGF0YVByb21pc2VdKS50aGVuKCh2YWx1ZXMpID0+IHtcclxuICAgICAgcmVuZGVyQ3VycmVudFdlYXRoZXJEYXRhKHZhbHVlc1swXSwgaXNGYWhyZW5oZWl0KTtcclxuICAgICAgcmVuZGVyNURheVdlYXRoZXJEYXRhKHZhbHVlc1sxXSwgaXNGYWhyZW5oZWl0KTtcclxuICAgICAgYWRkQ2hhbmdlTWV0cmljQnRuKHZhbHVlc1swXSwgdmFsdWVzWzFdKTtcclxuICAgIH0pO1xyXG4gICAgcmVuZGVyQmFja2dyb3VuZCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIHJldHVybiB7aW5pdGlhbFJlbmRlcn07XHJcblxyXG59KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVSTsiLCJjb25zdCBjb252ZXJ0VW5pdHMgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IGtUb0MgPSBmdW5jdGlvbiBrZWx2aW5Ub0NlbHNpdXMoa2VsdmluKSB7XHJcbiAgICByZXR1cm4gKGtlbHZpbiAtIDI3My4xNSkudG9GaXhlZCgwKTtcclxuICB9XHJcbiAgXHJcbiAgY29uc3Qga1RvRiA9IGZ1bmN0aW9uIGtlbHZpblRvRmFocmVuaGVpdChrZWx2aW4pIHtcclxuICAgIHJldHVybiAoMS44KihrZWx2aW4gLSAyNzMpKzMyKS50b0ZpeGVkKDApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbVRvTWkgPSBmdW5jdGlvbiBtZXRlcnNUb01pbGVzKG1ldGVycyl7XHJcbiAgICBjb25zdCBtaSA9IChtZXRlcnMvMTYwOS4zNDQpLnRvRml4ZWQoMSk7XHJcbiAgICBpZihtaSA9PT0gXCIwLjBcIil7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0RGF5TmFtZShkYXRlU3RyKXtcclxuICAgICAgY29uc3QgZGF5cyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknXTtcclxuICAgICAgY29uc3QgZGF5SW5kZXggPSBuZXcgRGF0ZShkYXRlU3RyKS5nZXREYXkoKTtcclxuICAgICAgcmV0dXJuIGRheXNbZGF5SW5kZXhdOyAgICBcclxuICB9XHJcblxyXG4gIC8vIFRPLURPIC0gVU5JWCBUSU1FIFRPIExPQ0FMIFRJTUUgSU4gVEhBVCBUSU1FIFpPTkVcclxuICAvLyBmb3JtYXQgbGlrZSA0OjEzUE0sIE1vbmRheSwgSmFudWFyeSAyOCwgMjAyM1xyXG4gIGNvbnN0IHVuaXhUb1JlZ3VsYXJUaW1lID0gZnVuY3Rpb24gY29udmVydFVuaXRUaW1lU3RhbXBUb1JlZ3VsYXJUaW1lKHVuaXhUaW1lLCB0aW1lem9uZSl7XHJcbiAgICBjb25zdCB1bml4QWN0dWFsVGltZSA9IHVuaXhUaW1lICsgdGltZXpvbmU7XHJcbiAgICBjb25zdCBtb250aHMgPSBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXTtcclxuICAgIGNvbnN0IGRheXMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XHJcblxyXG4gICAgLy8gVE8tRE8sIGZpeCBjb2RlIHRvIGRlYWwgd2l0aCBJU09TdHJpbmdcclxuICAgIGNvbnN0IGlzb1N0cmluZyA9IG5ldyBEYXRlKHVuaXhBY3R1YWxUaW1lICogMTAwMCkudG9JU09TdHJpbmcoKTtcclxuICAgIGNvbnN0IGRhdGVFeGNsdWRpbmdUaW1lID0gbmV3IERhdGUoaXNvU3RyaW5nLnN1YnN0cmluZygwLDEwKSk7XHJcbiAgICBjb25zdCBkYXkgPSBkYXlzW2RhdGVFeGNsdWRpbmdUaW1lLmdldERheSgpXTtcclxuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBgJHttb250aHNbZGF0ZUV4Y2x1ZGluZ1RpbWUuZ2V0TW9udGgoKV19ICR7ZGF0ZUV4Y2x1ZGluZ1RpbWUuZ2V0RGF0ZSgpfSwgJHtkYXRlRXhjbHVkaW5nVGltZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAvLyB0aW1lIGlzIGluIEhIOk1NOlNTIGZvcm1hdFxyXG4gICAgY29uc3QgdGltZSA9IGlzb1N0cmluZy5zdWJzdHJpbmcoMTEsIDE4KTtcclxuICAgIGNvbnN0IGhvdXIgPSBOdW1iZXIodGltZS5zdWJzdHJpbmcoMCwgMikpO1xyXG4gICAgY29uc3QgbWludXRlcyA9IFN0cmluZyh0aW1lLnN1YnN0cmluZygzLDUpKTtcclxuICAgIGxldCB0aW1lRm9ybWF0O1xyXG4gICAgaWYoaG91ciA9PT0gMCl7XHJcbiAgICAgIHRpbWVGb3JtYXQgPSBgMTI6JHttaW51dGVzfSBBTWA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGhvdXIgPiAxMil7XHJcbiAgICAgIHRpbWVGb3JtYXQgPSBgJHtob3VyICUgMTJ9OiR7bWludXRlc30gUE1gXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aW1lRm9ybWF0PSBgJHtob3VyfToke21pbnV0ZXN9IEFNYDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYCR7dGltZUZvcm1hdH0sICR7ZGF5fSwgJHtkYXRlRm9ybWF0fWA7XHJcbiAgfVxyXG4gIHJldHVybiB7a1RvQywga1RvRiwgbVRvTWksIGdldERheU5hbWUsIHVuaXhUb1JlZ3VsYXJUaW1lfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnRVbml0czsiLCJpbXBvcnQgY29udmVydFVuaXRzIGZyb20gXCIuL3VuaXRDb252ZXJzaW9uXCI7XHJcblxyXG4vLyBzaG91bGQga2VlcCBBUEkgS2V5IGluIGJhY2stZW5kIG9uY2UgbGVhcm4gaG93IHRvXHJcbmNvbnN0IEFQSUtleSA9ICc4NDY0OGRmMWNkODg5NWZhODUyNjQ1MmYzNzI1YzkzYyc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRDb29yZHMgKHtjaXR5LCBzdGF0ZSwgY291bnRyeX0gPSB7fSl7XHJcbiAgY29uc3Qgb2JqID0ge2NpdHksIHN0YXRlLCBjb3VudHJ5fTtcclxuICBsZXQgYXBpTG9jYXRpb25TdHJpbmcgPSAnJztcclxuICBPYmplY3QudmFsdWVzKG9iaikuZm9yRWFjaCh2YWwgPT4ge1xyXG4gICAgaWYodmFsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYoYXBpTG9jYXRpb25TdHJpbmcgPT09ICcnKXtcclxuICAgICAgICBhcGlMb2NhdGlvblN0cmluZyA9IHZhbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcGlMb2NhdGlvblN0cmluZyA9IGAke2FwaUxvY2F0aW9uU3RyaW5nfSwke3ZhbH1gOyBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHthcGlMb2NhdGlvblN0cmluZ30mbGltaXQ9MSZhcHBpZD0ke0FQSUtleX1gLCB7bW9kZTogJ2NvcnMnfSk7XHJcbiAgY29uc3QgY29vcmRpbmF0ZXNEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzID0ge1xyXG4gICAgbGF0aXR1ZGU6IGNvb3JkaW5hdGVzRGF0YVswXS5sYXQsXHJcbiAgICBsb25naXR1ZGU6IGNvb3JkaW5hdGVzRGF0YVswXS5sb25cclxuICB9XHJcbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyICh7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB7fSl7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHtBUElLZXl9YCwge21vZGU6ICdjb3JzJ30pO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IHJlbGV2YW50V2VhdGhlckRhdGEgPSB7XHJcbiAgICBsb2NhdGlvbjogd2VhdGhlckRhdGEubmFtZSxcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyAlXHJcbiAgICBodW1pZGl0eTogd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eSxcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyBrZWx2aW5cclxuICAgIHRlbXBlcmF0dXJlOiB3ZWF0aGVyRGF0YS5tYWluLnRlbXAsXHJcbiAgICBtYXhfdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcF9tYXgsXHJcbiAgICBtaW5fdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcF9taW4sXHJcbiAgICAvLyBkZWZhdWx0IHVuaXQgaXMgbS9zXHJcbiAgICB3aW5kX3NwZWVkOiB3ZWF0aGVyRGF0YS53aW5kLnNwZWVkLFxyXG4gICAgLy8gdGltZXpvbmUgaXMgaW4gc2Vjb25kcyB2YXIgZCA9IG5ldyBEYXRlKChuZXcgRGF0ZSgpLmdldFRpbWUoKSktMjUyMDAqMTAwMClcclxuICAgIC8vIGQudG9JU09TdHJpbmcoKVxyXG4gICAgdGltZTogd2VhdGhlckRhdGEuZHQsXHJcbiAgICB0aW1lem9uZTogd2VhdGhlckRhdGEudGltZXpvbmUsXHJcbiAgICBkZXNjcmlwdGlvbjogd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvblxyXG4gIH1cclxuICByZXR1cm4gcmVsZXZhbnRXZWF0aGVyRGF0YTtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRXZWF0aGVySWNvbkRPTSh3ZWF0aGVyKXtcclxuICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gIHN3aXRjaCh3ZWF0aGVyKXtcclxuICAgIGNhc2UgJ0NsZWFyJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXN1bicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0Nsb3Vkcyc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZCcsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1RodW5kZXJzdG9ybSc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZC1ib2x0JywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnRHJpenpsZSc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZC1zdW4tcmFpbicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1JhaW4nOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtY2xvdWQtcmFpbicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1Nub3cnOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc25vd2ZsYWtlJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnVG9ybmFkbyc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS10b3JuYWRvJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrOyAgICAgIFxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXNtb2cnLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBpY29uO1xyXG59XHJcblxyXG4vLyB0aGUgb25seSBmcmVlIEFQSSBjYWxsIGZvciBmb3JlY2FzdCBpcyA1IGRheSwgMyBob3VyIHBlcmlvZHNcclxuYXN5bmMgZnVuY3Rpb24gZ2V0NURheVdlYXRoZXIoe2xhdGl0dWRlLCBsb25naXR1ZGV9ID0ge30pe1xyXG4gIC8vIFRPLURPIGFwaSBjYWxsIGlzIGludmFsaWQgYmVjYXVzZSBpdCdzIG5vdCBmcmVlLCBuZWVkIHRvIHVzZSB0aGUgNSBkYXkgb25lXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmFwcGlkPSR7QVBJS2V5fWAsIHttb2RlOiAnY29ycyd9KTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YUFycmF5ID0gd2VhdGhlckRhdGEubGlzdDtcclxuICBjb25zdCByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkgPSBbXTtcclxuICAvLyBjbGVhbiB1cCB0aGUgd2VhdGhlciBkYXRhIGFycmF5IHRvIG9ubHkgZ2V0IHJlbGV2YW50IHZhbHVlc1xyXG4gIHdlYXRoZXJEYXRhQXJyYXkuZm9yRWFjaChyYXdEYXRhT2JqID0+IHtcclxuICAgIGNvbnN0IGRheSA9IGNvbnZlcnRVbml0cy5nZXREYXlOYW1lKHJhd0RhdGFPYmouZHRfdHh0LnN1YnN0cmluZygwLDEwKSlcclxuICAgIGNvbnN0IG1heFRlbXBlcmF0dXJlID0gcmF3RGF0YU9iai5tYWluLnRlbXBfbWF4O1xyXG4gICAgY29uc3QgbWluVGVtcGVyYXR1cmUgPSByYXdEYXRhT2JqLm1haW4udGVtcF9taW47XHJcbiAgICAvLyB3ZWF0aGVyIGhhcyBwb3RlbnRpYWwgdmFsdWVzIFRodW5kZXJzdG9ybSwgRHJpenpsZSwgUmFpbiwgU25vdywgQSBsb3Qgb2YgRGlmZmVyZW50IEF0bW9zcGhlcmUgT25lcywgQ2xlYXIsIENsb3Vkc1xyXG4gICAgY29uc3Qgd2VhdGhlciA9IHJhd0RhdGFPYmoud2VhdGhlclswXS5tYWluO1xyXG4gICAgbGV0IGluc2lkZUFycmF5ID0gZmFsc2U7XHJcbiAgICBcclxuICAgIC8vIG11dGF0ZSBtaW4sIG1heCB0ZW1wZXJhdHVyZSwgd2VhdGhlciBpZiBvYmplY3QgaXMgYWxyZWFkeSBpbiBhcnJheVxyXG4gICAgcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5LmZvckVhY2gocmVsZXZhbnRPYmogPT4ge1xyXG4gICAgICBpZihkYXkgPT09IHJlbGV2YW50T2JqLmRheSl7XHJcbiAgICAgICAgcmVsZXZhbnRPYmoubWF4VGVtcGVyYXR1cmUgPSBNYXRoLm1heChyZWxldmFudE9iai5tYXhUZW1wZXJhdHVyZSwgbWF4VGVtcGVyYXR1cmUpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIHJlbGV2YW50T2JqLm1pblRlbXBlcmF0dXJlID0gTWF0aC5taW4ocmVsZXZhbnRPYmoubWluVGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICBpZigocmVsZXZhbnRPYmoud2VhdGhlciA9PT0gJ0NsZWFyJyB8fCByZWxldmFudE9iai53ZWF0aGVyID09PSAnQ2xvdWRzJykgJiZcclxuICAgICAgICAgICghKHdlYXRoZXIgPT09ICdDbGVhcicgfHwgd2VhdGhlciA9PT0gJ0Nsb3VkcycpKSl7XHJcbiAgICAgICAgICAgIHJlbGV2YW50T2JqLndlYXRoZXIgPSB3ZWF0aGVyOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIH1cclxuICAgICAgICBpbnNpZGVBcnJheSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBcclxuICAgIGlmKCFpbnNpZGVBcnJheSl7XHJcbiAgICAgIHJlbGV2YW50V2VhdGhlckRhdGFBcnJheS5wdXNoKHtkYXksIG1heFRlbXBlcmF0dXJlLCBtaW5UZW1wZXJhdHVyZSwgd2VhdGhlcn0pXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5LmZvckVhY2goZGF0YSA9PiB7XHJcbiAgICBkYXRhLndlYXRoZXJJY29uRE9NID0gZ2V0V2VhdGhlckljb25ET00oZGF0YS53ZWF0aGVyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gIH0pXHJcblxyXG4gIHJldHVybiByZWxldmFudFdlYXRoZXJEYXRhQXJyYXk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhIChsb2NhdGlvbk9iail7XHJcbiAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXIoYXdhaXQgZ2V0Q29vcmRzKGxvY2F0aW9uT2JqKSk7XHJcbiAgcmV0dXJuIHdlYXRoZXI7XHJcbn1cclxuIFxyXG5hc3luYyBmdW5jdGlvbiBnZXQ1RGF5V2VhdGhlckRhdGEgKGxvY2F0aW9uT2JqKXtcclxuICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgZ2V0NURheVdlYXRoZXIoYXdhaXQgZ2V0Q29vcmRzKGxvY2F0aW9uT2JqKSk7XHJcbiAgcmV0dXJuIHdlYXRoZXI7XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0V2VhdGhlckRhdGEsIGdldDVEYXlXZWF0aGVyRGF0YX07IiwiaW1wb3J0IGNvbnZlcnRVbml0cyBmcm9tIFwiLi91bml0Q29udmVyc2lvblwiO1xyXG5cclxuLy8gaHRtbCBoZWxwZXIgZnVuY3Rpb25zXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigge2VsZW1lbnQsIGNsYXNzZXMsIGlkZW50aWZpZXIsIGNoaWxkRWxlbWVudHMsIGN1c3RvbUF0dHJpYnV0ZX0pe1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gIGlmKGNsYXNzZXMpe1xyXG4gICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gIH1cclxuICBpZihpZGVudGlmaWVyKXtcclxuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICB9XHJcbiAgaWYoY2hpbGRFbGVtZW50cyl7XHJcbiAgICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaChpdGVtID0+IG5vZGUuYXBwZW5kQ2hpbGQoaXRlbSkpXHJcbiAgfVxyXG4gIGlmKGN1c3RvbUF0dHJpYnV0ZSl7XHJcbiAgICAgIGlmKGN1c3RvbUF0dHJpYnV0ZS5sZW5ndGggPiAxKXtcclxuICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGN1c3RvbUF0dHJpYnV0ZVswXSwgY3VzdG9tQXR0cmlidXRlWzFdKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRhZygge2VsZW1lbnQsIHRleHQsIGNsYXNzZXMsIGlkZW50aWZpZXJ9KXtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICBpZihjbGFzc2VzKXtcclxuICAgICAgY2xhc3Nlcy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGl0ZW0pKTtcclxuICB9XHJcbiAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdpZCcsaWRlbnRpZmllcik7XHJcbiAgfVxyXG4gIGlmKHRleHQpe1xyXG4gICAgICBub2RlLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5jb25zdCBGdXR1cmVXZWF0aGVyID0gY2xhc3Mge1xyXG4gIGNvbnN0cnVjdG9yKHtkYXksIG1heFRlbXBlcmF0dXJlLCBtaW5UZW1wZXJhdHVyZSwgd2VhdGhlciwgd2VhdGhlckljb25ET00sIGlzRmFocmVuaGVpdH0pe1xyXG4gICAgdGhpcy5kYXkgPSBkYXk7XHJcbiAgICB0aGlzLm1heFRlbXBlcmF0dXJlID0gbWF4VGVtcGVyYXR1cmU7XHJcbiAgICB0aGlzLm1pblRlbXBlcmF0dXJlID0gbWluVGVtcGVyYXR1cmU7XHJcbiAgICB0aGlzLndlYXRoZXIgPSB3ZWF0aGVyO1xyXG4gICAgdGhpcy53ZWF0aGVySWNvbkRPTSA9IHdlYXRoZXJJY29uRE9NO1xyXG4gICAgdGhpcy5pc0ZhaHJlbmhlaXQgPSBpc0ZhaHJlbmhlaXQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0RE9NKCl7XHJcbiAgICBjb25zdCBkYXlUZXh0ID0gY3JlYXRlVGFnKHtcclxuICAgICAgZWxlbWVudDogJ2gyJyxcclxuICAgICAgY2xhc3NlczogWydub3JtYWwtaGVhZGVyJ10sXHJcbiAgICAgIHRleHQ6IHRoaXMuZGF5XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gdGhpcy53ZWF0aGVySWNvbkRPTTtcclxuXHJcbiAgICBjb25zdCBoaWdoVGVtcGVyYXR1cmUgPSBjcmVhdGVUYWcoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ25vcm1hbC1oZWFkZXInXSxcclxuICAgICAgdGV4dDogdGhpcy5pc0ZhaHJlbmhlaXQgPyBgJHtjb252ZXJ0VW5pdHMua1RvRih0aGlzLm1heFRlbXBlcmF0dXJlKX3CsGAgOiBgJHtjb252ZXJ0VW5pdHMua1RvQyh0aGlzLm1heFRlbXBlcmF0dXJlKX3CsGBcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgbG93VGVtcGVyYXR1cmUgPSBjcmVhdGVUYWcoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ25vcm1hbC1oZWFkZXInLCdsb3ctdGVtcGVyYXR1cmUnXSxcclxuICAgICAgdGV4dDogdGhpcy5pc0ZhaHJlbmhlaXQgPyBgJHtjb252ZXJ0VW5pdHMua1RvRih0aGlzLm1pblRlbXBlcmF0dXJlKX3CsGAgOiBgJHtjb252ZXJ0VW5pdHMua1RvQyh0aGlzLm1pblRlbXBlcmF0dXJlKX3CsGBcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgaGlnaExvd1RlbXBlcmF0dXJlQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKHtcclxuICAgICAgZWxlbWVudDogJ2gyJyxcclxuICAgICAgY2xhc3NlczogWydoaWdoLWxvdy10ZW1wZXJhdHVyZXMnXSxcclxuICAgICAgY2hpbGRFbGVtZW50czogW2hpZ2hUZW1wZXJhdHVyZSwgbG93VGVtcGVyYXR1cmVdXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcih7XHJcbiAgICAgIGVsZW1lbnQ6ICdkaXYnLFxyXG4gICAgICBjbGFzc2VzOiBbJ3dlYXRoZXItY2FyZCddLFxyXG4gICAgICBjaGlsZEVsZW1lbnRzOiBbZGF5VGV4dCwgd2VhdGhlckljb24sIGhpZ2hMb3dUZW1wZXJhdHVyZUNvbnRhaW5lcl1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGN1cnJlbnRVbml0cyA9ICAoKCkgPT4ge1xyXG4gIGxldCBpc0ZhaHJlbmhlaXQgPSB0cnVlO1xyXG5cclxuICBmdW5jdGlvbiBnZXRJc0ZhaHJlbmhlaXQoKXtcclxuICAgIHJldHVybiBpc0ZhaHJlbmhlaXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b2dnbGVVbml0cygpe1xyXG4gICAgaXNGYWhyZW5oZWl0ID0gIWlzRmFocmVuaGVpdDtcclxuICB9XHJcblxyXG4gIHJldHVybiB7Z2V0SXNGYWhyZW5oZWl0LCB0b2dnbGVVbml0c307XHJcbn0pKCk7XHJcblxyXG5cclxuZXhwb3J0IHtGdXR1cmVXZWF0aGVyLCBjdXJyZW50VW5pdHN9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVSSBmcm9tICcuL1VJJ1xyXG5cclxuLy8gY3JlYXRlcyB0aGUgd2VhdGhlciBwYWdlXHJcbmNvbnN0IG1haW4gPSBmdW5jdGlvbiBkb0FsbE9wZXJhdGlvbnMoKXtcclxuICBjb25zdCBpbml0aWFsTG9jYXRpb24gPSB7XHJcbiAgICBjaXR5OiAnU2FuIEZyYW5jaXNjbydcclxuICB9XHJcbiAgVUkuaW5pdGlhbFJlbmRlcihpbml0aWFsTG9jYXRpb24pO1xyXG59XHJcblxyXG5tYWluKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9