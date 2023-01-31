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
  const renderCurrentWeatherData = function changeCurrentWeatherDataToMatchDOM(currWeatherData){
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
    currentTemperature.innerText = `${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.temperature)}°F`;
    currentHighTemperature.innerText = `High: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.max_temperature)}°F`;
    currentLowTemperature.innerText = `Low: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.min_temperature)}°F`;
    currentHumidity.innerText = `Humidity: ${currWeatherData.humidity}%`;
    currentWind.innerText = `Wind: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].mToMi(currWeatherData.wind_speed)} mph`;
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
        renderCurrentWeatherData(value);
      });
      next5DayWeather.then((value) => {
        render5DayWeatherData(value);
      })
      // TO-DO empty form value if successful; otherwise write error
      event.preventDefault();
    })
  }

  function initialRender(){
    addLocationFormFunctionality();

    // initially render San Francisco
    const currWeatherDataPromise = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(
      {city: "San Francisco"}
    );
    // change the promise to an object
    currWeatherDataPromise.then((currWeatherData) => {
      renderCurrentWeatherData(currWeatherData);
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

  // TO-DO - UNIX TIME TO LOCAL TIME IN THAT TIME ZONE

  return {kToC, kToF, mToMi};
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
//  api key for open weather api is 84648df1cd8895fa8526452f3725c93c

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
    description: weatherData.weather[0].description
  }
  return relevantWeatherData;
}

function getDayName(dateStr, locale)
{
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
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
    const day = getDayName(rawDataObj.dt_txt.substring(0,10), "en-US");
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
  _UI__WEBPACK_IMPORTED_MODULE_0__["default"].initialRender();
}

main();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLEVBQUUseURBQWdCO0FBQ2xCO0FBQ0E7QUFDQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1VJLmpzIiwid2VicGFjazovLy8uL3NyYy9uZXh0V2Vla1dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuaXRDb252ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWF0aGVyQVBJQ2FsbC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQge2dldFdlYXRoZXJEYXRhLCBnZXQ1RGF5V2VhdGhlckRhdGF9IGZyb20gJy4vd2VhdGhlckFQSUNhbGwnO1xyXG5pbXBvcnQgY29udmVydFVuaXRzIGZyb20gJy4vdW5pdENvbnZlcnNpb24nO1xyXG5pbXBvcnQgRnV0dXJlV2VhdGhlciBmcm9tICcuL25leHRXZWVrV2VhdGhlcidcclxuXHJcbmNvbnN0IFVJID0gZnVuY3Rpb24gY3JlYXRlVUkgKCl7XHJcbiAgLy8gY2hhbmdlcyBhbGwgd2VhdGhlciBkYXRhIGZvciB0b2RheVxyXG4gIGNvbnN0IHJlbmRlckN1cnJlbnRXZWF0aGVyRGF0YSA9IGZ1bmN0aW9uIGNoYW5nZUN1cnJlbnRXZWF0aGVyRGF0YVRvTWF0Y2hET00oY3VycldlYXRoZXJEYXRhKXtcclxuICAgIC8vIGdldHMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IG5lZWQgdG8gYmUgY2hhbmdlZFxyXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13ZWF0aGVyXScpO1xyXG4gICAgY29uc3QgY3VycmVudExvY2F0aW9uRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbG9jYXRpb25dJyk7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZURPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRpbWVdJyk7XHJcbiAgICBjb25zdCBjdXJyZW50VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LXRlbXBlcmF0dXJlJyk7XHJcbiAgICBjb25zdCBjdXJyZW50SGlnaFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC1oaWdoJyk7XHJcbiAgICBjb25zdCBjdXJyZW50TG93VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LWxvdycpO1xyXG4gICAgY29uc3QgY3VycmVudFdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LXdpbmQnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRIdW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWN1cnJlbnQtaHVtaWRpdHknKTtcclxuXHJcbiAgICBjdXJyZW50V2VhdGhlckRPTS5pbm5lclRleHQgPSBjdXJyV2VhdGhlckRhdGEuZGVzY3JpcHRpb247XHJcbiAgICBjdXJyZW50TG9jYXRpb25ET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLmxvY2F0aW9uO1xyXG4gICAgY3VycmVudFRpbWVET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLnRpbWU7XHJcbiAgICBjdXJyZW50VGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYCR7Y29udmVydFVuaXRzLmtUb0YoY3VycldlYXRoZXJEYXRhLnRlbXBlcmF0dXJlKX3CsEZgO1xyXG4gICAgY3VycmVudEhpZ2hUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgSGlnaDogJHtjb252ZXJ0VW5pdHMua1RvRihjdXJyV2VhdGhlckRhdGEubWF4X3RlbXBlcmF0dXJlKX3CsEZgO1xyXG4gICAgY3VycmVudExvd1RlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGBMb3c6ICR7Y29udmVydFVuaXRzLmtUb0YoY3VycldlYXRoZXJEYXRhLm1pbl90ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgIGN1cnJlbnRIdW1pZGl0eS5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7Y3VycldlYXRoZXJEYXRhLmh1bWlkaXR5fSVgO1xyXG4gICAgY3VycmVudFdpbmQuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7Y29udmVydFVuaXRzLm1Ub01pKGN1cnJXZWF0aGVyRGF0YS53aW5kX3NwZWVkKX0gbXBoYDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZTVEYXlXZWF0aGVyRGF0YSAoKXtcclxuICAgIGNvbnN0IGFsbFdlYXRoZXJDYXJkRWxlbXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndlYXRoZXItY2FyZCcpXTtcclxuICAgIGFsbFdlYXRoZXJDYXJkRWxlbXMuZm9yRWFjaChlbGVtID0+IHtcclxuICAgICAgZWxlbS5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvLyBjaGFuZ2VzIGFsbCB3ZWF0aGVyIGRhdGEgZm9yIHRoZSBuZXh0IDUgZGF5c1xyXG4gIGNvbnN0IHJlbmRlcjVEYXlXZWF0aGVyRGF0YSA9IGZ1bmN0aW9uIGNoYW5nZTVEYXlXZWF0aGVyRGF0YVRvTWF0Y2hET00od2VhdGhlckRhdGEpe1xyXG4gICAgcmVtb3ZlNURheVdlYXRoZXJEYXRhKCk7XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25leHQtd2Vlay13ZWF0aGVyLWNvbnRhaW5lcicpO1xyXG4gICAgd2VhdGhlckRhdGEuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICBjb25zdCBkYXlPYmplY3QgPSBuZXcgRnV0dXJlV2VhdGhlcihkYXkpO1xyXG4gICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGRheU9iamVjdC5nZXRET00oKSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTG9jYXRpb25Gb3JtRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIGNvbnN0IGxvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbi1mb3JtJyk7XHJcbiAgICBsb2NhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24nKTtcclxuICAgICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbklucHV0LnZhbHVlO1xyXG4gICAgICBjb25zdCBsb2NhdGlvbkFycmF5ID0gbG9jYXRpb24uc3BsaXQoJywgJyk7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uT2JqID0ge307XHJcbiAgICAgIGxvY2F0aW9uQXJyYXkuZm9yRWFjaCgocHJvcGVydHksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoaW5kZXggPT09IDApe1xyXG4gICAgICAgICAgbG9jYXRpb25PYmouY2l0eSA9IHByb3BlcnR5O1xyXG4gICAgICAgIH0gZWxzZSBpZihpbmRleCA9PT0gMSl7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5zdGF0ZSA9IHByb3BlcnR5O1xyXG4gICAgICAgIH0gZWxzZSBpZihpbmRleCA9PT0gMil7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5jb3VudHJ5ID0gcHJvcGVydHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBjb25zdCBjdXJyV2VhdGhlckRhdGEgPSBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbk9iaik7XHJcbiAgICAgIGNvbnN0IG5leHQ1RGF5V2VhdGhlciA9IGdldDVEYXlXZWF0aGVyRGF0YShsb2NhdGlvbk9iaik7XHJcbiAgICAgIC8vIGNoYW5nZSB0aGUgcHJvbWlzZSB0byBhbiBvYmplY3RcclxuICAgICAgY3VycldlYXRoZXJEYXRhLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcmVuZGVyQ3VycmVudFdlYXRoZXJEYXRhKHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG5leHQ1RGF5V2VhdGhlci50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHJlbmRlcjVEYXlXZWF0aGVyRGF0YSh2YWx1ZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIFRPLURPIGVtcHR5IGZvcm0gdmFsdWUgaWYgc3VjY2Vzc2Z1bDsgb3RoZXJ3aXNlIHdyaXRlIGVycm9yXHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdGlhbFJlbmRlcigpe1xyXG4gICAgYWRkTG9jYXRpb25Gb3JtRnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgIC8vIGluaXRpYWxseSByZW5kZXIgU2FuIEZyYW5jaXNjb1xyXG4gICAgY29uc3QgY3VycldlYXRoZXJEYXRhUHJvbWlzZSA9IGdldFdlYXRoZXJEYXRhKFxyXG4gICAgICB7Y2l0eTogXCJTYW4gRnJhbmNpc2NvXCJ9XHJcbiAgICApO1xyXG4gICAgLy8gY2hhbmdlIHRoZSBwcm9taXNlIHRvIGFuIG9iamVjdFxyXG4gICAgY3VycldlYXRoZXJEYXRhUHJvbWlzZS50aGVuKChjdXJyV2VhdGhlckRhdGEpID0+IHtcclxuICAgICAgcmVuZGVyQ3VycmVudFdlYXRoZXJEYXRhKGN1cnJXZWF0aGVyRGF0YSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJOZXdMb2NhdGlvbih3ZWF0aGVyRGF0YSl7XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtpbml0aWFsUmVuZGVyLCByZW5kZXJOZXdMb2NhdGlvbn07XHJcblxyXG59KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVSTsiLCJpbXBvcnQgY29udmVydFVuaXRzIGZyb20gXCIuL3VuaXRDb252ZXJzaW9uXCI7XHJcblxyXG4vLyBodG1sIGhlbHBlciBmdW5jdGlvbnNcclxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCB7ZWxlbWVudCwgY2xhc3NlcywgaWRlbnRpZmllciwgY2hpbGRFbGVtZW50cywgY3VzdG9tQXR0cmlidXRlfSl7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgaWYoY2xhc3Nlcyl7XHJcbiAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgfVxyXG4gIGlmKGlkZW50aWZpZXIpe1xyXG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnaWQnLGlkZW50aWZpZXIpO1xyXG4gIH1cclxuICBpZihjaGlsZEVsZW1lbnRzKXtcclxuICAgICAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5hcHBlbmRDaGlsZChpdGVtKSlcclxuICB9XHJcbiAgaWYoY3VzdG9tQXR0cmlidXRlKXtcclxuICAgICAgaWYoY3VzdG9tQXR0cmlidXRlLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoY3VzdG9tQXR0cmlidXRlWzBdLCBjdXN0b21BdHRyaWJ1dGVbMV0pO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFnKCB7ZWxlbWVudCwgdGV4dCwgY2xhc3NlcywgaWRlbnRpZmllcn0pe1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gIGlmKGNsYXNzZXMpe1xyXG4gICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gIH1cclxuICBpZihpZGVudGlmaWVyKXtcclxuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICB9XHJcbiAgaWYodGV4dCl7XHJcbiAgICAgIG5vZGUuaW5uZXJUZXh0ID0gdGV4dDtcclxuICB9XHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmNvbnN0IEZ1dHVyZVdlYXRoZXIgPSBjbGFzcyB7XHJcbiAgY29uc3RydWN0b3Ioe2RheSwgbWF4VGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlLCB3ZWF0aGVyLCB3ZWF0aGVySWNvbkRPTX0pe1xyXG4gICAgdGhpcy5kYXkgPSBkYXk7XHJcbiAgICB0aGlzLm1heFRlbXBlcmF0dXJlID0gbWF4VGVtcGVyYXR1cmU7XHJcbiAgICB0aGlzLm1pblRlbXBlcmF0dXJlID0gbWluVGVtcGVyYXR1cmU7XHJcbiAgICB0aGlzLndlYXRoZXIgPSB3ZWF0aGVyO1xyXG4gICAgdGhpcy53ZWF0aGVySWNvbkRPTSA9IHdlYXRoZXJJY29uRE9NO1xyXG4gICAgdGhpcy5pc0ZhaHJlbmhlaXQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVW5pdHMoKXtcclxuICAgIHRoaXMuaXNGYWhyZW5oZWl0ID0gIXRoaXMuaXNGYWhyZW5oZWl0O1xyXG4gIH1cclxuXHJcbiAgZ2V0RE9NKCl7XHJcbiAgICBjb25zdCBkYXlUZXh0ID0gY3JlYXRlVGFnKHtcclxuICAgICAgZWxlbWVudDogJ2gyJyxcclxuICAgICAgY2xhc3NlczogWydub3JtYWwtaGVhZGVyJ10sXHJcbiAgICAgIHRleHQ6IHRoaXMuZGF5XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gdGhpcy53ZWF0aGVySWNvbkRPTTtcclxuXHJcbiAgICBjb25zdCBoaWdoVGVtcGVyYXR1cmUgPSBjcmVhdGVUYWcoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ25vcm1hbC1oZWFkZXInXSxcclxuICAgICAgdGV4dDogdGhpcy5pc0ZhaHJlbmhlaXQgPyBgJHtjb252ZXJ0VW5pdHMua1RvRih0aGlzLm1heFRlbXBlcmF0dXJlKX3CsGAgOiBgJHtjb252ZXJ0VW5pdHMua1RvQyh0aGlzLm1heFRlbXBlcmF0dXJlKX3CsGBcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgbG93VGVtcGVyYXR1cmUgPSBjcmVhdGVUYWcoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ25vcm1hbC1oZWFkZXInLCdsb3ctdGVtcGVyYXR1cmUnXSxcclxuICAgICAgdGV4dDogdGhpcy5pc0ZhaHJlbmhlaXQgPyBgJHtjb252ZXJ0VW5pdHMua1RvRih0aGlzLm1pblRlbXBlcmF0dXJlKX3CsGAgOiBgJHtjb252ZXJ0VW5pdHMua1RvQyh0aGlzLm1pblRlbXBlcmF0dXJlKX3CsGBcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgaGlnaExvd1RlbXBlcmF0dXJlQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKHtcclxuICAgICAgZWxlbWVudDogJ2gyJyxcclxuICAgICAgY2xhc3NlczogWydoaWdoLWxvdy10ZW1wZXJhdHVyZXMnXSxcclxuICAgICAgY2hpbGRFbGVtZW50czogW2hpZ2hUZW1wZXJhdHVyZSwgbG93VGVtcGVyYXR1cmVdXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcih7XHJcbiAgICAgIGVsZW1lbnQ6ICdkaXYnLFxyXG4gICAgICBjbGFzc2VzOiBbJ3dlYXRoZXItY2FyZCddLFxyXG4gICAgICBjaGlsZEVsZW1lbnRzOiBbZGF5VGV4dCwgd2VhdGhlckljb24sIGhpZ2hMb3dUZW1wZXJhdHVyZUNvbnRhaW5lcl1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGdXR1cmVXZWF0aGVyO1xyXG4iLCJjb25zdCBjb252ZXJ0VW5pdHMgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IGtUb0MgPSBmdW5jdGlvbiBrZWx2aW5Ub0NlbHNpdXMoa2VsdmluKSB7XHJcbiAgICByZXR1cm4gKGtlbHZpbiAtIDI3My4xNSkudG9GaXhlZCgwKTtcclxuICB9XHJcbiAgXHJcbiAgY29uc3Qga1RvRiA9IGZ1bmN0aW9uIGtlbHZpblRvRmFocmVuaGVpdChrZWx2aW4pIHtcclxuICAgIHJldHVybiAoMS44KihrZWx2aW4gLSAyNzMpKzMyKS50b0ZpeGVkKDApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbVRvTWkgPSBmdW5jdGlvbiBtZXRlcnNUb01pbGVzKG1ldGVycyl7XHJcbiAgICBjb25zdCBtaSA9IChtZXRlcnMvMTYwOS4zNDQpLnRvRml4ZWQoMSk7XHJcbiAgICBpZihtaSA9PT0gXCIwLjBcIil7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1pO1xyXG4gIH1cclxuXHJcbiAgLy8gVE8tRE8gLSBVTklYIFRJTUUgVE8gTE9DQUwgVElNRSBJTiBUSEFUIFRJTUUgWk9ORVxyXG5cclxuICByZXR1cm4ge2tUb0MsIGtUb0YsIG1Ub01pfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnRVbml0czsiLCIvLyAgYXBpIGtleSBmb3Igb3BlbiB3ZWF0aGVyIGFwaSBpcyA4NDY0OGRmMWNkODg5NWZhODUyNjQ1MmYzNzI1YzkzY1xyXG5cclxuLy8gc2hvdWxkIGtlZXAgQVBJIEtleSBpbiBiYWNrLWVuZCBvbmNlIGxlYXJuIGhvdyB0b1xyXG5jb25zdCBBUElLZXkgPSAnODQ2NDhkZjFjZDg4OTVmYTg1MjY0NTJmMzcyNWM5M2MnO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29vcmRzICh7Y2l0eSwgc3RhdGUsIGNvdW50cnl9ID0ge30pe1xyXG4gIGNvbnN0IG9iaiA9IHtjaXR5LCBzdGF0ZSwgY291bnRyeX07XHJcbiAgbGV0IGFwaUxvY2F0aW9uU3RyaW5nID0gJyc7XHJcbiAgT2JqZWN0LnZhbHVlcyhvYmopLmZvckVhY2godmFsID0+IHtcclxuICAgIGlmKHZhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmKGFwaUxvY2F0aW9uU3RyaW5nID09PSAnJyl7XHJcbiAgICAgICAgYXBpTG9jYXRpb25TdHJpbmcgPSB2YWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXBpTG9jYXRpb25TdHJpbmcgPSBgJHthcGlMb2NhdGlvblN0cmluZ30sJHt2YWx9YDsgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7YXBpTG9jYXRpb25TdHJpbmd9JmxpbWl0PTEmYXBwaWQ9JHtBUElLZXl9YCwge21vZGU6ICdjb3JzJ30pO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zdCBjb29yZGluYXRlcyA9IHtcclxuICAgIGxhdGl0dWRlOiBjb29yZGluYXRlc0RhdGFbMF0ubGF0LFxyXG4gICAgbG9uZ2l0dWRlOiBjb29yZGluYXRlc0RhdGFbMF0ubG9uXHJcbiAgfVxyXG4gIHJldHVybiBjb29yZGluYXRlcztcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlciAoe2xhdGl0dWRlLCBsb25naXR1ZGV9ID0ge30pe1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmFwcGlkPSR7QVBJS2V5fWAsIHttb2RlOiAnY29ycyd9KTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zdCByZWxldmFudFdlYXRoZXJEYXRhID0ge1xyXG4gICAgbG9jYXRpb246IHdlYXRoZXJEYXRhLm5hbWUsXHJcbiAgICAvLyBkZWZhdWx0IHVuaXQgaXMgJVxyXG4gICAgaHVtaWRpdHk6IHdlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHksXHJcbiAgICAvLyBkZWZhdWx0IHVuaXQgaXMga2VsdmluXHJcbiAgICB0ZW1wZXJhdHVyZTogd2VhdGhlckRhdGEubWFpbi50ZW1wLFxyXG4gICAgbWF4X3RlbXBlcmF0dXJlOiB3ZWF0aGVyRGF0YS5tYWluLnRlbXBfbWF4LFxyXG4gICAgbWluX3RlbXBlcmF0dXJlOiB3ZWF0aGVyRGF0YS5tYWluLnRlbXBfbWluLFxyXG4gICAgLy8gZGVmYXVsdCB1bml0IGlzIG0vc1xyXG4gICAgd2luZF9zcGVlZDogd2VhdGhlckRhdGEud2luZC5zcGVlZCxcclxuICAgIC8vIHRpbWV6b25lIGlzIGluIHNlY29uZHMgdmFyIGQgPSBuZXcgRGF0ZSgobmV3IERhdGUoKS5nZXRUaW1lKCkpLTI1MjAwKjEwMDApXHJcbiAgICAvLyBkLnRvSVNPU3RyaW5nKClcclxuICAgIHRpbWU6IHdlYXRoZXJEYXRhLmR0LFxyXG4gICAgZGVzY3JpcHRpb246IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb25cclxuICB9XHJcbiAgcmV0dXJuIHJlbGV2YW50V2VhdGhlckRhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheU5hbWUoZGF0ZVN0ciwgbG9jYWxlKVxyXG57XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cik7XHJcbiAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IHdlZWtkYXk6ICdsb25nJyB9KTsgICAgICAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXZWF0aGVySWNvbkRPTSh3ZWF0aGVyKXtcclxuICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gIHN3aXRjaCh3ZWF0aGVyKXtcclxuICAgIGNhc2UgJ0NsZWFyJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXN1bicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0Nsb3Vkcyc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZCcsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1RodW5kZXJzdG9ybSc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZC1ib2x0JywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnRHJpenpsZSc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZC1zdW4tcmFpbicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1JhaW4nOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtY2xvdWQtcmFpbicsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ1Nub3cnOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc25vd2ZsYWtlJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnVG9ybmFkbyc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS10b3JuYWRvJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrOyAgICAgIFxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXNtb2cnLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBpY29uO1xyXG59XHJcblxyXG4vLyB0aGUgb25seSBmcmVlIEFQSSBjYWxsIGZvciBmb3JlY2FzdCBpcyA1IGRheSwgMyBob3VyIHBlcmlvZHNcclxuYXN5bmMgZnVuY3Rpb24gZ2V0NURheVdlYXRoZXIoe2xhdGl0dWRlLCBsb25naXR1ZGV9ID0ge30pe1xyXG4gIC8vIFRPLURPIGFwaSBjYWxsIGlzIGludmFsaWQgYmVjYXVzZSBpdCdzIG5vdCBmcmVlLCBuZWVkIHRvIHVzZSB0aGUgNSBkYXkgb25lXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmFwcGlkPSR7QVBJS2V5fWAsIHttb2RlOiAnY29ycyd9KTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YUFycmF5ID0gd2VhdGhlckRhdGEubGlzdDtcclxuICBjb25zdCByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkgPSBbXTtcclxuXHJcbiAgLy8gY2xlYW4gdXAgdGhlIHdlYXRoZXIgZGF0YSBhcnJheSB0byBvbmx5IGdldCByZWxldmFudCB2YWx1ZXNcclxuICB3ZWF0aGVyRGF0YUFycmF5LmZvckVhY2gocmF3RGF0YU9iaiA9PiB7XHJcbiAgICBjb25zdCBkYXkgPSBnZXREYXlOYW1lKHJhd0RhdGFPYmouZHRfdHh0LnN1YnN0cmluZygwLDEwKSwgXCJlbi1VU1wiKTtcclxuICAgIGNvbnN0IG1heFRlbXBlcmF0dXJlID0gcmF3RGF0YU9iai5tYWluLnRlbXBfbWF4O1xyXG4gICAgY29uc3QgbWluVGVtcGVyYXR1cmUgPSByYXdEYXRhT2JqLm1haW4udGVtcF9taW47XHJcbiAgICAvLyB3ZWF0aGVyIGhhcyBwb3RlbnRpYWwgdmFsdWVzIFRodW5kZXJzdG9ybSwgRHJpenpsZSwgUmFpbiwgU25vdywgQSBsb3Qgb2YgRGlmZmVyZW50IEF0bW9zcGhlcmUgT25lcywgQ2xlYXIsIENsb3Vkc1xyXG4gICAgY29uc3Qgd2VhdGhlciA9IHJhd0RhdGFPYmoud2VhdGhlclswXS5tYWluO1xyXG4gICAgbGV0IGluc2lkZUFycmF5ID0gZmFsc2U7XHJcbiAgICBcclxuICAgIC8vIG11dGF0ZSBtaW4sIG1heCB0ZW1wZXJhdHVyZSwgd2VhdGhlciBpZiBvYmplY3QgaXMgYWxyZWFkeSBpbiBhcnJheVxyXG4gICAgcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5LmZvckVhY2gocmVsZXZhbnRPYmogPT4ge1xyXG4gICAgICBpZihkYXkgPT09IHJlbGV2YW50T2JqLmRheSl7XHJcbiAgICAgICAgcmVsZXZhbnRPYmoubWF4VGVtcGVyYXR1cmUgPSBNYXRoLm1heChyZWxldmFudE9iai5tYXhUZW1wZXJhdHVyZSwgbWF4VGVtcGVyYXR1cmUpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIHJlbGV2YW50T2JqLm1pblRlbXBlcmF0dXJlID0gTWF0aC5taW4ocmVsZXZhbnRPYmoubWluVGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICBpZigocmVsZXZhbnRPYmoud2VhdGhlciA9PT0gJ0NsZWFyJyB8fCByZWxldmFudE9iai53ZWF0aGVyID09PSAnQ2xvdWRzJykgJiZcclxuICAgICAgICAgICghKHdlYXRoZXIgPT09ICdDbGVhcicgfHwgd2VhdGhlciA9PT0gJ0Nsb3VkcycpKSl7XHJcbiAgICAgICAgICAgIHJlbGV2YW50T2JqLndlYXRoZXIgPSB3ZWF0aGVyOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIH1cclxuICAgICAgICBpbnNpZGVBcnJheSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBcclxuICAgIGlmKCFpbnNpZGVBcnJheSl7XHJcbiAgICAgIHJlbGV2YW50V2VhdGhlckRhdGFBcnJheS5wdXNoKHtkYXksIG1heFRlbXBlcmF0dXJlLCBtaW5UZW1wZXJhdHVyZSwgd2VhdGhlcn0pXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5LmZvckVhY2goZGF0YSA9PiB7XHJcbiAgICBkYXRhLndlYXRoZXJJY29uRE9NID0gZ2V0V2VhdGhlckljb25ET00oZGF0YS53ZWF0aGVyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gIH0pXHJcblxyXG4gIHJldHVybiByZWxldmFudFdlYXRoZXJEYXRhQXJyYXk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhIChsb2NhdGlvbk9iail7XHJcbiAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXIoYXdhaXQgZ2V0Q29vcmRzKGxvY2F0aW9uT2JqKSk7XHJcbiAgcmV0dXJuIHdlYXRoZXI7XHJcbn1cclxuIFxyXG5hc3luYyBmdW5jdGlvbiBnZXQ1RGF5V2VhdGhlckRhdGEgKGxvY2F0aW9uT2JqKXtcclxuICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgZ2V0NURheVdlYXRoZXIoYXdhaXQgZ2V0Q29vcmRzKGxvY2F0aW9uT2JqKSk7XHJcbiAgcmV0dXJuIHdlYXRoZXI7XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0V2VhdGhlckRhdGEsIGdldDVEYXlXZWF0aGVyRGF0YX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVUkgZnJvbSAnLi9VSSdcclxuXHJcbi8vIGNyZWF0ZXMgdGhlIHdlYXRoZXIgcGFnZVxyXG5jb25zdCBtYWluID0gZnVuY3Rpb24gZG9BbGxPcGVyYXRpb25zKCl7XHJcbiAgVUkuaW5pdGlhbFJlbmRlcigpO1xyXG59XHJcblxyXG5tYWluKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9