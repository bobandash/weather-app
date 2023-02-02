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
/* harmony import */ var _nextWeekWeather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nextWeekWeather */ "./src/nextWeekWeather.js");






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
  const render5DayWeatherData = function change5DayWeatherDataToMatchDOM(weatherData){
    remove5DayWeatherData();
    const parentElement = document.getElementById('next-week-weather-container');
    weatherData.forEach(day => {
      const dayObject = new _nextWeekWeather__WEBPACK_IMPORTED_MODULE_2__["default"](day);
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

/*   function addChangeMetricBtn(currWeatherData, next5DayWeatherData){
    const changeMetricBtn = document.getElementById('change-units-btn');
    changeMetricBtn.addEventListener('click', function(){
      next5DayWeatherData.forEach(data => data.toggleUnits())
    })
    const isFahrenheit = next5DayWeatherData.isFahreheit;
    renderCurrentWeatherData(currWeatherData, isFahrenheit);
    render5DayWeatherData(next5DayWeatherData);
  } */

  function initialRender(locationObj){
    addLocationFormFunctionality();

    const currWeatherDataPromise = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(locationObj);
    const next5DayWeatherDataPromise = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.get5DayWeatherData)(locationObj);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);

/***/ }),

/***/ "./src/nextWeekWeather.js":
/*!********************************!*\
  !*** ./src/nextWeekWeather.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
  constructor({day, maxTemperature, minTemperature, weather, weatherIconDOM}){
    this.day = day;
    this.maxTemperature = maxTemperature;
    this.minTemperature = minTemperature;
    this.weather = weather;
    this.weatherIconDOM = weatherIconDOM;
    this.isFahrenheit = true;
  }

  toggleUnits(){
    this.isFahrenheit = !this.isFahrenheit;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FutureWeather);


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

  function getDayName(dateStr, locale){
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: 'long' });        
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
    const timeFormat = hour > 12 ? `${hour % 12}:${minutes} PM` : `${hour}:${minutes} AM`;
    
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
    const day = _unitConversion__WEBPACK_IMPORTED_MODULE_0__["default"].getDayName(rawDataObj.dt_txt.substring(0,10), "en-US");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxhQUFhO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrRUFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGO0FBQzVGLDRGQUE0RjtBQUM1RjtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EscUNBQXFDLDZDQUE2QztBQUNsRjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNELEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcklBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx5REFBZ0I7QUFDbEI7QUFDQTtBQUNBLE8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHRXZWVrV2VhdGhlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdENvbnZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYXRoZXJBUElDYWxsLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB7Z2V0V2VhdGhlckRhdGEsIGdldDVEYXlXZWF0aGVyRGF0YX0gZnJvbSAnLi93ZWF0aGVyQVBJQ2FsbCc7XHJcbmltcG9ydCBjb252ZXJ0VW5pdHMgZnJvbSAnLi91bml0Q29udmVyc2lvbic7XHJcbmltcG9ydCBGdXR1cmVXZWF0aGVyIGZyb20gJy4vbmV4dFdlZWtXZWF0aGVyJ1xyXG5cclxuY29uc3QgVUkgPSBmdW5jdGlvbiBjcmVhdGVVSSAoKXtcclxuICAvLyBjaGFuZ2VzIGFsbCB3ZWF0aGVyIGRhdGEgZm9yIHRvZGF5XHJcbiAgY29uc3QgcmVuZGVyQ3VycmVudFdlYXRoZXJEYXRhID0gZnVuY3Rpb24gY2hhbmdlQ3VycmVudFdlYXRoZXJEYXRhVG9NYXRjaERPTShjdXJyV2VhdGhlckRhdGEsIGlzRmFocmVuaGVpdCl7XHJcbiAgICAvLyBnZXRzIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBuZWVkIHRvIGJlIGNoYW5nZWRcclxuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtd2VhdGhlcl0nKTtcclxuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbkRPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxvY2F0aW9uXScpO1xyXG4gICAgY29uc3QgY3VycmVudFRpbWVET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10aW1lXScpO1xyXG4gICAgY29uc3QgY3VycmVudFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC10ZW1wZXJhdHVyZScpO1xyXG4gICAgY29uc3QgY3VycmVudEhpZ2hUZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWN1cnJlbnQtaGlnaCcpO1xyXG4gICAgY29uc3QgY3VycmVudExvd1RlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC1sb3cnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC13aW5kJyk7XHJcbiAgICBjb25zdCBjdXJyZW50SHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LWh1bWlkaXR5Jyk7XHJcblxyXG4gICAgY3VycmVudFdlYXRoZXJET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgY3VycmVudExvY2F0aW9uRE9NLmlubmVyVGV4dCA9IGN1cnJXZWF0aGVyRGF0YS5sb2NhdGlvbjtcclxuICAgIGN1cnJlbnRUaW1lRE9NLmlubmVyVGV4dCA9IGNvbnZlcnRVbml0cy51bml4VG9SZWd1bGFyVGltZShjdXJyV2VhdGhlckRhdGEudGltZSwgY3VycldlYXRoZXJEYXRhLnRpbWV6b25lKTtcclxuICAgIGN1cnJlbnRIdW1pZGl0eS5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7Y3VycldlYXRoZXJEYXRhLmh1bWlkaXR5fSVgO1xyXG5cclxuICAgIGlmKGlzRmFocmVuaGVpdCl7XHJcbiAgICAgIGN1cnJlbnRUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgJHtjb252ZXJ0VW5pdHMua1RvRihjdXJyV2VhdGhlckRhdGEudGVtcGVyYXR1cmUpfcKwRmA7XHJcbiAgICAgIGN1cnJlbnRIaWdoVGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYEhpZ2g6ICR7Y29udmVydFVuaXRzLmtUb0YoY3VycldlYXRoZXJEYXRhLm1heF90ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgICAgY3VycmVudExvd1RlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGBMb3c6ICR7Y29udmVydFVuaXRzLmtUb0YoY3VycldlYXRoZXJEYXRhLm1pbl90ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgICAgY3VycmVudFdpbmQuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7Y29udmVydFVuaXRzLm1Ub01pKGN1cnJXZWF0aGVyRGF0YS53aW5kX3NwZWVkKX0gbXBoYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgJHtjb252ZXJ0VW5pdHMua1RvQyhjdXJyV2VhdGhlckRhdGEudGVtcGVyYXR1cmUpfcKwQ2A7XHJcbiAgICAgIGN1cnJlbnRIaWdoVGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYEhpZ2g6ICR7Y29udmVydFVuaXRzLmtUb0MoY3VycldlYXRoZXJEYXRhLm1heF90ZW1wZXJhdHVyZSl9wrBDYDtcclxuICAgICAgY3VycmVudExvd1RlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGBMb3c6ICR7Y29udmVydFVuaXRzLmtUb0MoY3VycldlYXRoZXJEYXRhLm1pbl90ZW1wZXJhdHVyZSl9wrBDYDtcclxuICAgICAgY3VycmVudFdpbmQuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7Y3VycldlYXRoZXJEYXRhLndpbmRfc3BlZWR9IG0vc2A7ICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmU1RGF5V2VhdGhlckRhdGEgKCl7XHJcbiAgICBjb25zdCBhbGxXZWF0aGVyQ2FyZEVsZW1zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53ZWF0aGVyLWNhcmQnKV07XHJcbiAgICBhbGxXZWF0aGVyQ2FyZEVsZW1zLmZvckVhY2goZWxlbSA9PiB7XHJcbiAgICAgIGVsZW0ucmVtb3ZlKCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy8gY2hhbmdlcyBhbGwgd2VhdGhlciBkYXRhIGZvciB0aGUgbmV4dCA1IGRheXNcclxuICBjb25zdCByZW5kZXI1RGF5V2VhdGhlckRhdGEgPSBmdW5jdGlvbiBjaGFuZ2U1RGF5V2VhdGhlckRhdGFUb01hdGNoRE9NKHdlYXRoZXJEYXRhKXtcclxuICAgIHJlbW92ZTVEYXlXZWF0aGVyRGF0YSgpO1xyXG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0LXdlZWstd2VhdGhlci1jb250YWluZXInKTtcclxuICAgIHdlYXRoZXJEYXRhLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgY29uc3QgZGF5T2JqZWN0ID0gbmV3IEZ1dHVyZVdlYXRoZXIoZGF5KTtcclxuICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChkYXlPYmplY3QuZ2V0RE9NKCkpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZExvY2F0aW9uRm9ybUZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24tZm9ybScpO1xyXG4gICAgbG9jYXRpb25Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBsb2NhdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJyk7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gbG9jYXRpb25JbnB1dC52YWx1ZTtcclxuICAgICAgY29uc3QgbG9jYXRpb25BcnJheSA9IGxvY2F0aW9uLnNwbGl0KCcsICcpO1xyXG4gICAgICBjb25zdCBsb2NhdGlvbk9iaiA9IHt9O1xyXG4gICAgICBsb2NhdGlvbkFycmF5LmZvckVhY2goKHByb3BlcnR5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKGluZGV4ID09PSAwKXtcclxuICAgICAgICAgIGxvY2F0aW9uT2JqLmNpdHkgPSBwcm9wZXJ0eTtcclxuICAgICAgICB9IGVsc2UgaWYoaW5kZXggPT09IDEpe1xyXG4gICAgICAgICAgbG9jYXRpb25PYmouc3RhdGUgPSBwcm9wZXJ0eTtcclxuICAgICAgICB9IGVsc2UgaWYoaW5kZXggPT09IDIpe1xyXG4gICAgICAgICAgbG9jYXRpb25PYmouY291bnRyeSA9IHByb3BlcnR5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgY29uc3QgY3VycldlYXRoZXJEYXRhID0gZ2V0V2VhdGhlckRhdGEobG9jYXRpb25PYmopO1xyXG4gICAgICBjb25zdCBuZXh0NURheVdlYXRoZXIgPSBnZXQ1RGF5V2VhdGhlckRhdGEobG9jYXRpb25PYmopO1xyXG4gICAgICAvLyBjaGFuZ2UgdGhlIHByb21pc2UgdG8gYW4gb2JqZWN0XHJcbiAgICAgIGN1cnJXZWF0aGVyRGF0YS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHJlbmRlckN1cnJlbnRXZWF0aGVyRGF0YSh2YWx1ZSwgdHJ1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBuZXh0NURheVdlYXRoZXIudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICByZW5kZXI1RGF5V2VhdGhlckRhdGEodmFsdWUpO1xyXG4gICAgICB9KVxyXG4gICAgICAvLyBUTy1ETyBlbXB0eSBmb3JtIHZhbHVlIGlmIHN1Y2Nlc3NmdWw7IG90aGVyd2lzZSB3cml0ZSBlcnJvclxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4vKiAgIGZ1bmN0aW9uIGFkZENoYW5nZU1ldHJpY0J0bihjdXJyV2VhdGhlckRhdGEsIG5leHQ1RGF5V2VhdGhlckRhdGEpe1xyXG4gICAgY29uc3QgY2hhbmdlTWV0cmljQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYW5nZS11bml0cy1idG4nKTtcclxuICAgIGNoYW5nZU1ldHJpY0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIG5leHQ1RGF5V2VhdGhlckRhdGEuZm9yRWFjaChkYXRhID0+IGRhdGEudG9nZ2xlVW5pdHMoKSlcclxuICAgIH0pXHJcbiAgICBjb25zdCBpc0ZhaHJlbmhlaXQgPSBuZXh0NURheVdlYXRoZXJEYXRhLmlzRmFocmVoZWl0O1xyXG4gICAgcmVuZGVyQ3VycmVudFdlYXRoZXJEYXRhKGN1cnJXZWF0aGVyRGF0YSwgaXNGYWhyZW5oZWl0KTtcclxuICAgIHJlbmRlcjVEYXlXZWF0aGVyRGF0YShuZXh0NURheVdlYXRoZXJEYXRhKTtcclxuICB9ICovXHJcblxyXG4gIGZ1bmN0aW9uIGluaXRpYWxSZW5kZXIobG9jYXRpb25PYmope1xyXG4gICAgYWRkTG9jYXRpb25Gb3JtRnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJXZWF0aGVyRGF0YVByb21pc2UgPSBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbk9iaik7XHJcbiAgICBjb25zdCBuZXh0NURheVdlYXRoZXJEYXRhUHJvbWlzZSA9IGdldDVEYXlXZWF0aGVyRGF0YShsb2NhdGlvbk9iaik7XHJcbiAgICAvLyBjaGFuZ2UgdGhlIHByb21pc2UgdG8gYW4gb2JqZWN0XHJcbiAgICBjdXJyV2VhdGhlckRhdGFQcm9taXNlLnRoZW4oKGN1cnJXZWF0aGVyRGF0YSkgPT4ge1xyXG4gICAgICByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEoY3VycldlYXRoZXJEYXRhLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgbmV4dDVEYXlXZWF0aGVyRGF0YVByb21pc2UudGhlbigoZml2ZURheVdlYXRoZXJEYXRhKSA9PiB7XHJcbiAgICAgIHJlbmRlcjVEYXlXZWF0aGVyRGF0YShmaXZlRGF5V2VhdGhlckRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJOZXdMb2NhdGlvbih3ZWF0aGVyRGF0YSl7XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtpbml0aWFsUmVuZGVyLCByZW5kZXJOZXdMb2NhdGlvbn07XHJcblxyXG59KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVSTsiLCJpbXBvcnQgY29udmVydFVuaXRzIGZyb20gXCIuL3VuaXRDb252ZXJzaW9uXCI7XHJcblxyXG4vLyBodG1sIGhlbHBlciBmdW5jdGlvbnNcclxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCB7ZWxlbWVudCwgY2xhc3NlcywgaWRlbnRpZmllciwgY2hpbGRFbGVtZW50cywgY3VzdG9tQXR0cmlidXRlfSl7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgaWYoY2xhc3Nlcyl7XHJcbiAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgfVxyXG4gIGlmKGlkZW50aWZpZXIpe1xyXG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnaWQnLGlkZW50aWZpZXIpO1xyXG4gIH1cclxuICBpZihjaGlsZEVsZW1lbnRzKXtcclxuICAgICAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5hcHBlbmRDaGlsZChpdGVtKSlcclxuICB9XHJcbiAgaWYoY3VzdG9tQXR0cmlidXRlKXtcclxuICAgICAgaWYoY3VzdG9tQXR0cmlidXRlLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoY3VzdG9tQXR0cmlidXRlWzBdLCBjdXN0b21BdHRyaWJ1dGVbMV0pO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFnKCB7ZWxlbWVudCwgdGV4dCwgY2xhc3NlcywgaWRlbnRpZmllcn0pe1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gIGlmKGNsYXNzZXMpe1xyXG4gICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gIH1cclxuICBpZihpZGVudGlmaWVyKXtcclxuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICB9XHJcbiAgaWYodGV4dCl7XHJcbiAgICAgIG5vZGUuaW5uZXJUZXh0ID0gdGV4dDtcclxuICB9XHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmNvbnN0IEZ1dHVyZVdlYXRoZXIgPSBjbGFzcyB7XHJcbiAgY29uc3RydWN0b3Ioe2RheSwgbWF4VGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlLCB3ZWF0aGVyLCB3ZWF0aGVySWNvbkRPTX0pe1xyXG4gICAgdGhpcy5kYXkgPSBkYXk7XHJcbiAgICB0aGlzLm1heFRlbXBlcmF0dXJlID0gbWF4VGVtcGVyYXR1cmU7XHJcbiAgICB0aGlzLm1pblRlbXBlcmF0dXJlID0gbWluVGVtcGVyYXR1cmU7XHJcbiAgICB0aGlzLndlYXRoZXIgPSB3ZWF0aGVyO1xyXG4gICAgdGhpcy53ZWF0aGVySWNvbkRPTSA9IHdlYXRoZXJJY29uRE9NO1xyXG4gICAgdGhpcy5pc0ZhaHJlbmhlaXQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVW5pdHMoKXtcclxuICAgIHRoaXMuaXNGYWhyZW5oZWl0ID0gIXRoaXMuaXNGYWhyZW5oZWl0O1xyXG4gIH1cclxuXHJcbiAgZ2V0RE9NKCl7XHJcbiAgICBjb25zdCBkYXlUZXh0ID0gY3JlYXRlVGFnKHtcclxuICAgICAgZWxlbWVudDogJ2gyJyxcclxuICAgICAgY2xhc3NlczogWydub3JtYWwtaGVhZGVyJ10sXHJcbiAgICAgIHRleHQ6IHRoaXMuZGF5XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gdGhpcy53ZWF0aGVySWNvbkRPTTtcclxuXHJcbiAgICBjb25zdCBoaWdoVGVtcGVyYXR1cmUgPSBjcmVhdGVUYWcoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ25vcm1hbC1oZWFkZXInXSxcclxuICAgICAgdGV4dDogdGhpcy5pc0ZhaHJlbmhlaXQgPyBgJHtjb252ZXJ0VW5pdHMua1RvRih0aGlzLm1heFRlbXBlcmF0dXJlKX3CsGAgOiBgJHtjb252ZXJ0VW5pdHMua1RvQyh0aGlzLm1heFRlbXBlcmF0dXJlKX3CsGBcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgbG93VGVtcGVyYXR1cmUgPSBjcmVhdGVUYWcoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ25vcm1hbC1oZWFkZXInLCdsb3ctdGVtcGVyYXR1cmUnXSxcclxuICAgICAgdGV4dDogdGhpcy5pc0ZhaHJlbmhlaXQgPyBgJHtjb252ZXJ0VW5pdHMua1RvRih0aGlzLm1pblRlbXBlcmF0dXJlKX3CsGAgOiBgJHtjb252ZXJ0VW5pdHMua1RvQyh0aGlzLm1pblRlbXBlcmF0dXJlKX3CsGBcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgaGlnaExvd1RlbXBlcmF0dXJlQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKHtcclxuICAgICAgZWxlbWVudDogJ2gyJyxcclxuICAgICAgY2xhc3NlczogWydoaWdoLWxvdy10ZW1wZXJhdHVyZXMnXSxcclxuICAgICAgY2hpbGRFbGVtZW50czogW2hpZ2hUZW1wZXJhdHVyZSwgbG93VGVtcGVyYXR1cmVdXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcih7XHJcbiAgICAgIGVsZW1lbnQ6ICdkaXYnLFxyXG4gICAgICBjbGFzc2VzOiBbJ3dlYXRoZXItY2FyZCddLFxyXG4gICAgICBjaGlsZEVsZW1lbnRzOiBbZGF5VGV4dCwgd2VhdGhlckljb24sIGhpZ2hMb3dUZW1wZXJhdHVyZUNvbnRhaW5lcl1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGdXR1cmVXZWF0aGVyO1xyXG4iLCJjb25zdCBjb252ZXJ0VW5pdHMgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IGtUb0MgPSBmdW5jdGlvbiBrZWx2aW5Ub0NlbHNpdXMoa2VsdmluKSB7XHJcbiAgICByZXR1cm4gKGtlbHZpbiAtIDI3My4xNSkudG9GaXhlZCgwKTtcclxuICB9XHJcbiAgXHJcbiAgY29uc3Qga1RvRiA9IGZ1bmN0aW9uIGtlbHZpblRvRmFocmVuaGVpdChrZWx2aW4pIHtcclxuICAgIHJldHVybiAoMS44KihrZWx2aW4gLSAyNzMpKzMyKS50b0ZpeGVkKDApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbVRvTWkgPSBmdW5jdGlvbiBtZXRlcnNUb01pbGVzKG1ldGVycyl7XHJcbiAgICBjb25zdCBtaSA9IChtZXRlcnMvMTYwOS4zNDQpLnRvRml4ZWQoMSk7XHJcbiAgICBpZihtaSA9PT0gXCIwLjBcIil7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0RGF5TmFtZShkYXRlU3RyLCBsb2NhbGUpe1xyXG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cik7XHJcbiAgICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pOyAgICAgICAgXHJcbiAgfVxyXG5cclxuICAvLyBUTy1ETyAtIFVOSVggVElNRSBUTyBMT0NBTCBUSU1FIElOIFRIQVQgVElNRSBaT05FXHJcbiAgLy8gZm9ybWF0IGxpa2UgNDoxM1BNLCBNb25kYXksIEphbnVhcnkgMjgsIDIwMjNcclxuICBjb25zdCB1bml4VG9SZWd1bGFyVGltZSA9IGZ1bmN0aW9uIGNvbnZlcnRVbml0VGltZVN0YW1wVG9SZWd1bGFyVGltZSh1bml4VGltZSwgdGltZXpvbmUpe1xyXG4gICAgY29uc3QgdW5peEFjdHVhbFRpbWUgPSB1bml4VGltZSArIHRpbWV6b25lO1xyXG4gICAgY29uc3QgbW9udGhzID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl07XHJcbiAgICBjb25zdCBkYXlzID0gWydNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JywgJ1N1bmRheSddO1xyXG5cclxuICAgIC8vIFRPLURPLCBmaXggY29kZSB0byBkZWFsIHdpdGggSVNPU3RyaW5nXHJcbiAgICBjb25zdCBpc29TdHJpbmcgPSBuZXcgRGF0ZSh1bml4QWN0dWFsVGltZSAqIDEwMDApLnRvSVNPU3RyaW5nKCk7XHJcbiAgICBjb25zdCBkYXRlRXhjbHVkaW5nVGltZSA9IG5ldyBEYXRlKGlzb1N0cmluZy5zdWJzdHJpbmcoMCwxMCkpO1xyXG4gICAgY29uc3QgZGF5ID0gZGF5c1tkYXRlRXhjbHVkaW5nVGltZS5nZXREYXkoKV07XHJcbiAgICBjb25zdCBkYXRlRm9ybWF0ID0gYCR7bW9udGhzW2RhdGVFeGNsdWRpbmdUaW1lLmdldE1vbnRoKCldfSAke2RhdGVFeGNsdWRpbmdUaW1lLmdldERhdGUoKX0sICR7ZGF0ZUV4Y2x1ZGluZ1RpbWUuZ2V0RnVsbFllYXIoKX1gO1xyXG4gICAgLy8gdGltZSBpcyBpbiBISDpNTTpTUyBmb3JtYXRcclxuICAgIGNvbnN0IHRpbWUgPSBpc29TdHJpbmcuc3Vic3RyaW5nKDExLCAxOCk7XHJcbiAgICBjb25zdCBob3VyID0gTnVtYmVyKHRpbWUuc3Vic3RyaW5nKDAsIDIpKTtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSBTdHJpbmcodGltZS5zdWJzdHJpbmcoMyw1KSk7XHJcbiAgICBjb25zdCB0aW1lRm9ybWF0ID0gaG91ciA+IDEyID8gYCR7aG91ciAlIDEyfToke21pbnV0ZXN9IFBNYCA6IGAke2hvdXJ9OiR7bWludXRlc30gQU1gO1xyXG4gICAgXHJcbiAgICByZXR1cm4gYCR7dGltZUZvcm1hdH0sICR7ZGF5fSwgJHtkYXRlRm9ybWF0fWA7XHJcbiAgfVxyXG4gIHJldHVybiB7a1RvQywga1RvRiwgbVRvTWksIGdldERheU5hbWUsIHVuaXhUb1JlZ3VsYXJUaW1lfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnRVbml0czsiLCJpbXBvcnQgY29udmVydFVuaXRzIGZyb20gXCIuL3VuaXRDb252ZXJzaW9uXCI7XHJcblxyXG4vLyBzaG91bGQga2VlcCBBUEkgS2V5IGluIGJhY2stZW5kIG9uY2UgbGVhcm4gaG93IHRvXHJcbmNvbnN0IEFQSUtleSA9ICc4NDY0OGRmMWNkODg5NWZhODUyNjQ1MmYzNzI1YzkzYyc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRDb29yZHMgKHtjaXR5LCBzdGF0ZSwgY291bnRyeX0gPSB7fSl7XHJcbiAgY29uc3Qgb2JqID0ge2NpdHksIHN0YXRlLCBjb3VudHJ5fTtcclxuICBsZXQgYXBpTG9jYXRpb25TdHJpbmcgPSAnJztcclxuICBPYmplY3QudmFsdWVzKG9iaikuZm9yRWFjaCh2YWwgPT4ge1xyXG4gICAgaWYodmFsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYoYXBpTG9jYXRpb25TdHJpbmcgPT09ICcnKXtcclxuICAgICAgICBhcGlMb2NhdGlvblN0cmluZyA9IHZhbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcGlMb2NhdGlvblN0cmluZyA9IGAke2FwaUxvY2F0aW9uU3RyaW5nfSwke3ZhbH1gOyBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHthcGlMb2NhdGlvblN0cmluZ30mbGltaXQ9MSZhcHBpZD0ke0FQSUtleX1gLCB7bW9kZTogJ2NvcnMnfSk7XHJcbiAgY29uc3QgY29vcmRpbmF0ZXNEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzID0ge1xyXG4gICAgbGF0aXR1ZGU6IGNvb3JkaW5hdGVzRGF0YVswXS5sYXQsXHJcbiAgICBsb25naXR1ZGU6IGNvb3JkaW5hdGVzRGF0YVswXS5sb25cclxuICB9XHJcbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyICh7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB7fSl7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHtBUElLZXl9YCwge21vZGU6ICdjb3JzJ30pO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IHJlbGV2YW50V2VhdGhlckRhdGEgPSB7XHJcbiAgICBsb2NhdGlvbjogd2VhdGhlckRhdGEubmFtZSxcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyAlXHJcbiAgICBodW1pZGl0eTogd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eSxcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyBrZWx2aW5cclxuICAgIHRlbXBlcmF0dXJlOiB3ZWF0aGVyRGF0YS5tYWluLnRlbXAsXHJcbiAgICBtYXhfdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcF9tYXgsXHJcbiAgICBtaW5fdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcF9taW4sXHJcbiAgICAvLyBkZWZhdWx0IHVuaXQgaXMgbS9zXHJcbiAgICB3aW5kX3NwZWVkOiB3ZWF0aGVyRGF0YS53aW5kLnNwZWVkLFxyXG4gICAgLy8gdGltZXpvbmUgaXMgaW4gc2Vjb25kcyB2YXIgZCA9IG5ldyBEYXRlKChuZXcgRGF0ZSgpLmdldFRpbWUoKSktMjUyMDAqMTAwMClcclxuICAgIC8vIGQudG9JU09TdHJpbmcoKVxyXG4gICAgdGltZTogd2VhdGhlckRhdGEuZHQsXHJcbiAgICB0aW1lem9uZTogd2VhdGhlckRhdGEudGltZXpvbmUsXHJcbiAgICBkZXNjcmlwdGlvbjogd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvblxyXG4gIH1cclxuICByZXR1cm4gcmVsZXZhbnRXZWF0aGVyRGF0YTtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRXZWF0aGVySWNvbkRPTSh3ZWF0aGVyKXtcclxuICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gIHN3aXRjaCh3ZWF0aGVyKXtcclxuICAgIGNhc2UgJ0NsZWFyJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXN1bicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0Nsb3Vkcyc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZCcsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1RodW5kZXJzdG9ybSc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZC1ib2x0JywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnRHJpenpsZSc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZC1zdW4tcmFpbicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1JhaW4nOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtY2xvdWQtcmFpbicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1Nub3cnOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc25vd2ZsYWtlJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnVG9ybmFkbyc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS10b3JuYWRvJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrOyAgICAgIFxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXNtb2cnLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBpY29uO1xyXG59XHJcblxyXG4vLyB0aGUgb25seSBmcmVlIEFQSSBjYWxsIGZvciBmb3JlY2FzdCBpcyA1IGRheSwgMyBob3VyIHBlcmlvZHNcclxuYXN5bmMgZnVuY3Rpb24gZ2V0NURheVdlYXRoZXIoe2xhdGl0dWRlLCBsb25naXR1ZGV9ID0ge30pe1xyXG4gIC8vIFRPLURPIGFwaSBjYWxsIGlzIGludmFsaWQgYmVjYXVzZSBpdCdzIG5vdCBmcmVlLCBuZWVkIHRvIHVzZSB0aGUgNSBkYXkgb25lXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmFwcGlkPSR7QVBJS2V5fWAsIHttb2RlOiAnY29ycyd9KTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YUFycmF5ID0gd2VhdGhlckRhdGEubGlzdDtcclxuICBjb25zdCByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkgPSBbXTtcclxuXHJcbiAgLy8gY2xlYW4gdXAgdGhlIHdlYXRoZXIgZGF0YSBhcnJheSB0byBvbmx5IGdldCByZWxldmFudCB2YWx1ZXNcclxuICB3ZWF0aGVyRGF0YUFycmF5LmZvckVhY2gocmF3RGF0YU9iaiA9PiB7XHJcbiAgICBjb25zdCBkYXkgPSBjb252ZXJ0VW5pdHMuZ2V0RGF5TmFtZShyYXdEYXRhT2JqLmR0X3R4dC5zdWJzdHJpbmcoMCwxMCksIFwiZW4tVVNcIik7XHJcbiAgICBjb25zdCBtYXhUZW1wZXJhdHVyZSA9IHJhd0RhdGFPYmoubWFpbi50ZW1wX21heDtcclxuICAgIGNvbnN0IG1pblRlbXBlcmF0dXJlID0gcmF3RGF0YU9iai5tYWluLnRlbXBfbWluO1xyXG4gICAgLy8gd2VhdGhlciBoYXMgcG90ZW50aWFsIHZhbHVlcyBUaHVuZGVyc3Rvcm0sIERyaXp6bGUsIFJhaW4sIFNub3csIEEgbG90IG9mIERpZmZlcmVudCBBdG1vc3BoZXJlIE9uZXMsIENsZWFyLCBDbG91ZHNcclxuICAgIGNvbnN0IHdlYXRoZXIgPSByYXdEYXRhT2JqLndlYXRoZXJbMF0ubWFpbjtcclxuICAgIGxldCBpbnNpZGVBcnJheSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICAvLyBtdXRhdGUgbWluLCBtYXggdGVtcGVyYXR1cmUsIHdlYXRoZXIgaWYgb2JqZWN0IGlzIGFscmVhZHkgaW4gYXJyYXlcclxuICAgIHJlbGV2YW50V2VhdGhlckRhdGFBcnJheS5mb3JFYWNoKHJlbGV2YW50T2JqID0+IHtcclxuICAgICAgaWYoZGF5ID09PSByZWxldmFudE9iai5kYXkpe1xyXG4gICAgICAgIHJlbGV2YW50T2JqLm1heFRlbXBlcmF0dXJlID0gTWF0aC5tYXgocmVsZXZhbnRPYmoubWF4VGVtcGVyYXR1cmUsIG1heFRlbXBlcmF0dXJlKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICByZWxldmFudE9iai5taW5UZW1wZXJhdHVyZSA9IE1hdGgubWluKHJlbGV2YW50T2JqLm1pblRlbXBlcmF0dXJlLCBtaW5UZW1wZXJhdHVyZSk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgaWYoKHJlbGV2YW50T2JqLndlYXRoZXIgPT09ICdDbGVhcicgfHwgcmVsZXZhbnRPYmoud2VhdGhlciA9PT0gJ0Nsb3VkcycpICYmXHJcbiAgICAgICAgICAoISh3ZWF0aGVyID09PSAnQ2xlYXInIHx8IHdlYXRoZXIgPT09ICdDbG91ZHMnKSkpe1xyXG4gICAgICAgICAgICByZWxldmFudE9iai53ZWF0aGVyID0gd2VhdGhlcjsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zaWRlQXJyYXkgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBpZighaW5zaWRlQXJyYXkpe1xyXG4gICAgICByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkucHVzaCh7ZGF5LCBtYXhUZW1wZXJhdHVyZSwgbWluVGVtcGVyYXR1cmUsIHdlYXRoZXJ9KVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIHJlbGV2YW50V2VhdGhlckRhdGFBcnJheS5mb3JFYWNoKGRhdGEgPT4ge1xyXG4gICAgZGF0YS53ZWF0aGVySWNvbkRPTSA9IGdldFdlYXRoZXJJY29uRE9NKGRhdGEud2VhdGhlcik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICB9KVxyXG5cclxuICByZXR1cm4gcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YSAobG9jYXRpb25PYmope1xyXG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBnZXRXZWF0aGVyKGF3YWl0IGdldENvb3Jkcyhsb2NhdGlvbk9iaikpO1xyXG4gIHJldHVybiB3ZWF0aGVyO1xyXG59XHJcbiBcclxuYXN5bmMgZnVuY3Rpb24gZ2V0NURheVdlYXRoZXJEYXRhIChsb2NhdGlvbk9iail7XHJcbiAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGdldDVEYXlXZWF0aGVyKGF3YWl0IGdldENvb3Jkcyhsb2NhdGlvbk9iaikpO1xyXG4gIHJldHVybiB3ZWF0aGVyO1xyXG59XHJcblxyXG5leHBvcnQge2dldFdlYXRoZXJEYXRhLCBnZXQ1RGF5V2VhdGhlckRhdGF9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gJy4vVUknXHJcblxyXG4vLyBjcmVhdGVzIHRoZSB3ZWF0aGVyIHBhZ2VcclxuY29uc3QgbWFpbiA9IGZ1bmN0aW9uIGRvQWxsT3BlcmF0aW9ucygpe1xyXG4gIGNvbnN0IGluaXRpYWxMb2NhdGlvbiA9IHtcclxuICAgIGNpdHk6ICdTYW4gRnJhbmNpc2NvJ1xyXG4gIH1cclxuICBVSS5pbml0aWFsUmVuZGVyKGluaXRpYWxMb2NhdGlvbik7XHJcbn1cclxuXHJcbm1haW4oKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=