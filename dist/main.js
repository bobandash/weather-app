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
    currentTimeDOM.innerText = currWeatherData.time;
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
  const initialLocation = {
    city: 'San Francisco'
  }
  _UI__WEBPACK_IMPORTED_MODULE_0__["default"].initialRender(initialLocation);
}

main();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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M0QsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN4SUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHlEQUFnQjtBQUNsQjtBQUNBO0FBQ0EsTyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dFdlZWtXZWF0aGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91bml0Q29udmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2VhdGhlckFQSUNhbGwuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHtnZXRXZWF0aGVyRGF0YSwgZ2V0NURheVdlYXRoZXJEYXRhfSBmcm9tICcuL3dlYXRoZXJBUElDYWxsJztcclxuaW1wb3J0IGNvbnZlcnRVbml0cyBmcm9tICcuL3VuaXRDb252ZXJzaW9uJztcclxuaW1wb3J0IEZ1dHVyZVdlYXRoZXIgZnJvbSAnLi9uZXh0V2Vla1dlYXRoZXInXHJcblxyXG5jb25zdCBVSSA9IGZ1bmN0aW9uIGNyZWF0ZVVJICgpe1xyXG4gIC8vIGNoYW5nZXMgYWxsIHdlYXRoZXIgZGF0YSBmb3IgdG9kYXlcclxuICBjb25zdCByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEgPSBmdW5jdGlvbiBjaGFuZ2VDdXJyZW50V2VhdGhlckRhdGFUb01hdGNoRE9NKGN1cnJXZWF0aGVyRGF0YSwgaXNGYWhyZW5oZWl0KXtcclxuICAgIC8vIGdldHMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IG5lZWQgdG8gYmUgY2hhbmdlZFxyXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13ZWF0aGVyXScpO1xyXG4gICAgY29uc3QgY3VycmVudExvY2F0aW9uRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbG9jYXRpb25dJyk7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZURPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRpbWVdJyk7XHJcbiAgICBjb25zdCBjdXJyZW50VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LXRlbXBlcmF0dXJlJyk7XHJcbiAgICBjb25zdCBjdXJyZW50SGlnaFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC1oaWdoJyk7XHJcbiAgICBjb25zdCBjdXJyZW50TG93VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LWxvdycpO1xyXG4gICAgY29uc3QgY3VycmVudFdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LXdpbmQnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRIdW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWN1cnJlbnQtaHVtaWRpdHknKTtcclxuXHJcbiAgICBjdXJyZW50V2VhdGhlckRPTS5pbm5lclRleHQgPSBjdXJyV2VhdGhlckRhdGEuZGVzY3JpcHRpb247XHJcbiAgICBjdXJyZW50TG9jYXRpb25ET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLmxvY2F0aW9uO1xyXG4gICAgY3VycmVudFRpbWVET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLnRpbWU7XHJcbiAgICBjdXJyZW50SHVtaWRpdHkuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke2N1cnJXZWF0aGVyRGF0YS5odW1pZGl0eX0lYDtcclxuXHJcbiAgICBpZihpc0ZhaHJlbmhlaXQpe1xyXG4gICAgICBjdXJyZW50VGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYCR7Y29udmVydFVuaXRzLmtUb0YoY3VycldlYXRoZXJEYXRhLnRlbXBlcmF0dXJlKX3CsEZgO1xyXG4gICAgICBjdXJyZW50SGlnaFRlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGBIaWdoOiAke2NvbnZlcnRVbml0cy5rVG9GKGN1cnJXZWF0aGVyRGF0YS5tYXhfdGVtcGVyYXR1cmUpfcKwRmA7XHJcbiAgICAgIGN1cnJlbnRMb3dUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgTG93OiAke2NvbnZlcnRVbml0cy5rVG9GKGN1cnJXZWF0aGVyRGF0YS5taW5fdGVtcGVyYXR1cmUpfcKwRmA7XHJcbiAgICAgIGN1cnJlbnRXaW5kLmlubmVyVGV4dCA9IGBXaW5kOiAke2NvbnZlcnRVbml0cy5tVG9NaShjdXJyV2VhdGhlckRhdGEud2luZF9zcGVlZCl9IG1waGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjdXJyZW50VGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYCR7Y29udmVydFVuaXRzLmtUb0MoY3VycldlYXRoZXJEYXRhLnRlbXBlcmF0dXJlKX3CsENgO1xyXG4gICAgICBjdXJyZW50SGlnaFRlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGBIaWdoOiAke2NvbnZlcnRVbml0cy5rVG9DKGN1cnJXZWF0aGVyRGF0YS5tYXhfdGVtcGVyYXR1cmUpfcKwQ2A7XHJcbiAgICAgIGN1cnJlbnRMb3dUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgTG93OiAke2NvbnZlcnRVbml0cy5rVG9DKGN1cnJXZWF0aGVyRGF0YS5taW5fdGVtcGVyYXR1cmUpfcKwQ2A7XHJcbiAgICAgIGN1cnJlbnRXaW5kLmlubmVyVGV4dCA9IGBXaW5kOiAke2N1cnJXZWF0aGVyRGF0YS53aW5kX3NwZWVkfSBtL3NgOyAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlNURheVdlYXRoZXJEYXRhICgpe1xyXG4gICAgY29uc3QgYWxsV2VhdGhlckNhcmRFbGVtcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud2VhdGhlci1jYXJkJyldO1xyXG4gICAgYWxsV2VhdGhlckNhcmRFbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xyXG4gICAgICBlbGVtLnJlbW92ZSgpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vIGNoYW5nZXMgYWxsIHdlYXRoZXIgZGF0YSBmb3IgdGhlIG5leHQgNSBkYXlzXHJcbiAgY29uc3QgcmVuZGVyNURheVdlYXRoZXJEYXRhID0gZnVuY3Rpb24gY2hhbmdlNURheVdlYXRoZXJEYXRhVG9NYXRjaERPTSh3ZWF0aGVyRGF0YSl7XHJcbiAgICByZW1vdmU1RGF5V2VhdGhlckRhdGEoKTtcclxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dC13ZWVrLXdlYXRoZXItY29udGFpbmVyJyk7XHJcbiAgICB3ZWF0aGVyRGF0YS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgIGNvbnN0IGRheU9iamVjdCA9IG5ldyBGdXR1cmVXZWF0aGVyKGRheSk7XHJcbiAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZGF5T2JqZWN0LmdldERPTSgpKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRMb2NhdGlvbkZvcm1GdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgY29uc3QgbG9jYXRpb25Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uLWZvcm0nKTtcclxuICAgIGxvY2F0aW9uRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgbG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbicpO1xyXG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGxvY2F0aW9uSW5wdXQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBsb2NhdGlvbi5zcGxpdCgnLCAnKTtcclxuICAgICAgY29uc3QgbG9jYXRpb25PYmogPSB7fTtcclxuICAgICAgbG9jYXRpb25BcnJheS5mb3JFYWNoKChwcm9wZXJ0eSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpbmRleCA9PT0gMCl7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5jaXR5ID0gcHJvcGVydHk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGluZGV4ID09PSAxKXtcclxuICAgICAgICAgIGxvY2F0aW9uT2JqLnN0YXRlID0gcHJvcGVydHk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGluZGV4ID09PSAyKXtcclxuICAgICAgICAgIGxvY2F0aW9uT2JqLmNvdW50cnkgPSBwcm9wZXJ0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IGN1cnJXZWF0aGVyRGF0YSA9IGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgICAgY29uc3QgbmV4dDVEYXlXZWF0aGVyID0gZ2V0NURheVdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgICAgLy8gY2hhbmdlIHRoZSBwcm9taXNlIHRvIGFuIG9iamVjdFxyXG4gICAgICBjdXJyV2VhdGhlckRhdGEudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICByZW5kZXJDdXJyZW50V2VhdGhlckRhdGEodmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgbmV4dDVEYXlXZWF0aGVyLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcmVuZGVyNURheVdlYXRoZXJEYXRhKHZhbHVlKTtcclxuICAgICAgfSlcclxuICAgICAgLy8gVE8tRE8gZW1wdHkgZm9ybSB2YWx1ZSBpZiBzdWNjZXNzZnVsOyBvdGhlcndpc2Ugd3JpdGUgZXJyb3JcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRDaGFuZ2VNZXRyaWNCdG4oY3VycldlYXRoZXJEYXRhLCBuZXh0NURheVdlYXRoZXJEYXRhKXtcclxuICAgIGNvbnN0IGNoYW5nZU1ldHJpY0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFuZ2UtdW5pdHMtYnRuJyk7XHJcbiAgICBjaGFuZ2VNZXRyaWNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBuZXh0NURheVdlYXRoZXJEYXRhLmZvckVhY2goZGF0YSA9PiBkYXRhLnRvZ2dsZVVuaXRzKCkpXHJcbiAgICB9KVxyXG4gICAgY29uc3QgaXNGYWhyZW5oZWl0ID0gbmV4dDVEYXlXZWF0aGVyRGF0YS5pc0ZhaHJlaGVpdDtcclxuICAgIHJlbmRlckN1cnJlbnRXZWF0aGVyRGF0YShjdXJyV2VhdGhlckRhdGEsIGlzRmFocmVuaGVpdCk7XHJcbiAgICByZW5kZXI1RGF5V2VhdGhlckRhdGEobmV4dDVEYXlXZWF0aGVyRGF0YSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0aWFsUmVuZGVyKGxvY2F0aW9uT2JqKXtcclxuICAgIGFkZExvY2F0aW9uRm9ybUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIFxyXG4gICAgY29uc3QgY3VycldlYXRoZXJEYXRhUHJvbWlzZSA9IGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgIGNvbnN0IG5leHQ1RGF5V2VhdGhlckRhdGFQcm9taXNlID0gZ2V0NURheVdlYXRoZXJEYXRhKGxvY2F0aW9uT2JqKTtcclxuICAgIC8vIGNoYW5nZSB0aGUgcHJvbWlzZSB0byBhbiBvYmplY3RcclxuICAgIGN1cnJXZWF0aGVyRGF0YVByb21pc2UudGhlbigoY3VycldlYXRoZXJEYXRhKSA9PiB7XHJcbiAgICAgIHJlbmRlckN1cnJlbnRXZWF0aGVyRGF0YShjdXJyV2VhdGhlckRhdGEsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICBuZXh0NURheVdlYXRoZXJEYXRhUHJvbWlzZS50aGVuKChmaXZlRGF5V2VhdGhlckRhdGEpID0+IHtcclxuICAgICAgcmVuZGVyNURheVdlYXRoZXJEYXRhKGZpdmVEYXlXZWF0aGVyRGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlck5ld0xvY2F0aW9uKHdlYXRoZXJEYXRhKXtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2luaXRpYWxSZW5kZXIsIHJlbmRlck5ld0xvY2F0aW9ufTtcclxuXHJcbn0oKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVJOyIsImltcG9ydCBjb252ZXJ0VW5pdHMgZnJvbSBcIi4vdW5pdENvbnZlcnNpb25cIjtcclxuXHJcbi8vIGh0bWwgaGVscGVyIGZ1bmN0aW9uc1xyXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoIHtlbGVtZW50LCBjbGFzc2VzLCBpZGVudGlmaWVyLCBjaGlsZEVsZW1lbnRzLCBjdXN0b21BdHRyaWJ1dGV9KXtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICBpZihjbGFzc2VzKXtcclxuICAgICAgY2xhc3Nlcy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGl0ZW0pKTtcclxuICB9XHJcbiAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdpZCcsaWRlbnRpZmllcik7XHJcbiAgfVxyXG4gIGlmKGNoaWxkRWxlbWVudHMpe1xyXG4gICAgICBjaGlsZEVsZW1lbnRzLmZvckVhY2goaXRlbSA9PiBub2RlLmFwcGVuZENoaWxkKGl0ZW0pKVxyXG4gIH1cclxuICBpZihjdXN0b21BdHRyaWJ1dGUpe1xyXG4gICAgICBpZihjdXN0b21BdHRyaWJ1dGUubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShjdXN0b21BdHRyaWJ1dGVbMF0sIGN1c3RvbUF0dHJpYnV0ZVsxXSk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUYWcoIHtlbGVtZW50LCB0ZXh0LCBjbGFzc2VzLCBpZGVudGlmaWVyfSl7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgaWYoY2xhc3Nlcyl7XHJcbiAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgfVxyXG4gIGlmKGlkZW50aWZpZXIpe1xyXG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnaWQnLGlkZW50aWZpZXIpO1xyXG4gIH1cclxuICBpZih0ZXh0KXtcclxuICAgICAgbm9kZS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gIH1cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuY29uc3QgRnV0dXJlV2VhdGhlciA9IGNsYXNzIHtcclxuICBjb25zdHJ1Y3Rvcih7ZGF5LCBtYXhUZW1wZXJhdHVyZSwgbWluVGVtcGVyYXR1cmUsIHdlYXRoZXIsIHdlYXRoZXJJY29uRE9NfSl7XHJcbiAgICB0aGlzLmRheSA9IGRheTtcclxuICAgIHRoaXMubWF4VGVtcGVyYXR1cmUgPSBtYXhUZW1wZXJhdHVyZTtcclxuICAgIHRoaXMubWluVGVtcGVyYXR1cmUgPSBtaW5UZW1wZXJhdHVyZTtcclxuICAgIHRoaXMud2VhdGhlciA9IHdlYXRoZXI7XHJcbiAgICB0aGlzLndlYXRoZXJJY29uRE9NID0gd2VhdGhlckljb25ET007XHJcbiAgICB0aGlzLmlzRmFocmVuaGVpdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVVbml0cygpe1xyXG4gICAgdGhpcy5pc0ZhaHJlbmhlaXQgPSAhdGhpcy5pc0ZhaHJlbmhlaXQ7XHJcbiAgfVxyXG5cclxuICBnZXRET00oKXtcclxuICAgIGNvbnN0IGRheVRleHQgPSBjcmVhdGVUYWcoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ25vcm1hbC1oZWFkZXInXSxcclxuICAgICAgdGV4dDogdGhpcy5kYXlcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSB0aGlzLndlYXRoZXJJY29uRE9NO1xyXG5cclxuICAgIGNvbnN0IGhpZ2hUZW1wZXJhdHVyZSA9IGNyZWF0ZVRhZyh7XHJcbiAgICAgIGVsZW1lbnQ6ICdoMicsXHJcbiAgICAgIGNsYXNzZXM6IFsnbm9ybWFsLWhlYWRlciddLFxyXG4gICAgICB0ZXh0OiB0aGlzLmlzRmFocmVuaGVpdCA/IGAke2NvbnZlcnRVbml0cy5rVG9GKHRoaXMubWF4VGVtcGVyYXR1cmUpfcKwYCA6IGAke2NvbnZlcnRVbml0cy5rVG9DKHRoaXMubWF4VGVtcGVyYXR1cmUpfcKwYFxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBsb3dUZW1wZXJhdHVyZSA9IGNyZWF0ZVRhZyh7XHJcbiAgICAgIGVsZW1lbnQ6ICdoMicsXHJcbiAgICAgIGNsYXNzZXM6IFsnbm9ybWFsLWhlYWRlcicsJ2xvdy10ZW1wZXJhdHVyZSddLFxyXG4gICAgICB0ZXh0OiB0aGlzLmlzRmFocmVuaGVpdCA/IGAke2NvbnZlcnRVbml0cy5rVG9GKHRoaXMubWluVGVtcGVyYXR1cmUpfcKwYCA6IGAke2NvbnZlcnRVbml0cy5rVG9DKHRoaXMubWluVGVtcGVyYXR1cmUpfcKwYFxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBoaWdoTG93VGVtcGVyYXR1cmVDb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoe1xyXG4gICAgICBlbGVtZW50OiAnaDInLFxyXG4gICAgICBjbGFzc2VzOiBbJ2hpZ2gtbG93LXRlbXBlcmF0dXJlcyddLFxyXG4gICAgICBjaGlsZEVsZW1lbnRzOiBbaGlnaFRlbXBlcmF0dXJlLCBsb3dUZW1wZXJhdHVyZV1cclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKHtcclxuICAgICAgZWxlbWVudDogJ2RpdicsXHJcbiAgICAgIGNsYXNzZXM6IFsnd2VhdGhlci1jYXJkJ10sXHJcbiAgICAgIGNoaWxkRWxlbWVudHM6IFtkYXlUZXh0LCB3ZWF0aGVySWNvbiwgaGlnaExvd1RlbXBlcmF0dXJlQ29udGFpbmVyXVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZ1dHVyZVdlYXRoZXI7XHJcbiIsImNvbnN0IGNvbnZlcnRVbml0cyA9ICgoKSA9PiB7XHJcbiAgY29uc3Qga1RvQyA9IGZ1bmN0aW9uIGtlbHZpblRvQ2Vsc2l1cyhrZWx2aW4pIHtcclxuICAgIHJldHVybiAoa2VsdmluIC0gMjczLjE1KS50b0ZpeGVkKDApO1xyXG4gIH1cclxuICBcclxuICBjb25zdCBrVG9GID0gZnVuY3Rpb24ga2VsdmluVG9GYWhyZW5oZWl0KGtlbHZpbikge1xyXG4gICAgcmV0dXJuICgxLjgqKGtlbHZpbiAtIDI3MykrMzIpLnRvRml4ZWQoMCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtVG9NaSA9IGZ1bmN0aW9uIG1ldGVyc1RvTWlsZXMobWV0ZXJzKXtcclxuICAgIGNvbnN0IG1pID0gKG1ldGVycy8xNjA5LjM0NCkudG9GaXhlZCgxKTtcclxuICAgIGlmKG1pID09PSBcIjAuMFwiKXtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWk7XHJcbiAgfVxyXG5cclxuICAvLyBUTy1ETyAtIFVOSVggVElNRSBUTyBMT0NBTCBUSU1FIElOIFRIQVQgVElNRSBaT05FXHJcblxyXG4gIHJldHVybiB7a1RvQywga1RvRiwgbVRvTWl9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udmVydFVuaXRzOyIsIi8vICBhcGkga2V5IGZvciBvcGVuIHdlYXRoZXIgYXBpIGlzIDg0NjQ4ZGYxY2Q4ODk1ZmE4NTI2NDUyZjM3MjVjOTNjXHJcblxyXG4vLyBzaG91bGQga2VlcCBBUEkgS2V5IGluIGJhY2stZW5kIG9uY2UgbGVhcm4gaG93IHRvXHJcbmNvbnN0IEFQSUtleSA9ICc4NDY0OGRmMWNkODg5NWZhODUyNjQ1MmYzNzI1YzkzYyc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRDb29yZHMgKHtjaXR5LCBzdGF0ZSwgY291bnRyeX0gPSB7fSl7XHJcbiAgY29uc3Qgb2JqID0ge2NpdHksIHN0YXRlLCBjb3VudHJ5fTtcclxuICBsZXQgYXBpTG9jYXRpb25TdHJpbmcgPSAnJztcclxuICBPYmplY3QudmFsdWVzKG9iaikuZm9yRWFjaCh2YWwgPT4ge1xyXG4gICAgaWYodmFsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYoYXBpTG9jYXRpb25TdHJpbmcgPT09ICcnKXtcclxuICAgICAgICBhcGlMb2NhdGlvblN0cmluZyA9IHZhbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcGlMb2NhdGlvblN0cmluZyA9IGAke2FwaUxvY2F0aW9uU3RyaW5nfSwke3ZhbH1gOyBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHthcGlMb2NhdGlvblN0cmluZ30mbGltaXQ9MSZhcHBpZD0ke0FQSUtleX1gLCB7bW9kZTogJ2NvcnMnfSk7XHJcbiAgY29uc3QgY29vcmRpbmF0ZXNEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzID0ge1xyXG4gICAgbGF0aXR1ZGU6IGNvb3JkaW5hdGVzRGF0YVswXS5sYXQsXHJcbiAgICBsb25naXR1ZGU6IGNvb3JkaW5hdGVzRGF0YVswXS5sb25cclxuICB9XHJcbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyICh7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB7fSl7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHtBUElLZXl9YCwge21vZGU6ICdjb3JzJ30pO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IHJlbGV2YW50V2VhdGhlckRhdGEgPSB7XHJcbiAgICBsb2NhdGlvbjogd2VhdGhlckRhdGEubmFtZSxcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyAlXHJcbiAgICBodW1pZGl0eTogd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eSxcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyBrZWx2aW5cclxuICAgIHRlbXBlcmF0dXJlOiB3ZWF0aGVyRGF0YS5tYWluLnRlbXAsXHJcbiAgICBtYXhfdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcF9tYXgsXHJcbiAgICBtaW5fdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcF9taW4sXHJcbiAgICAvLyBkZWZhdWx0IHVuaXQgaXMgbS9zXHJcbiAgICB3aW5kX3NwZWVkOiB3ZWF0aGVyRGF0YS53aW5kLnNwZWVkLFxyXG4gICAgLy8gdGltZXpvbmUgaXMgaW4gc2Vjb25kcyB2YXIgZCA9IG5ldyBEYXRlKChuZXcgRGF0ZSgpLmdldFRpbWUoKSktMjUyMDAqMTAwMClcclxuICAgIC8vIGQudG9JU09TdHJpbmcoKVxyXG4gICAgdGltZTogd2VhdGhlckRhdGEuZHQsXHJcbiAgICBkZXNjcmlwdGlvbjogd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvblxyXG4gIH1cclxuICByZXR1cm4gcmVsZXZhbnRXZWF0aGVyRGF0YTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5TmFtZShkYXRlU3RyLCBsb2NhbGUpXHJcbntcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyKTtcclxuICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pOyAgICAgICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFdlYXRoZXJJY29uRE9NKHdlYXRoZXIpe1xyXG4gIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgc3dpdGNoKHdlYXRoZXIpe1xyXG4gICAgY2FzZSAnQ2xlYXInOlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc3VuJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnQ2xvdWRzJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWNsb3VkJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnVGh1bmRlcnN0b3JtJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWNsb3VkLWJvbHQnLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdEcml6emxlJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWNsb3VkLXN1bi1yYWluJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnUmFpbic6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1jbG91ZC1yYWluJywnYmlnJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnU25vdyc6XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1zbm93Zmxha2UnLCdiaWcnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdUb3JuYWRvJzpcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXRvcm5hZG8nLCdiaWcnKTtcclxuICAgICAgYnJlYWs7ICAgICAgXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc21vZycsJ2JpZycpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgcmV0dXJuIGljb247XHJcbn1cclxuXHJcbi8vIHRoZSBvbmx5IGZyZWUgQVBJIGNhbGwgZm9yIGZvcmVjYXN0IGlzIDUgZGF5LCAzIGhvdXIgcGVyaW9kc1xyXG5hc3luYyBmdW5jdGlvbiBnZXQ1RGF5V2VhdGhlcih7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB7fSl7XHJcbiAgLy8gVE8tRE8gYXBpIGNhbGwgaXMgaW52YWxpZCBiZWNhdXNlIGl0J3Mgbm90IGZyZWUsIG5lZWQgdG8gdXNlIHRoZSA1IGRheSBvbmVcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHtBUElLZXl9YCwge21vZGU6ICdjb3JzJ30pO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhQXJyYXkgPSB3ZWF0aGVyRGF0YS5saXN0O1xyXG4gIGNvbnN0IHJlbGV2YW50V2VhdGhlckRhdGFBcnJheSA9IFtdO1xyXG5cclxuICAvLyBjbGVhbiB1cCB0aGUgd2VhdGhlciBkYXRhIGFycmF5IHRvIG9ubHkgZ2V0IHJlbGV2YW50IHZhbHVlc1xyXG4gIHdlYXRoZXJEYXRhQXJyYXkuZm9yRWFjaChyYXdEYXRhT2JqID0+IHtcclxuICAgIGNvbnN0IGRheSA9IGdldERheU5hbWUocmF3RGF0YU9iai5kdF90eHQuc3Vic3RyaW5nKDAsMTApLCBcImVuLVVTXCIpO1xyXG4gICAgY29uc3QgbWF4VGVtcGVyYXR1cmUgPSByYXdEYXRhT2JqLm1haW4udGVtcF9tYXg7XHJcbiAgICBjb25zdCBtaW5UZW1wZXJhdHVyZSA9IHJhd0RhdGFPYmoubWFpbi50ZW1wX21pbjtcclxuICAgIC8vIHdlYXRoZXIgaGFzIHBvdGVudGlhbCB2YWx1ZXMgVGh1bmRlcnN0b3JtLCBEcml6emxlLCBSYWluLCBTbm93LCBBIGxvdCBvZiBEaWZmZXJlbnQgQXRtb3NwaGVyZSBPbmVzLCBDbGVhciwgQ2xvdWRzXHJcbiAgICBjb25zdCB3ZWF0aGVyID0gcmF3RGF0YU9iai53ZWF0aGVyWzBdLm1haW47XHJcbiAgICBsZXQgaW5zaWRlQXJyYXkgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgLy8gbXV0YXRlIG1pbiwgbWF4IHRlbXBlcmF0dXJlLCB3ZWF0aGVyIGlmIG9iamVjdCBpcyBhbHJlYWR5IGluIGFycmF5XHJcbiAgICByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkuZm9yRWFjaChyZWxldmFudE9iaiA9PiB7XHJcbiAgICAgIGlmKGRheSA9PT0gcmVsZXZhbnRPYmouZGF5KXtcclxuICAgICAgICByZWxldmFudE9iai5tYXhUZW1wZXJhdHVyZSA9IE1hdGgubWF4KHJlbGV2YW50T2JqLm1heFRlbXBlcmF0dXJlLCBtYXhUZW1wZXJhdHVyZSk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgcmVsZXZhbnRPYmoubWluVGVtcGVyYXR1cmUgPSBNYXRoLm1pbihyZWxldmFudE9iai5taW5UZW1wZXJhdHVyZSwgbWluVGVtcGVyYXR1cmUpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIGlmKChyZWxldmFudE9iai53ZWF0aGVyID09PSAnQ2xlYXInIHx8IHJlbGV2YW50T2JqLndlYXRoZXIgPT09ICdDbG91ZHMnKSAmJlxyXG4gICAgICAgICAgKCEod2VhdGhlciA9PT0gJ0NsZWFyJyB8fCB3ZWF0aGVyID09PSAnQ2xvdWRzJykpKXtcclxuICAgICAgICAgICAgcmVsZXZhbnRPYmoud2VhdGhlciA9IHdlYXRoZXI7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluc2lkZUFycmF5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIFxyXG4gICAgaWYoIWluc2lkZUFycmF5KXtcclxuICAgICAgcmVsZXZhbnRXZWF0aGVyRGF0YUFycmF5LnB1c2goe2RheSwgbWF4VGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlLCB3ZWF0aGVyfSlcclxuICAgIH1cclxuICB9KVxyXG5cclxuICByZWxldmFudFdlYXRoZXJEYXRhQXJyYXkuZm9yRWFjaChkYXRhID0+IHtcclxuICAgIGRhdGEud2VhdGhlckljb25ET00gPSBnZXRXZWF0aGVySWNvbkRPTShkYXRhLndlYXRoZXIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIHJlbGV2YW50V2VhdGhlckRhdGFBcnJheTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEgKGxvY2F0aW9uT2JqKXtcclxuICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihhd2FpdCBnZXRDb29yZHMobG9jYXRpb25PYmopKTtcclxuICByZXR1cm4gd2VhdGhlcjtcclxufVxyXG4gXHJcbmFzeW5jIGZ1bmN0aW9uIGdldDVEYXlXZWF0aGVyRGF0YSAobG9jYXRpb25PYmope1xyXG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBnZXQ1RGF5V2VhdGhlcihhd2FpdCBnZXRDb29yZHMobG9jYXRpb25PYmopKTtcclxuICByZXR1cm4gd2VhdGhlcjtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRXZWF0aGVyRGF0YSwgZ2V0NURheVdlYXRoZXJEYXRhfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVSSBmcm9tICcuL1VJJ1xyXG5cclxuLy8gY3JlYXRlcyB0aGUgd2VhdGhlciBwYWdlXHJcbmNvbnN0IG1haW4gPSBmdW5jdGlvbiBkb0FsbE9wZXJhdGlvbnMoKXtcclxuICBjb25zdCBpbml0aWFsTG9jYXRpb24gPSB7XHJcbiAgICBjaXR5OiAnU2FuIEZyYW5jaXNjbydcclxuICB9XHJcbiAgVUkuaW5pdGlhbFJlbmRlcihpbml0aWFsTG9jYXRpb24pO1xyXG59XHJcblxyXG5tYWluKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9