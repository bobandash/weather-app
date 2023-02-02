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
      changeMetricBtn.innerText = isFahrenheit ? 'Change to °C' : 'Change to °F';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsNERBQWlCLHNCQUFzQixRQUFRLDREQUFpQixzQkFBc0I7QUFDekgsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDREQUFpQixzQkFBc0IsUUFBUSw0REFBaUIsc0JBQXNCO0FBQ3pILEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsQ0FBQztBQUNEO0FBQ0E7QUFDcUM7Ozs7Ozs7VUNwR3JDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx5REFBZ0I7QUFDbEI7QUFDQTtBQUNBLE8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuaXRDb252ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWF0aGVyQVBJQ2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2VhdGhlck9iamVjdHMuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHtnZXRXZWF0aGVyRGF0YSwgZ2V0NURheVdlYXRoZXJEYXRhfSBmcm9tICcuL3dlYXRoZXJBUElDYWxsJztcclxuaW1wb3J0IGNvbnZlcnRVbml0cyBmcm9tICcuL3VuaXRDb252ZXJzaW9uJztcclxuaW1wb3J0IHtGdXR1cmVXZWF0aGVyLCBjdXJyZW50VW5pdHN9IGZyb20gJy4vd2VhdGhlck9iamVjdHMnXHJcblxyXG5jb25zdCBVSSA9IGZ1bmN0aW9uIGNyZWF0ZVVJICgpe1xyXG4gIC8vIGNoYW5nZXMgYWxsIHdlYXRoZXIgZGF0YSBmb3IgdG9kYXlcclxuICBjb25zdCByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEgPSBmdW5jdGlvbiBjaGFuZ2VDdXJyZW50V2VhdGhlckRhdGFUb01hdGNoRE9NKGN1cnJXZWF0aGVyRGF0YSwgaXNGYWhyZW5oZWl0KXtcclxuICAgIC8vIGdldHMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IG5lZWQgdG8gYmUgY2hhbmdlZFxyXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13ZWF0aGVyXScpO1xyXG4gICAgY29uc3QgY3VycmVudExvY2F0aW9uRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbG9jYXRpb25dJyk7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZURPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRpbWVdJyk7XHJcbiAgICBjb25zdCBjdXJyZW50VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LXRlbXBlcmF0dXJlJyk7XHJcbiAgICBjb25zdCBjdXJyZW50SGlnaFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC1oaWdoJyk7XHJcbiAgICBjb25zdCBjdXJyZW50TG93VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LWxvdycpO1xyXG4gICAgY29uc3QgY3VycmVudFdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LXdpbmQnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRIdW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWN1cnJlbnQtaHVtaWRpdHknKTtcclxuXHJcbiAgICBjdXJyZW50V2VhdGhlckRPTS5pbm5lclRleHQgPSBjdXJyV2VhdGhlckRhdGEuZGVzY3JpcHRpb247XHJcbiAgICBjdXJyZW50TG9jYXRpb25ET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLmxvY2F0aW9uO1xyXG4gICAgY3VycmVudFRpbWVET00uaW5uZXJUZXh0ID0gY29udmVydFVuaXRzLnVuaXhUb1JlZ3VsYXJUaW1lKGN1cnJXZWF0aGVyRGF0YS50aW1lLCBjdXJyV2VhdGhlckRhdGEudGltZXpvbmUpO1xyXG4gICAgY3VycmVudEh1bWlkaXR5LmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtjdXJyV2VhdGhlckRhdGEuaHVtaWRpdHl9JWA7XHJcblxyXG4gICAgaWYoaXNGYWhyZW5oZWl0KXtcclxuICAgICAgY3VycmVudFRlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGAke2NvbnZlcnRVbml0cy5rVG9GKGN1cnJXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgICAgY3VycmVudEhpZ2hUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgSGlnaDogJHtjb252ZXJ0VW5pdHMua1RvRihjdXJyV2VhdGhlckRhdGEubWF4X3RlbXBlcmF0dXJlKX3CsEZgO1xyXG4gICAgICBjdXJyZW50TG93VGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYExvdzogJHtjb252ZXJ0VW5pdHMua1RvRihjdXJyV2VhdGhlckRhdGEubWluX3RlbXBlcmF0dXJlKX3CsEZgO1xyXG4gICAgICBjdXJyZW50V2luZC5pbm5lclRleHQgPSBgV2luZDogJHtjb252ZXJ0VW5pdHMubVRvTWkoY3VycldlYXRoZXJEYXRhLndpbmRfc3BlZWQpfSBtcGhgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudFRlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGAke2NvbnZlcnRVbml0cy5rVG9DKGN1cnJXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZSl9wrBDYDtcclxuICAgICAgY3VycmVudEhpZ2hUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgSGlnaDogJHtjb252ZXJ0VW5pdHMua1RvQyhjdXJyV2VhdGhlckRhdGEubWF4X3RlbXBlcmF0dXJlKX3CsENgO1xyXG4gICAgICBjdXJyZW50TG93VGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYExvdzogJHtjb252ZXJ0VW5pdHMua1RvQyhjdXJyV2VhdGhlckRhdGEubWluX3RlbXBlcmF0dXJlKX3CsENgO1xyXG4gICAgICBjdXJyZW50V2luZC5pbm5lclRleHQgPSBgV2luZDogJHtjdXJyV2VhdGhlckRhdGEud2luZF9zcGVlZH0gbS9zYDsgICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZTVEYXlXZWF0aGVyRGF0YSAoKXtcclxuICAgIGNvbnN0IGFsbFdlYXRoZXJDYXJkRWxlbXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndlYXRoZXItY2FyZCcpXTtcclxuICAgIGFsbFdlYXRoZXJDYXJkRWxlbXMuZm9yRWFjaChlbGVtID0+IHtcclxuICAgICAgZWxlbS5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvLyBjaGFuZ2VzIGFsbCB3ZWF0aGVyIGRhdGEgZm9yIHRoZSBuZXh0IDUgZGF5c1xyXG4gIGNvbnN0IHJlbmRlcjVEYXlXZWF0aGVyRGF0YSA9IGZ1bmN0aW9uIGNoYW5nZTVEYXlXZWF0aGVyRGF0YVRvTWF0Y2hET00od2VhdGhlckRhdGEsIGlzRmFocmVuaGVpdCl7XHJcbiAgICByZW1vdmU1RGF5V2VhdGhlckRhdGEoKTtcclxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dC13ZWVrLXdlYXRoZXItY29udGFpbmVyJyk7XHJcbiAgICB3ZWF0aGVyRGF0YS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgIGRheS5pc0ZhaHJlbmhlaXQgPSBpc0ZhaHJlbmhlaXQ7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgIGNvbnN0IGRheU9iamVjdCA9IG5ldyBGdXR1cmVXZWF0aGVyKGRheSk7XHJcbiAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZGF5T2JqZWN0LmdldERPTSgpKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRMb2NhdGlvbkZvcm1GdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgY29uc3QgbG9jYXRpb25Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uLWZvcm0nKTtcclxuICAgIGxvY2F0aW9uRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgbG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbicpO1xyXG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGxvY2F0aW9uSW5wdXQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBsb2NhdGlvbi5zcGxpdCgnLCAnKTtcclxuICAgICAgY29uc3QgbG9jYXRpb25PYmogPSB7fTtcclxuICAgICAgbG9jYXRpb25BcnJheS5mb3JFYWNoKChwcm9wZXJ0eSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpbmRleCA9PT0gMCl7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5jaXR5ID0gcHJvcGVydHk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGluZGV4ID09PSAxKXtcclxuICAgICAgICAgIGxvY2F0aW9uT2JqLnN0YXRlID0gcHJvcGVydHk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGluZGV4ID09PSAyKXtcclxuICAgICAgICAgIGxvY2F0aW9uT2JqLmNvdW50cnkgPSBwcm9wZXJ0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IGN1cnJXZWF0aGVyRGF0YSA9IGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgICAgY29uc3QgbmV4dDVEYXlXZWF0aGVyID0gZ2V0NURheVdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgICAgLy8gY2hhbmdlIHRoZSBwcm9taXNlIHRvIGFuIG9iamVjdFxyXG4gICAgICBjdXJyV2VhdGhlckRhdGEudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEodmFsdWUsIHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgbmV4dDVEYXlXZWF0aGVyLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcmVuZGVyNURheVdlYXRoZXJEYXRhKHZhbHVlKTtcclxuICAgICAgfSlcclxuICAgICAgLy8gVE8tRE8gZW1wdHkgZm9ybSB2YWx1ZSBpZiBzdWNjZXNzZnVsOyBvdGhlcndpc2Ugd3JpdGUgZXJyb3JcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRDaGFuZ2VNZXRyaWNCdG4oY3VycldlYXRoZXJEYXRhLCBuZXh0NURheVdlYXRoZXJEYXRhKXtcclxuICAgIGNvbnN0IGNoYW5nZU1ldHJpY0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFuZ2UtdW5pdHMtYnRuJyk7XHJcbiAgICBjaGFuZ2VNZXRyaWNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGN1cnJlbnRVbml0cy50b2dnbGVVbml0cygpO1xyXG4gICAgICBjb25zdCBpc0ZhaHJlbmhlaXQgPSBjdXJyZW50VW5pdHMuZ2V0SXNGYWhyZW5oZWl0KCk7XHJcbiAgICAgIGNoYW5nZU1ldHJpY0J0bi5pbm5lclRleHQgPSBpc0ZhaHJlbmhlaXQgPyAnQ2hhbmdlIHRvIMKwQycgOiAnQ2hhbmdlIHRvIMKwRic7XHJcbiAgICAgIHJlbmRlckN1cnJlbnRXZWF0aGVyRGF0YShjdXJyV2VhdGhlckRhdGEsIGlzRmFocmVuaGVpdCk7XHJcbiAgICAgIHJlbmRlcjVEYXlXZWF0aGVyRGF0YShuZXh0NURheVdlYXRoZXJEYXRhLCBpc0ZhaHJlbmhlaXQpOyAgICAgIFxyXG4gIH0pfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZCgpe1xyXG5cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRpYWxSZW5kZXIobG9jYXRpb25PYmope1xyXG4gICAgYWRkTG9jYXRpb25Gb3JtRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgY29uc3QgY3VycldlYXRoZXJEYXRhUHJvbWlzZSA9IGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgIGNvbnN0IG5leHQ1RGF5V2VhdGhlckRhdGFQcm9taXNlID0gZ2V0NURheVdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgIGNvbnN0IGlzRmFocmVuaGVpdCA9IGN1cnJlbnRVbml0cy5nZXRJc0ZhaHJlbmhlaXQoKTtcclxuICAgIFByb21pc2UuYWxsKFtjdXJyV2VhdGhlckRhdGFQcm9taXNlLCBuZXh0NURheVdlYXRoZXJEYXRhUHJvbWlzZV0pLnRoZW4oKHZhbHVlcykgPT4ge1xyXG4gICAgICByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEodmFsdWVzWzBdLCBpc0ZhaHJlbmhlaXQpO1xyXG4gICAgICByZW5kZXI1RGF5V2VhdGhlckRhdGEodmFsdWVzWzFdLCBpc0ZhaHJlbmhlaXQpO1xyXG4gICAgICBhZGRDaGFuZ2VNZXRyaWNCdG4odmFsdWVzWzBdLCB2YWx1ZXNbMV0pO1xyXG4gICAgfSk7XHJcbiAgICByZW5kZXJCYWNrZ3JvdW5kKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcmV0dXJuIHtpbml0aWFsUmVuZGVyfTtcclxuXHJcbn0oKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVJOyIsImNvbnN0IGNvbnZlcnRVbml0cyA9ICgoKSA9PiB7XHJcbiAgY29uc3Qga1RvQyA9IGZ1bmN0aW9uIGtlbHZpblRvQ2Vsc2l1cyhrZWx2aW4pIHtcclxuICAgIHJldHVybiAoa2VsdmluIC0gMjczLjE1KS50b0ZpeGVkKDApO1xyXG4gIH1cclxuICBcclxuICBjb25zdCBrVG9GID0gZnVuY3Rpb24ga2VsdmluVG9GYWhyZW5oZWl0KGtlbHZpbikge1xyXG4gICAgcmV0dXJuICgxLjgqKGtlbHZpbiAtIDI3MykrMzIpLnRvRml4ZWQoMCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtVG9NaSA9IGZ1bmN0aW9uIG1ldGVyc1RvTWlsZXMobWV0ZXJzKXtcclxuICAgIGNvbnN0IG1pID0gKG1ldGVycy8xNjA5LjM0NCkudG9GaXhlZCgxKTtcclxuICAgIGlmKG1pID09PSBcIjAuMFwiKXtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXREYXlOYW1lKGRhdGVTdHIpe1xyXG4gICAgICBjb25zdCBkYXlzID0gWydNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JywgJ1N1bmRheSddO1xyXG4gICAgICBjb25zdCBkYXlJbmRleCA9IG5ldyBEYXRlKGRhdGVTdHIpLmdldERheSgpO1xyXG4gICAgICByZXR1cm4gZGF5c1tkYXlJbmRleF07ICAgIFxyXG4gIH1cclxuXHJcbiAgLy8gVE8tRE8gLSBVTklYIFRJTUUgVE8gTE9DQUwgVElNRSBJTiBUSEFUIFRJTUUgWk9ORVxyXG4gIC8vIGZvcm1hdCBsaWtlIDQ6MTNQTSwgTW9uZGF5LCBKYW51YXJ5IDI4LCAyMDIzXHJcbiAgY29uc3QgdW5peFRvUmVndWxhclRpbWUgPSBmdW5jdGlvbiBjb252ZXJ0VW5pdFRpbWVTdGFtcFRvUmVndWxhclRpbWUodW5peFRpbWUsIHRpbWV6b25lKXtcclxuICAgIGNvbnN0IHVuaXhBY3R1YWxUaW1lID0gdW5peFRpbWUgKyB0aW1lem9uZTtcclxuICAgIGNvbnN0IG1vbnRocyA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdO1xyXG4gICAgY29uc3QgZGF5cyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknXTtcclxuXHJcbiAgICAvLyBUTy1ETywgZml4IGNvZGUgdG8gZGVhbCB3aXRoIElTT1N0cmluZ1xyXG4gICAgY29uc3QgaXNvU3RyaW5nID0gbmV3IERhdGUodW5peEFjdHVhbFRpbWUgKiAxMDAwKS50b0lTT1N0cmluZygpO1xyXG4gICAgY29uc3QgZGF0ZUV4Y2x1ZGluZ1RpbWUgPSBuZXcgRGF0ZShpc29TdHJpbmcuc3Vic3RyaW5nKDAsMTApKTtcclxuICAgIGNvbnN0IGRheSA9IGRheXNbZGF0ZUV4Y2x1ZGluZ1RpbWUuZ2V0RGF5KCldO1xyXG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IGAke21vbnRoc1tkYXRlRXhjbHVkaW5nVGltZS5nZXRNb250aCgpXX0gJHtkYXRlRXhjbHVkaW5nVGltZS5nZXREYXRlKCl9LCAke2RhdGVFeGNsdWRpbmdUaW1lLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgIC8vIHRpbWUgaXMgaW4gSEg6TU06U1MgZm9ybWF0XHJcbiAgICBjb25zdCB0aW1lID0gaXNvU3RyaW5nLnN1YnN0cmluZygxMSwgMTgpO1xyXG4gICAgY29uc3QgaG91ciA9IE51bWJlcih0aW1lLnN1YnN0cmluZygwLCAyKSk7XHJcbiAgICBjb25zdCBtaW51dGVzID0gU3RyaW5nKHRpbWUuc3Vic3RyaW5nKDMsNSkpO1xyXG4gICAgbGV0IHRpbWVGb3JtYXQ7XHJcbiAgICBpZihob3VyID09PSAwKXtcclxuICAgICAgdGltZUZvcm1hdCA9IGAxMjoke21pbnV0ZXN9IEFNYDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoaG91ciA+IDEyKXtcclxuICAgICAgdGltZUZvcm1hdCA9IGAke2hvdXIgJSAxMn06JHttaW51dGVzfSBQTWBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRpbWVGb3JtYXQ9IGAke2hvdXJ9OiR7bWludXRlc30gQU1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgJHt0aW1lRm9ybWF0fSwgJHtkYXl9LCAke2RhdGVGb3JtYXR9YDtcclxuICB9XHJcbiAgcmV0dXJuIHtrVG9DLCBrVG9GLCBtVG9NaSwgZ2V0RGF5TmFtZSwgdW5peFRvUmVndWxhclRpbWV9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udmVydFVuaXRzOyIsImltcG9ydCBjb252ZXJ0VW5pdHMgZnJvbSBcIi4vdW5pdENvbnZlcnNpb25cIjtcclxuXHJcbi8vIHNob3VsZCBrZWVwIEFQSSBLZXkgaW4gYmFjay1lbmQgb25jZSBsZWFybiBob3cgdG9cclxuY29uc3QgQVBJS2V5ID0gJzg0NjQ4ZGYxY2Q4ODk1ZmE4NTI2NDUyZjM3MjVjOTNjJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldENvb3JkcyAoe2NpdHksIHN0YXRlLCBjb3VudHJ5fSA9IHt9KXtcclxuICBjb25zdCBvYmogPSB7Y2l0eSwgc3RhdGUsIGNvdW50cnl9O1xyXG4gIGxldCBhcGlMb2NhdGlvblN0cmluZyA9ICcnO1xyXG4gIE9iamVjdC52YWx1ZXMob2JqKS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICBpZih2YWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZihhcGlMb2NhdGlvblN0cmluZyA9PT0gJycpe1xyXG4gICAgICAgIGFwaUxvY2F0aW9uU3RyaW5nID0gdmFsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFwaUxvY2F0aW9uU3RyaW5nID0gYCR7YXBpTG9jYXRpb25TdHJpbmd9LCR7dmFsfWA7IFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2FwaUxvY2F0aW9uU3RyaW5nfSZsaW1pdD0xJmFwcGlkPSR7QVBJS2V5fWAsIHttb2RlOiAnY29ycyd9KTtcclxuICBjb25zdCBjb29yZGluYXRlc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSB7XHJcbiAgICBsYXRpdHVkZTogY29vcmRpbmF0ZXNEYXRhWzBdLmxhdCxcclxuICAgIGxvbmdpdHVkZTogY29vcmRpbmF0ZXNEYXRhWzBdLmxvblxyXG4gIH1cclxuICByZXR1cm4gY29vcmRpbmF0ZXM7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIgKHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHt9KXtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtsYXRpdHVkZX0mbG9uPSR7bG9uZ2l0dWRlfSZhcHBpZD0ke0FQSUtleX1gLCB7bW9kZTogJ2NvcnMnfSk7XHJcbiAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc3QgcmVsZXZhbnRXZWF0aGVyRGF0YSA9IHtcclxuICAgIGxvY2F0aW9uOiB3ZWF0aGVyRGF0YS5uYW1lLFxyXG4gICAgLy8gZGVmYXVsdCB1bml0IGlzICVcclxuICAgIGh1bWlkaXR5OiB3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5LFxyXG4gICAgLy8gZGVmYXVsdCB1bml0IGlzIGtlbHZpblxyXG4gICAgdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcCxcclxuICAgIG1heF90ZW1wZXJhdHVyZTogd2VhdGhlckRhdGEubWFpbi50ZW1wX21heCxcclxuICAgIG1pbl90ZW1wZXJhdHVyZTogd2VhdGhlckRhdGEubWFpbi50ZW1wX21pbixcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyBtL3NcclxuICAgIHdpbmRfc3BlZWQ6IHdlYXRoZXJEYXRhLndpbmQuc3BlZWQsXHJcbiAgICAvLyB0aW1lem9uZSBpcyBpbiBzZWNvbmRzIHZhciBkID0gbmV3IERhdGUoKG5ldyBEYXRlKCkuZ2V0VGltZSgpKS0yNTIwMCoxMDAwKVxyXG4gICAgLy8gZC50b0lTT1N0cmluZygpXHJcbiAgICB0aW1lOiB3ZWF0aGVyRGF0YS5kdCxcclxuICAgIHRpbWV6b25lOiB3ZWF0aGVyRGF0YS50aW1lem9uZSxcclxuICAgIGRlc2NyaXB0aW9uOiB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uXHJcbiAgfVxyXG4gIHJldHVybiByZWxldmFudFdlYXRoZXJEYXRhO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFdlYXRoZXJJY29uRE9NKHdlYXRoZXIpe1xyXG4gIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgc3dpdGNoKHdlYXRoZXIpe1xyXG4gICAgY2FzZSAnQ2xlYXInOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc3VuJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnQ2xvdWRzJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWNsb3VkJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnVGh1bmRlcnN0b3JtJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWNsb3VkLWJvbHQnLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdEcml6emxlJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWNsb3VkLXN1bi1yYWluJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnUmFpbic6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZC1yYWluJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnU25vdyc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1zbm93Zmxha2UnLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdUb3JuYWRvJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXRvcm5hZG8nLCdiaWcnKTtcclxuICAgICAgYnJlYWs7ICAgICAgXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc21vZycsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgcmV0dXJuIGljb247XHJcbn1cclxuXHJcbi8vIHRoZSBvbmx5IGZyZWUgQVBJIGNhbGwgZm9yIGZvcmVjYXN0IGlzIDUgZGF5LCAzIGhvdXIgcGVyaW9kc1xyXG5hc3luYyBmdW5jdGlvbiBnZXQ1RGF5V2VhdGhlcih7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB7fSl7XHJcbiAgLy8gVE8tRE8gYXBpIGNhbGwgaXMgaW52YWxpZCBiZWNhdXNlIGl0J3Mgbm90IGZyZWUsIG5lZWQgdG8gdXNlIHRoZSA1IGRheSBvbmVcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHtBUElLZXl9YCwge21vZGU6ICdjb3JzJ30pO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhQXJyYXkgPSB3ZWF0aGVyRGF0YS5saXN0O1xyXG4gIGNvbnN0IHJlbGV2YW50V2VhdGhlckRhdGFBcnJheSA9IFtdO1xyXG4gIC8vIGNsZWFuIHVwIHRoZSB3ZWF0aGVyIGRhdGEgYXJyYXkgdG8gb25seSBnZXQgcmVsZXZhbnQgdmFsdWVzXHJcbiAgd2VhdGhlckRhdGFBcnJheS5mb3JFYWNoKHJhd0RhdGFPYmogPT4ge1xyXG4gICAgY29uc3QgZGF5ID0gY29udmVydFVuaXRzLmdldERheU5hbWUocmF3RGF0YU9iai5kdF90eHQuc3Vic3RyaW5nKDAsMTApKVxyXG4gICAgY29uc3QgbWF4VGVtcGVyYXR1cmUgPSByYXdEYXRhT2JqLm1haW4udGVtcF9tYXg7XHJcbiAgICBjb25zdCBtaW5UZW1wZXJhdHVyZSA9IHJhd0RhdGFPYmoubWFpbi50ZW1wX21pbjtcclxuICAgIC8vIHdlYXRoZXIgaGFzIHBvdGVudGlhbCB2YWx1ZXMgVGh1bmRlcnN0b3JtLCBEcml6emxlLCBSYWluLCBTbm93LCBBIGxvdCBvZiBEaWZmZXJlbnQgQXRtb3NwaGVyZSBPbmVzLCBDbGVhciwgQ2xvdWRzXHJcbiAgICBjb25zdCB3ZWF0aGVyID0gcmF3RGF0YU9iai53ZWF0aGVyWzBdLm1haW47XHJcbiAgICBsZXQgaW5zaWRlQXJyYXkgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgLy8gbXV0YXRlIG1pbiwgbWF4IHRlbXBlcmF0dXJlLCB3ZWF0aGVyIGlmIG9iamVjdCBpcyBhbHJlYWR5IGluIGFycmF5XHJcbiAgICByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkuZm9yRWFjaChyZWxldmFudE9iaiA9PiB7XHJcbiAgICAgIGlmKGRheSA9PT0gcmVsZXZhbnRPYmouZGF5KXtcclxuICAgICAgICByZWxldmFudE9iai5tYXhUZW1wZXJhdHVyZSA9IE1hdGgubWF4KHJlbGV2YW50T2JqLm1heFRlbXBlcmF0dXJlLCBtYXhUZW1wZXJhdHVyZSk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgcmVsZXZhbnRPYmoubWluVGVtcGVyYXR1cmUgPSBNYXRoLm1pbihyZWxldmFudE9iai5taW5UZW1wZXJhdHVyZSwgbWluVGVtcGVyYXR1cmUpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIGlmKChyZWxldmFudE9iai53ZWF0aGVyID09PSAnQ2xlYXInIHx8IHJlbGV2YW50T2JqLndlYXRoZXIgPT09ICdDbG91ZHMnKSAmJlxyXG4gICAgICAgICAgKCEod2VhdGhlciA9PT0gJ0NsZWFyJyB8fCB3ZWF0aGVyID09PSAnQ2xvdWRzJykpKXtcclxuICAgICAgICAgICAgcmVsZXZhbnRPYmoud2VhdGhlciA9IHdlYXRoZXI7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluc2lkZUFycmF5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIFxyXG4gICAgaWYoIWluc2lkZUFycmF5KXtcclxuICAgICAgcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5LnB1c2goe2RheSwgbWF4VGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlLCB3ZWF0aGVyfSlcclxuICAgIH1cclxuICB9KVxyXG5cclxuICByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkuZm9yRWFjaChkYXRhID0+IHtcclxuICAgIGRhdGEud2VhdGhlckljb25ET00gPSBnZXRXZWF0aGVySWNvbkRPTShkYXRhLndlYXRoZXIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIHJlbGV2YW50V2VhdGhlckRhdGFBcnJheTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEgKGxvY2F0aW9uT2JqKXtcclxuICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihhd2FpdCBnZXRDb29yZHMobG9jYXRpb25PYmopKTtcclxuICByZXR1cm4gd2VhdGhlcjtcclxufVxyXG4gXHJcbmFzeW5jIGZ1bmN0aW9uIGdldDVEYXlXZWF0aGVyRGF0YSAobG9jYXRpb25PYmope1xyXG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBnZXQ1RGF5V2VhdGhlcihhd2FpdCBnZXRDb29yZHMobG9jYXRpb25PYmopKTtcclxuICByZXR1cm4gd2VhdGhlcjtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRXZWF0aGVyRGF0YSwgZ2V0NURheVdlYXRoZXJEYXRhfTsiLCJpbXBvcnQgY29udmVydFVuaXRzIGZyb20gXCIuL3VuaXRDb252ZXJzaW9uXCI7XHJcblxyXG4vLyBodG1sIGhlbHBlciBmdW5jdGlvbnNcclxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCB7ZWxlbWVudCwgY2xhc3NlcywgaWRlbnRpZmllciwgY2hpbGRFbGVtZW50cywgY3VzdG9tQXR0cmlidXRlfSl7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgaWYoY2xhc3Nlcyl7XHJcbiAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgfVxyXG4gIGlmKGlkZW50aWZpZXIpe1xyXG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnaWQnLGlkZW50aWZpZXIpO1xyXG4gIH1cclxuICBpZihjaGlsZEVsZW1lbnRzKXtcclxuICAgICAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5hcHBlbmRDaGlsZChpdGVtKSlcclxuICB9XHJcbiAgaWYoY3VzdG9tQXR0cmlidXRlKXtcclxuICAgICAgaWYoY3VzdG9tQXR0cmlidXRlLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoY3VzdG9tQXR0cmlidXRlWzBdLCBjdXN0b21BdHRyaWJ1dGVbMV0pO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFnKCB7ZWxlbWVudCwgdGV4dCwgY2xhc3NlcywgaWRlbnRpZmllcn0pe1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gIGlmKGNsYXNzZXMpe1xyXG4gICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gIH1cclxuICBpZihpZGVudGlmaWVyKXtcclxuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICB9XHJcbiAgaWYodGV4dCl7XHJcbiAgICAgIG5vZGUuaW5uZXJUZXh0ID0gdGV4dDtcclxuICB9XHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmNvbnN0IEZ1dHVyZVdlYXRoZXIgPSBjbGFzcyB7XHJcbiAgY29uc3RydWN0b3Ioe2RheSwgbWF4VGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlLCB3ZWF0aGVyLCB3ZWF0aGVySWNvbkRPTSwgaXNGYWhyZW5oZWl0fSl7XHJcbiAgICB0aGlzLmRheSA9IGRheTtcclxuICAgIHRoaXMubWF4VGVtcGVyYXR1cmUgPSBtYXhUZW1wZXJhdHVyZTtcclxuICAgIHRoaXMubWluVGVtcGVyYXR1cmUgPSBtaW5UZW1wZXJhdHVyZTtcclxuICAgIHRoaXMud2VhdGhlciA9IHdlYXRoZXI7XHJcbiAgICB0aGlzLndlYXRoZXJJY29uRE9NID0gd2VhdGhlckljb25ET007XHJcbiAgICB0aGlzLmlzRmFocmVuaGVpdCA9IGlzRmFocmVuaGVpdDtcclxuICB9XHJcblxyXG5cclxuICBnZXRET00oKXtcclxuICAgIGNvbnN0IGRheVRleHQgPSBjcmVhdGVUYWcoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ25vcm1hbC1oZWFkZXInXSxcclxuICAgICAgdGV4dDogdGhpcy5kYXlcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSB0aGlzLndlYXRoZXJJY29uRE9NO1xyXG5cclxuICAgIGNvbnN0IGhpZ2hUZW1wZXJhdHVyZSA9IGNyZWF0ZVRhZyh7XHJcbiAgICAgIGVsZW1lbnQ6ICdoMicsXHJcbiAgICAgIGNsYXNzZXM6IFsnbm9ybWFsLWhlYWRlciddLFxyXG4gICAgICB0ZXh0OiB0aGlzLmlzRmFocmVuaGVpdCA/IGAke2NvbnZlcnRVbml0cy5rVG9GKHRoaXMubWF4VGVtcGVyYXR1cmUpfcKwYCA6IGAke2NvbnZlcnRVbml0cy5rVG9DKHRoaXMubWF4VGVtcGVyYXR1cmUpfcKwYFxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBsb3dUZW1wZXJhdHVyZSA9IGNyZWF0ZVRhZyh7XHJcbiAgICAgIGVsZW1lbnQ6ICdoMicsXHJcbiAgICAgIGNsYXNzZXM6IFsnbm9ybWFsLWhlYWRlcicsJ2xvdy10ZW1wZXJhdHVyZSddLFxyXG4gICAgICB0ZXh0OiB0aGlzLmlzRmFocmVuaGVpdCA/IGAke2NvbnZlcnRVbml0cy5rVG9GKHRoaXMubWluVGVtcGVyYXR1cmUpfcKwYCA6IGAke2NvbnZlcnRVbml0cy5rVG9DKHRoaXMubWluVGVtcGVyYXR1cmUpfcKwYFxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBoaWdoTG93VGVtcGVyYXR1cmVDb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ2hpZ2gtbG93LXRlbXBlcmF0dXJlcyddLFxyXG4gICAgICBjaGlsZEVsZW1lbnRzOiBbaGlnaFRlbXBlcmF0dXJlLCBsb3dUZW1wZXJhdHVyZV1cclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKHtcclxuICAgICAgZWxlbWVudDogJ2RpdicsXHJcbiAgICAgIGNsYXNzZXM6IFsnd2VhdGhlci1jYXJkJ10sXHJcbiAgICAgIGNoaWxkRWxlbWVudHM6IFtkYXlUZXh0LCB3ZWF0aGVySWNvbiwgaGlnaExvd1RlbXBlcmF0dXJlQ29udGFpbmVyXVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY3VycmVudFVuaXRzID0gICgoKSA9PiB7XHJcbiAgbGV0IGlzRmFocmVuaGVpdCA9IHRydWU7XHJcblxyXG4gIGZ1bmN0aW9uIGdldElzRmFocmVuaGVpdCgpe1xyXG4gICAgcmV0dXJuIGlzRmFocmVuaGVpdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZVVuaXRzKCl7XHJcbiAgICBpc0ZhaHJlbmhlaXQgPSAhaXNGYWhyZW5oZWl0O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtnZXRJc0ZhaHJlbmhlaXQsIHRvZ2dsZVVuaXRzfTtcclxufSkoKTtcclxuXHJcblxyXG5leHBvcnQge0Z1dHVyZVdlYXRoZXIsIGN1cnJlbnRVbml0c307XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gJy4vVUknXHJcblxyXG4vLyBjcmVhdGVzIHRoZSB3ZWF0aGVyIHBhZ2VcclxuY29uc3QgbWFpbiA9IGZ1bmN0aW9uIGRvQWxsT3BlcmF0aW9ucygpe1xyXG4gIGNvbnN0IGluaXRpYWxMb2NhdGlvbiA9IHtcclxuICAgIGNpdHk6ICdTYW4gRnJhbmNpc2NvJ1xyXG4gIH1cclxuICBVSS5pbml0aWFsUmVuZGVyKGluaXRpYWxMb2NhdGlvbik7XHJcbn1cclxuXHJcbm1haW4oKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=