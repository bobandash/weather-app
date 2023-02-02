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
  function renderBackground(currWeatherData){
    const isDay = _unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].isDay(currWeatherData.time, currWeatherData.timezone);
    const htmlDOM = document.querySelector('html');
    if(isDay){
      htmlDOM.classList.add('sky-bg');
      htmlDOM.classList.remove('dark-sky-bg');
    } else {
      htmlDOM.classList.add('dark-sky-bg');
      htmlDOM.classList.remove('sky-bg');
    }
  }
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
    renderBackground(currWeatherData);
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

  const isDay = function convertUnixToTimeofDay(unixTime, timezone){
    const unixActualTime = unixTime + timezone;
    const isoString = new Date(unixActualTime * 1000).toISOString();
    const time = isoString.substring(11, 18);
    const hour = Number(time.substring(0, 2));
    if(hour >= 6 && hour < 18){
      return true;
    }
    return false;
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
  return {kToC, kToF, mToMi, getDayName, unixToRegularTime, isDay};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNsQjtBQUNBO0FBQ0EsTyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdENvbnZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYXRoZXJBUElDYWxsLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWF0aGVyT2JqZWN0cy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQge2dldFdlYXRoZXJEYXRhLCBnZXQ1RGF5V2VhdGhlckRhdGF9IGZyb20gJy4vd2VhdGhlckFQSUNhbGwnO1xyXG5pbXBvcnQgY29udmVydFVuaXRzIGZyb20gJy4vdW5pdENvbnZlcnNpb24nO1xyXG5pbXBvcnQge0Z1dHVyZVdlYXRoZXIsIGN1cnJlbnRVbml0c30gZnJvbSAnLi93ZWF0aGVyT2JqZWN0cydcclxuXHJcbmNvbnN0IFVJID0gZnVuY3Rpb24gY3JlYXRlVUkgKCl7XHJcbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZChjdXJyV2VhdGhlckRhdGEpe1xyXG4gICAgY29uc3QgaXNEYXkgPSBjb252ZXJ0VW5pdHMuaXNEYXkoY3VycldlYXRoZXJEYXRhLnRpbWUsIGN1cnJXZWF0aGVyRGF0YS50aW1lem9uZSk7XHJcbiAgICBjb25zdCBodG1sRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO1xyXG4gICAgaWYoaXNEYXkpe1xyXG4gICAgICBodG1sRE9NLmNsYXNzTGlzdC5hZGQoJ3NreS1iZycpO1xyXG4gICAgICBodG1sRE9NLmNsYXNzTGlzdC5yZW1vdmUoJ2Rhcmstc2t5LWJnJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBodG1sRE9NLmNsYXNzTGlzdC5hZGQoJ2Rhcmstc2t5LWJnJyk7XHJcbiAgICAgIGh0bWxET00uY2xhc3NMaXN0LnJlbW92ZSgnc2t5LWJnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIGNoYW5nZXMgYWxsIHdlYXRoZXIgZGF0YSBmb3IgdG9kYXlcclxuICBjb25zdCByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEgPSBmdW5jdGlvbiBjaGFuZ2VDdXJyZW50V2VhdGhlckRhdGFUb01hdGNoRE9NKGN1cnJXZWF0aGVyRGF0YSwgaXNGYWhyZW5oZWl0KXtcclxuICAgIC8vIGdldHMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IG5lZWQgdG8gYmUgY2hhbmdlZFxyXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13ZWF0aGVyXScpO1xyXG4gICAgY29uc3QgY3VycmVudExvY2F0aW9uRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbG9jYXRpb25dJyk7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZURPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRpbWVdJyk7XHJcbiAgICBjb25zdCBjdXJyZW50VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LXRlbXBlcmF0dXJlJyk7XHJcbiAgICBjb25zdCBjdXJyZW50SGlnaFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC1oaWdoJyk7XHJcbiAgICBjb25zdCBjdXJyZW50TG93VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LWxvdycpO1xyXG4gICAgY29uc3QgY3VycmVudFdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LXdpbmQnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRIdW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWN1cnJlbnQtaHVtaWRpdHknKTtcclxuXHJcbiAgICBjdXJyZW50V2VhdGhlckRPTS5pbm5lclRleHQgPSBjdXJyV2VhdGhlckRhdGEuZGVzY3JpcHRpb247XHJcbiAgICBjdXJyZW50TG9jYXRpb25ET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLmxvY2F0aW9uO1xyXG4gICAgY3VycmVudFRpbWVET00uaW5uZXJUZXh0ID0gY29udmVydFVuaXRzLnVuaXhUb1JlZ3VsYXJUaW1lKGN1cnJXZWF0aGVyRGF0YS50aW1lLCBjdXJyV2VhdGhlckRhdGEudGltZXpvbmUpO1xyXG4gICAgY3VycmVudEh1bWlkaXR5LmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtjdXJyV2VhdGhlckRhdGEuaHVtaWRpdHl9JWA7XHJcblxyXG4gICAgaWYoaXNGYWhyZW5oZWl0KXtcclxuICAgICAgY3VycmVudFRlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGAke2NvbnZlcnRVbml0cy5rVG9GKGN1cnJXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgICAgY3VycmVudEhpZ2hUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgSGlnaDogJHtjb252ZXJ0VW5pdHMua1RvRihjdXJyV2VhdGhlckRhdGEubWF4X3RlbXBlcmF0dXJlKX3CsEZgO1xyXG4gICAgICBjdXJyZW50TG93VGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYExvdzogJHtjb252ZXJ0VW5pdHMua1RvRihjdXJyV2VhdGhlckRhdGEubWluX3RlbXBlcmF0dXJlKX3CsEZgO1xyXG4gICAgICBjdXJyZW50V2luZC5pbm5lclRleHQgPSBgV2luZDogJHtjb252ZXJ0VW5pdHMubVRvTWkoY3VycldlYXRoZXJEYXRhLndpbmRfc3BlZWQpfSBtcGhgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudFRlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGAke2NvbnZlcnRVbml0cy5rVG9DKGN1cnJXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZSl9wrBDYDtcclxuICAgICAgY3VycmVudEhpZ2hUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgSGlnaDogJHtjb252ZXJ0VW5pdHMua1RvQyhjdXJyV2VhdGhlckRhdGEubWF4X3RlbXBlcmF0dXJlKX3CsENgO1xyXG4gICAgICBjdXJyZW50TG93VGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYExvdzogJHtjb252ZXJ0VW5pdHMua1RvQyhjdXJyV2VhdGhlckRhdGEubWluX3RlbXBlcmF0dXJlKX3CsENgO1xyXG4gICAgICBjdXJyZW50V2luZC5pbm5lclRleHQgPSBgV2luZDogJHtjdXJyV2VhdGhlckRhdGEud2luZF9zcGVlZH0gbS9zYDsgICAgICBcclxuICAgIH1cclxuICAgIHJlbmRlckJhY2tncm91bmQoY3VycldlYXRoZXJEYXRhKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZTVEYXlXZWF0aGVyRGF0YSAoKXtcclxuICAgIGNvbnN0IGFsbFdlYXRoZXJDYXJkRWxlbXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndlYXRoZXItY2FyZCcpXTtcclxuICAgIGFsbFdlYXRoZXJDYXJkRWxlbXMuZm9yRWFjaChlbGVtID0+IHtcclxuICAgICAgZWxlbS5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvLyBjaGFuZ2VzIGFsbCB3ZWF0aGVyIGRhdGEgZm9yIHRoZSBuZXh0IDUgZGF5c1xyXG4gIGNvbnN0IHJlbmRlcjVEYXlXZWF0aGVyRGF0YSA9IGZ1bmN0aW9uIGNoYW5nZTVEYXlXZWF0aGVyRGF0YVRvTWF0Y2hET00od2VhdGhlckRhdGEsIGlzRmFocmVuaGVpdCl7XHJcbiAgICByZW1vdmU1RGF5V2VhdGhlckRhdGEoKTtcclxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dC13ZWVrLXdlYXRoZXItY29udGFpbmVyJyk7XHJcbiAgICB3ZWF0aGVyRGF0YS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgIGRheS5pc0ZhaHJlbmhlaXQgPSBpc0ZhaHJlbmhlaXQ7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgIGNvbnN0IGRheU9iamVjdCA9IG5ldyBGdXR1cmVXZWF0aGVyKGRheSk7XHJcbiAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZGF5T2JqZWN0LmdldERPTSgpKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRMb2NhdGlvbkZvcm1GdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgY29uc3QgbG9jYXRpb25Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uLWZvcm0nKTtcclxuICAgIGxvY2F0aW9uRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgbG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbicpO1xyXG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGxvY2F0aW9uSW5wdXQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBsb2NhdGlvbi5zcGxpdCgnLCAnKTtcclxuICAgICAgY29uc3QgbG9jYXRpb25PYmogPSB7fTtcclxuICAgICAgbG9jYXRpb25BcnJheS5mb3JFYWNoKChwcm9wZXJ0eSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpbmRleCA9PT0gMCl7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5jaXR5ID0gcHJvcGVydHk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGluZGV4ID09PSAxKXtcclxuICAgICAgICAgIGxvY2F0aW9uT2JqLnN0YXRlID0gcHJvcGVydHk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGluZGV4ID09PSAyKXtcclxuICAgICAgICAgIGxvY2F0aW9uT2JqLmNvdW50cnkgPSBwcm9wZXJ0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IGN1cnJXZWF0aGVyRGF0YSA9IGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgICAgY29uc3QgbmV4dDVEYXlXZWF0aGVyID0gZ2V0NURheVdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgICAgLy8gY2hhbmdlIHRoZSBwcm9taXNlIHRvIGFuIG9iamVjdFxyXG4gICAgICBjdXJyV2VhdGhlckRhdGEudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEodmFsdWUsIHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgbmV4dDVEYXlXZWF0aGVyLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcmVuZGVyNURheVdlYXRoZXJEYXRhKHZhbHVlKTtcclxuICAgICAgfSlcclxuICAgICAgLy8gVE8tRE8gZW1wdHkgZm9ybSB2YWx1ZSBpZiBzdWNjZXNzZnVsOyBvdGhlcndpc2Ugd3JpdGUgZXJyb3JcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRDaGFuZ2VNZXRyaWNCdG4oY3VycldlYXRoZXJEYXRhLCBuZXh0NURheVdlYXRoZXJEYXRhKXtcclxuICAgIGNvbnN0IGNoYW5nZU1ldHJpY0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFuZ2UtdW5pdHMtYnRuJyk7XHJcbiAgICBjaGFuZ2VNZXRyaWNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGN1cnJlbnRVbml0cy50b2dnbGVVbml0cygpO1xyXG4gICAgICBjb25zdCBpc0ZhaHJlbmhlaXQgPSBjdXJyZW50VW5pdHMuZ2V0SXNGYWhyZW5oZWl0KCk7XHJcbiAgICAgIGNoYW5nZU1ldHJpY0J0bi5pbm5lclRleHQgPSBpc0ZhaHJlbmhlaXQgPyAnQ2hhbmdlIHRvIMKwQycgOiAnQ2hhbmdlIHRvIMKwRic7XHJcbiAgICAgIHJlbmRlckN1cnJlbnRXZWF0aGVyRGF0YShjdXJyV2VhdGhlckRhdGEsIGlzRmFocmVuaGVpdCk7XHJcbiAgICAgIHJlbmRlcjVEYXlXZWF0aGVyRGF0YShuZXh0NURheVdlYXRoZXJEYXRhLCBpc0ZhaHJlbmhlaXQpOyAgICAgIFxyXG4gIH0pfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gaW5pdGlhbFJlbmRlcihsb2NhdGlvbk9iail7XHJcbiAgICBhZGRMb2NhdGlvbkZvcm1GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICBjb25zdCBjdXJyV2VhdGhlckRhdGFQcm9taXNlID0gZ2V0V2VhdGhlckRhdGEobG9jYXRpb25PYmopO1xyXG4gICAgY29uc3QgbmV4dDVEYXlXZWF0aGVyRGF0YVByb21pc2UgPSBnZXQ1RGF5V2VhdGhlckRhdGEobG9jYXRpb25PYmopO1xyXG4gICAgY29uc3QgaXNGYWhyZW5oZWl0ID0gY3VycmVudFVuaXRzLmdldElzRmFocmVuaGVpdCgpO1xyXG4gICAgUHJvbWlzZS5hbGwoW2N1cnJXZWF0aGVyRGF0YVByb21pc2UsIG5leHQ1RGF5V2VhdGhlckRhdGFQcm9taXNlXSkudGhlbigodmFsdWVzKSA9PiB7XHJcbiAgICAgIHJlbmRlckN1cnJlbnRXZWF0aGVyRGF0YSh2YWx1ZXNbMF0sIGlzRmFocmVuaGVpdCk7XHJcbiAgICAgIHJlbmRlcjVEYXlXZWF0aGVyRGF0YSh2YWx1ZXNbMV0sIGlzRmFocmVuaGVpdCk7XHJcbiAgICAgIGFkZENoYW5nZU1ldHJpY0J0bih2YWx1ZXNbMF0sIHZhbHVlc1sxXSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICByZXR1cm4ge2luaXRpYWxSZW5kZXJ9O1xyXG5cclxufSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVUk7IiwiY29uc3QgY29udmVydFVuaXRzID0gKCgpID0+IHtcclxuICBjb25zdCBrVG9DID0gZnVuY3Rpb24ga2VsdmluVG9DZWxzaXVzKGtlbHZpbikge1xyXG4gICAgcmV0dXJuIChrZWx2aW4gLSAyNzMuMTUpLnRvRml4ZWQoMCk7XHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IGtUb0YgPSBmdW5jdGlvbiBrZWx2aW5Ub0ZhaHJlbmhlaXQoa2VsdmluKSB7XHJcbiAgICByZXR1cm4gKDEuOCooa2VsdmluIC0gMjczKSszMikudG9GaXhlZCgwKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1Ub01pID0gZnVuY3Rpb24gbWV0ZXJzVG9NaWxlcyhtZXRlcnMpe1xyXG4gICAgY29uc3QgbWkgPSAobWV0ZXJzLzE2MDkuMzQ0KS50b0ZpeGVkKDEpO1xyXG4gICAgaWYobWkgPT09IFwiMC4wXCIpe1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBtaTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldERheU5hbWUoZGF0ZVN0cil7XHJcbiAgICAgIGNvbnN0IGRheXMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XHJcbiAgICAgIGNvbnN0IGRheUluZGV4ID0gbmV3IERhdGUoZGF0ZVN0cikuZ2V0RGF5KCk7XHJcbiAgICAgIHJldHVybiBkYXlzW2RheUluZGV4XTsgICAgXHJcbiAgfVxyXG5cclxuICBjb25zdCBpc0RheSA9IGZ1bmN0aW9uIGNvbnZlcnRVbml4VG9UaW1lb2ZEYXkodW5peFRpbWUsIHRpbWV6b25lKXtcclxuICAgIGNvbnN0IHVuaXhBY3R1YWxUaW1lID0gdW5peFRpbWUgKyB0aW1lem9uZTtcclxuICAgIGNvbnN0IGlzb1N0cmluZyA9IG5ldyBEYXRlKHVuaXhBY3R1YWxUaW1lICogMTAwMCkudG9JU09TdHJpbmcoKTtcclxuICAgIGNvbnN0IHRpbWUgPSBpc29TdHJpbmcuc3Vic3RyaW5nKDExLCAxOCk7XHJcbiAgICBjb25zdCBob3VyID0gTnVtYmVyKHRpbWUuc3Vic3RyaW5nKDAsIDIpKTtcclxuICAgIGlmKGhvdXIgPj0gNiAmJiBob3VyIDwgMTgpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8vIFRPLURPIC0gVU5JWCBUSU1FIFRPIExPQ0FMIFRJTUUgSU4gVEhBVCBUSU1FIFpPTkVcclxuICAvLyBmb3JtYXQgbGlrZSA0OjEzUE0sIE1vbmRheSwgSmFudWFyeSAyOCwgMjAyM1xyXG4gIGNvbnN0IHVuaXhUb1JlZ3VsYXJUaW1lID0gZnVuY3Rpb24gY29udmVydFVuaXRUaW1lU3RhbXBUb1JlZ3VsYXJUaW1lKHVuaXhUaW1lLCB0aW1lem9uZSl7XHJcbiAgICBjb25zdCB1bml4QWN0dWFsVGltZSA9IHVuaXhUaW1lICsgdGltZXpvbmU7XHJcbiAgICBjb25zdCBtb250aHMgPSBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXTtcclxuICAgIGNvbnN0IGRheXMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XHJcblxyXG4gICAgLy8gVE8tRE8sIGZpeCBjb2RlIHRvIGRlYWwgd2l0aCBJU09TdHJpbmdcclxuICAgIGNvbnN0IGlzb1N0cmluZyA9IG5ldyBEYXRlKHVuaXhBY3R1YWxUaW1lICogMTAwMCkudG9JU09TdHJpbmcoKTtcclxuICAgIGNvbnN0IGRhdGVFeGNsdWRpbmdUaW1lID0gbmV3IERhdGUoaXNvU3RyaW5nLnN1YnN0cmluZygwLDEwKSk7XHJcbiAgICBjb25zdCBkYXkgPSBkYXlzW2RhdGVFeGNsdWRpbmdUaW1lLmdldERheSgpXTtcclxuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBgJHttb250aHNbZGF0ZUV4Y2x1ZGluZ1RpbWUuZ2V0TW9udGgoKV19ICR7ZGF0ZUV4Y2x1ZGluZ1RpbWUuZ2V0RGF0ZSgpfSwgJHtkYXRlRXhjbHVkaW5nVGltZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAvLyB0aW1lIGlzIGluIEhIOk1NOlNTIGZvcm1hdFxyXG4gICAgY29uc3QgdGltZSA9IGlzb1N0cmluZy5zdWJzdHJpbmcoMTEsIDE4KTtcclxuICAgIGNvbnN0IGhvdXIgPSBOdW1iZXIodGltZS5zdWJzdHJpbmcoMCwgMikpO1xyXG4gICAgY29uc3QgbWludXRlcyA9IFN0cmluZyh0aW1lLnN1YnN0cmluZygzLDUpKTtcclxuICAgIGxldCB0aW1lRm9ybWF0O1xyXG4gICAgaWYoaG91ciA9PT0gMCl7XHJcbiAgICAgIHRpbWVGb3JtYXQgPSBgMTI6JHttaW51dGVzfSBBTWA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGhvdXIgPiAxMil7XHJcbiAgICAgIHRpbWVGb3JtYXQgPSBgJHtob3VyICUgMTJ9OiR7bWludXRlc30gUE1gXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aW1lRm9ybWF0PSBgJHtob3VyfToke21pbnV0ZXN9IEFNYDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYCR7dGltZUZvcm1hdH0sICR7ZGF5fSwgJHtkYXRlRm9ybWF0fWA7XHJcbiAgfVxyXG4gIHJldHVybiB7a1RvQywga1RvRiwgbVRvTWksIGdldERheU5hbWUsIHVuaXhUb1JlZ3VsYXJUaW1lLCBpc0RheX07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0VW5pdHM7IiwiaW1wb3J0IGNvbnZlcnRVbml0cyBmcm9tIFwiLi91bml0Q29udmVyc2lvblwiO1xyXG5cclxuLy8gc2hvdWxkIGtlZXAgQVBJIEtleSBpbiBiYWNrLWVuZCBvbmNlIGxlYXJuIGhvdyB0b1xyXG5jb25zdCBBUElLZXkgPSAnODQ2NDhkZjFjZDg4OTVmYTg1MjY0NTJmMzcyNWM5M2MnO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29vcmRzICh7Y2l0eSwgc3RhdGUsIGNvdW50cnl9ID0ge30pe1xyXG4gIGNvbnN0IG9iaiA9IHtjaXR5LCBzdGF0ZSwgY291bnRyeX07XHJcbiAgbGV0IGFwaUxvY2F0aW9uU3RyaW5nID0gJyc7XHJcbiAgT2JqZWN0LnZhbHVlcyhvYmopLmZvckVhY2godmFsID0+IHtcclxuICAgIGlmKHZhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmKGFwaUxvY2F0aW9uU3RyaW5nID09PSAnJyl7XHJcbiAgICAgICAgYXBpTG9jYXRpb25TdHJpbmcgPSB2YWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXBpTG9jYXRpb25TdHJpbmcgPSBgJHthcGlMb2NhdGlvblN0cmluZ30sJHt2YWx9YDsgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7YXBpTG9jYXRpb25TdHJpbmd9JmxpbWl0PTEmYXBwaWQ9JHtBUElLZXl9YCwge21vZGU6ICdjb3JzJ30pO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zdCBjb29yZGluYXRlcyA9IHtcclxuICAgIGxhdGl0dWRlOiBjb29yZGluYXRlc0RhdGFbMF0ubGF0LFxyXG4gICAgbG9uZ2l0dWRlOiBjb29yZGluYXRlc0RhdGFbMF0ubG9uXHJcbiAgfVxyXG4gIHJldHVybiBjb29yZGluYXRlcztcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlciAoe2xhdGl0dWRlLCBsb25naXR1ZGV9ID0ge30pe1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmFwcGlkPSR7QVBJS2V5fWAsIHttb2RlOiAnY29ycyd9KTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zdCByZWxldmFudFdlYXRoZXJEYXRhID0ge1xyXG4gICAgbG9jYXRpb246IHdlYXRoZXJEYXRhLm5hbWUsXHJcbiAgICAvLyBkZWZhdWx0IHVuaXQgaXMgJVxyXG4gICAgaHVtaWRpdHk6IHdlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHksXHJcbiAgICAvLyBkZWZhdWx0IHVuaXQgaXMga2VsdmluXHJcbiAgICB0ZW1wZXJhdHVyZTogd2VhdGhlckRhdGEubWFpbi50ZW1wLFxyXG4gICAgbWF4X3RlbXBlcmF0dXJlOiB3ZWF0aGVyRGF0YS5tYWluLnRlbXBfbWF4LFxyXG4gICAgbWluX3RlbXBlcmF0dXJlOiB3ZWF0aGVyRGF0YS5tYWluLnRlbXBfbWluLFxyXG4gICAgLy8gZGVmYXVsdCB1bml0IGlzIG0vc1xyXG4gICAgd2luZF9zcGVlZDogd2VhdGhlckRhdGEud2luZC5zcGVlZCxcclxuICAgIC8vIHRpbWV6b25lIGlzIGluIHNlY29uZHMgdmFyIGQgPSBuZXcgRGF0ZSgobmV3IERhdGUoKS5nZXRUaW1lKCkpLTI1MjAwKjEwMDApXHJcbiAgICAvLyBkLnRvSVNPU3RyaW5nKClcclxuICAgIHRpbWU6IHdlYXRoZXJEYXRhLmR0LFxyXG4gICAgdGltZXpvbmU6IHdlYXRoZXJEYXRhLnRpbWV6b25lLFxyXG4gICAgZGVzY3JpcHRpb246IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb25cclxuICB9XHJcbiAgcmV0dXJuIHJlbGV2YW50V2VhdGhlckRhdGE7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0V2VhdGhlckljb25ET00od2VhdGhlcil7XHJcbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICBzd2l0Y2god2VhdGhlcil7XHJcbiAgICBjYXNlICdDbGVhcic6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1zdW4nLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdDbG91ZHMnOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtY2xvdWQnLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdUaHVuZGVyc3Rvcm0nOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtY2xvdWQtYm9sdCcsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0RyaXp6bGUnOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtY2xvdWQtc3VuLXJhaW4nLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdSYWluJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWNsb3VkLXJhaW4nLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdTbm93JzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXNub3dmbGFrZScsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1Rvcm5hZG8nOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtdG9ybmFkbycsJ2JpZycpO1xyXG4gICAgICBicmVhazsgICAgICBcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1zbW9nJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4gaWNvbjtcclxufVxyXG5cclxuLy8gdGhlIG9ubHkgZnJlZSBBUEkgY2FsbCBmb3IgZm9yZWNhc3QgaXMgNSBkYXksIDMgaG91ciBwZXJpb2RzXHJcbmFzeW5jIGZ1bmN0aW9uIGdldDVEYXlXZWF0aGVyKHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHt9KXtcclxuICAvLyBUTy1ETyBhcGkgY2FsbCBpcyBpbnZhbGlkIGJlY2F1c2UgaXQncyBub3QgZnJlZSwgbmVlZCB0byB1c2UgdGhlIDUgZGF5IG9uZVxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtsYXRpdHVkZX0mbG9uPSR7bG9uZ2l0dWRlfSZhcHBpZD0ke0FQSUtleX1gLCB7bW9kZTogJ2NvcnMnfSk7XHJcbiAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc3Qgd2VhdGhlckRhdGFBcnJheSA9IHdlYXRoZXJEYXRhLmxpc3Q7XHJcbiAgY29uc3QgcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5ID0gW107XHJcbiAgLy8gY2xlYW4gdXAgdGhlIHdlYXRoZXIgZGF0YSBhcnJheSB0byBvbmx5IGdldCByZWxldmFudCB2YWx1ZXNcclxuICB3ZWF0aGVyRGF0YUFycmF5LmZvckVhY2gocmF3RGF0YU9iaiA9PiB7XHJcbiAgICBjb25zdCBkYXkgPSBjb252ZXJ0VW5pdHMuZ2V0RGF5TmFtZShyYXdEYXRhT2JqLmR0X3R4dC5zdWJzdHJpbmcoMCwxMCkpXHJcbiAgICBjb25zdCBtYXhUZW1wZXJhdHVyZSA9IHJhd0RhdGFPYmoubWFpbi50ZW1wX21heDtcclxuICAgIGNvbnN0IG1pblRlbXBlcmF0dXJlID0gcmF3RGF0YU9iai5tYWluLnRlbXBfbWluO1xyXG4gICAgLy8gd2VhdGhlciBoYXMgcG90ZW50aWFsIHZhbHVlcyBUaHVuZGVyc3Rvcm0sIERyaXp6bGUsIFJhaW4sIFNub3csIEEgbG90IG9mIERpZmZlcmVudCBBdG1vc3BoZXJlIE9uZXMsIENsZWFyLCBDbG91ZHNcclxuICAgIGNvbnN0IHdlYXRoZXIgPSByYXdEYXRhT2JqLndlYXRoZXJbMF0ubWFpbjtcclxuICAgIGxldCBpbnNpZGVBcnJheSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICAvLyBtdXRhdGUgbWluLCBtYXggdGVtcGVyYXR1cmUsIHdlYXRoZXIgaWYgb2JqZWN0IGlzIGFscmVhZHkgaW4gYXJyYXlcclxuICAgIHJlbGV2YW50V2VhdGhlckRhdGFBcnJheS5mb3JFYWNoKHJlbGV2YW50T2JqID0+IHtcclxuICAgICAgaWYoZGF5ID09PSByZWxldmFudE9iai5kYXkpe1xyXG4gICAgICAgIHJlbGV2YW50T2JqLm1heFRlbXBlcmF0dXJlID0gTWF0aC5tYXgocmVsZXZhbnRPYmoubWF4VGVtcGVyYXR1cmUsIG1heFRlbXBlcmF0dXJlKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICByZWxldmFudE9iai5taW5UZW1wZXJhdHVyZSA9IE1hdGgubWluKHJlbGV2YW50T2JqLm1pblRlbXBlcmF0dXJlLCBtaW5UZW1wZXJhdHVyZSk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgaWYoKHJlbGV2YW50T2JqLndlYXRoZXIgPT09ICdDbGVhcicgfHwgcmVsZXZhbnRPYmoud2VhdGhlciA9PT0gJ0Nsb3VkcycpICYmXHJcbiAgICAgICAgICAoISh3ZWF0aGVyID09PSAnQ2xlYXInIHx8IHdlYXRoZXIgPT09ICdDbG91ZHMnKSkpe1xyXG4gICAgICAgICAgICByZWxldmFudE9iai53ZWF0aGVyID0gd2VhdGhlcjsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zaWRlQXJyYXkgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBpZighaW5zaWRlQXJyYXkpe1xyXG4gICAgICByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkucHVzaCh7ZGF5LCBtYXhUZW1wZXJhdHVyZSwgbWluVGVtcGVyYXR1cmUsIHdlYXRoZXJ9KVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIHJlbGV2YW50V2VhdGhlckRhdGFBcnJheS5mb3JFYWNoKGRhdGEgPT4ge1xyXG4gICAgZGF0YS53ZWF0aGVySWNvbkRPTSA9IGdldFdlYXRoZXJJY29uRE9NKGRhdGEud2VhdGhlcik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICB9KVxyXG5cclxuICByZXR1cm4gcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YSAobG9jYXRpb25PYmope1xyXG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBnZXRXZWF0aGVyKGF3YWl0IGdldENvb3Jkcyhsb2NhdGlvbk9iaikpO1xyXG4gIHJldHVybiB3ZWF0aGVyO1xyXG59XHJcbiBcclxuYXN5bmMgZnVuY3Rpb24gZ2V0NURheVdlYXRoZXJEYXRhIChsb2NhdGlvbk9iail7XHJcbiAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGdldDVEYXlXZWF0aGVyKGF3YWl0IGdldENvb3Jkcyhsb2NhdGlvbk9iaikpO1xyXG4gIHJldHVybiB3ZWF0aGVyO1xyXG59XHJcblxyXG5leHBvcnQge2dldFdlYXRoZXJEYXRhLCBnZXQ1RGF5V2VhdGhlckRhdGF9OyIsImltcG9ydCBjb252ZXJ0VW5pdHMgZnJvbSBcIi4vdW5pdENvbnZlcnNpb25cIjtcclxuXHJcbi8vIGh0bWwgaGVscGVyIGZ1bmN0aW9uc1xyXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoIHtlbGVtZW50LCBjbGFzc2VzLCBpZGVudGlmaWVyLCBjaGlsZEVsZW1lbnRzLCBjdXN0b21BdHRyaWJ1dGV9KXtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICBpZihjbGFzc2VzKXtcclxuICAgICAgY2xhc3Nlcy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGl0ZW0pKTtcclxuICB9XHJcbiAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdpZCcsaWRlbnRpZmllcik7XHJcbiAgfVxyXG4gIGlmKGNoaWxkRWxlbWVudHMpe1xyXG4gICAgICBjaGlsZEVsZW1lbnRzLmZvckVhY2goaXRlbSA9PiBub2RlLmFwcGVuZENoaWxkKGl0ZW0pKVxyXG4gIH1cclxuICBpZihjdXN0b21BdHRyaWJ1dGUpe1xyXG4gICAgICBpZihjdXN0b21BdHRyaWJ1dGUubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShjdXN0b21BdHRyaWJ1dGVbMF0sIGN1c3RvbUF0dHJpYnV0ZVsxXSk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUYWcoIHtlbGVtZW50LCB0ZXh0LCBjbGFzc2VzLCBpZGVudGlmaWVyfSl7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgaWYoY2xhc3Nlcyl7XHJcbiAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgfVxyXG4gIGlmKGlkZW50aWZpZXIpe1xyXG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnaWQnLGlkZW50aWZpZXIpO1xyXG4gIH1cclxuICBpZih0ZXh0KXtcclxuICAgICAgbm9kZS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gIH1cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuY29uc3QgRnV0dXJlV2VhdGhlciA9IGNsYXNzIHtcclxuICBjb25zdHJ1Y3Rvcih7ZGF5LCBtYXhUZW1wZXJhdHVyZSwgbWluVGVtcGVyYXR1cmUsIHdlYXRoZXIsIHdlYXRoZXJJY29uRE9NLCBpc0ZhaHJlbmhlaXR9KXtcclxuICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4gICAgdGhpcy5tYXhUZW1wZXJhdHVyZSA9IG1heFRlbXBlcmF0dXJlO1xyXG4gICAgdGhpcy5taW5UZW1wZXJhdHVyZSA9IG1pblRlbXBlcmF0dXJlO1xyXG4gICAgdGhpcy53ZWF0aGVyID0gd2VhdGhlcjtcclxuICAgIHRoaXMud2VhdGhlckljb25ET00gPSB3ZWF0aGVySWNvbkRPTTtcclxuICAgIHRoaXMuaXNGYWhyZW5oZWl0ID0gaXNGYWhyZW5oZWl0O1xyXG4gIH1cclxuXHJcblxyXG4gIGdldERPTSgpe1xyXG4gICAgY29uc3QgZGF5VGV4dCA9IGNyZWF0ZVRhZyh7XHJcbiAgICAgIGVsZW1lbnQ6ICdoMicsXHJcbiAgICAgIGNsYXNzZXM6IFsnbm9ybWFsLWhlYWRlciddLFxyXG4gICAgICB0ZXh0OiB0aGlzLmRheVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCB3ZWF0aGVySWNvbiA9IHRoaXMud2VhdGhlckljb25ET007XHJcblxyXG4gICAgY29uc3QgaGlnaFRlbXBlcmF0dXJlID0gY3JlYXRlVGFnKHtcclxuICAgICAgZWxlbWVudDogJ2gyJyxcclxuICAgICAgY2xhc3NlczogWydub3JtYWwtaGVhZGVyJ10sXHJcbiAgICAgIHRleHQ6IHRoaXMuaXNGYWhyZW5oZWl0ID8gYCR7Y29udmVydFVuaXRzLmtUb0YodGhpcy5tYXhUZW1wZXJhdHVyZSl9wrBgIDogYCR7Y29udmVydFVuaXRzLmtUb0ModGhpcy5tYXhUZW1wZXJhdHVyZSl9wrBgXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGxvd1RlbXBlcmF0dXJlID0gY3JlYXRlVGFnKHtcclxuICAgICAgZWxlbWVudDogJ2gyJyxcclxuICAgICAgY2xhc3NlczogWydub3JtYWwtaGVhZGVyJywnbG93LXRlbXBlcmF0dXJlJ10sXHJcbiAgICAgIHRleHQ6IHRoaXMuaXNGYWhyZW5oZWl0ID8gYCR7Y29udmVydFVuaXRzLmtUb0YodGhpcy5taW5UZW1wZXJhdHVyZSl9wrBgIDogYCR7Y29udmVydFVuaXRzLmtUb0ModGhpcy5taW5UZW1wZXJhdHVyZSl9wrBgXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGhpZ2hMb3dUZW1wZXJhdHVyZUNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcih7XHJcbiAgICAgIGVsZW1lbnQ6ICdoMicsXHJcbiAgICAgIGNsYXNzZXM6IFsnaGlnaC1sb3ctdGVtcGVyYXR1cmVzJ10sXHJcbiAgICAgIGNoaWxkRWxlbWVudHM6IFtoaWdoVGVtcGVyYXR1cmUsIGxvd1RlbXBlcmF0dXJlXVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoe1xyXG4gICAgICBlbGVtZW50OiAnZGl2JyxcclxuICAgICAgY2xhc3NlczogWyd3ZWF0aGVyLWNhcmQnXSxcclxuICAgICAgY2hpbGRFbGVtZW50czogW2RheVRleHQsIHdlYXRoZXJJY29uLCBoaWdoTG93VGVtcGVyYXR1cmVDb250YWluZXJdXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBjdXJyZW50VW5pdHMgPSAgKCgpID0+IHtcclxuICBsZXQgaXNGYWhyZW5oZWl0ID0gdHJ1ZTtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0SXNGYWhyZW5oZWl0KCl7XHJcbiAgICByZXR1cm4gaXNGYWhyZW5oZWl0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlVW5pdHMoKXtcclxuICAgIGlzRmFocmVuaGVpdCA9ICFpc0ZhaHJlbmhlaXQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2dldElzRmFocmVuaGVpdCwgdG9nZ2xlVW5pdHN9O1xyXG59KSgpO1xyXG5cclxuXHJcbmV4cG9ydCB7RnV0dXJlV2VhdGhlciwgY3VycmVudFVuaXRzfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVUkgZnJvbSAnLi9VSSdcclxuXHJcbi8vIGNyZWF0ZXMgdGhlIHdlYXRoZXIgcGFnZVxyXG5jb25zdCBtYWluID0gZnVuY3Rpb24gZG9BbGxPcGVyYXRpb25zKCl7XHJcbiAgY29uc3QgaW5pdGlhbExvY2F0aW9uID0ge1xyXG4gICAgY2l0eTogJ1NhbiBGcmFuY2lzY28nXHJcbiAgfVxyXG4gIFVJLmluaXRpYWxSZW5kZXIoaW5pdGlhbExvY2F0aW9uKTtcclxufVxyXG5cclxubWFpbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==