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
    currentTemperature.innerText = `${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.temperature)}°F`;
    currentHighTemperature.innerText = `High: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.max_temperature)}°F`;
    currentLowTemperature.innerText = `Low: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].kToF(currWeatherData.min_temperature)}°F`;
    currentHumidity.innerText = `Humidity: ${currWeatherData.humidity}%`;
    currentWind.innerText = `Wind: ${_unitConversion__WEBPACK_IMPORTED_MODULE_1__["default"].mToMi(currWeatherData.wind_speed)} mph`;


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
      const currWeatherDataPromise = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(locationObj);
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
    const currWeatherDataPromise = (0,_weatherAPICall__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(
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
/* harmony export */   "get7DayWeatherData": () => (/* binding */ get7DayWeatherData),
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

async function get7DayWeather({latitude, longitude} = {}){
  const response = await fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=${APIKey}`);
  const weatherData = await response.json();
  const weatherDataList = weatherData.list;
  const relevantWeatherData = [];
  for(let i = 0; i < 7; i += 1){
    const relevantValuesInDataList = {
      time: weatherDataList[i].dt,
      max_temperature: weatherDataList[i].temp.max,
      min_temperature: weatherDataList[i].temp.min,
      weather: weatherDataList[i].weather.main
    }
    relevantWeatherData.push(relevantValuesInDataList);
  }
  return relevantWeatherData;
}

async function getWeatherData (locationObj){
  const weather = await getWeather(await getCoords(locationObj));
  return weather;
}
 
async function get7DayWeatherData (locationObj){
  const weather = await get7DayWeather(await getCoords(locationObj));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsRUFBRSx5REFBZ0I7QUFDbEI7QUFDQTtBQUNBLE8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuaXRDb252ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWF0aGVyQVBJQ2FsbC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQge2dldFdlYXRoZXJEYXRhLCBnZXQ3RGF5V2VhdGhlckRhdGF9IGZyb20gJy4vd2VhdGhlckFQSUNhbGwnO1xyXG5pbXBvcnQgY29udmVydFVuaXRzIGZyb20gJy4vdW5pdENvbnZlcnNpb24nO1xyXG5cclxuLy8gaHRtbCBoZWxwZXIgZnVuY3Rpb25zXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigge2VsZW1lbnQsIGNsYXNzZXMsIGlkZW50aWZpZXIsIGNoaWxkRWxlbWVudHMsIGN1c3RvbUF0dHJpYnV0ZX0pe1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gIGlmKGNsYXNzZXMpe1xyXG4gICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gIH1cclxuICBpZihpZGVudGlmaWVyKXtcclxuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICB9XHJcbiAgaWYoY2hpbGRFbGVtZW50cyl7XHJcbiAgICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaChpdGVtID0+IG5vZGUuYXBwZW5kQ2hpbGQoaXRlbSkpXHJcbiAgfVxyXG4gIGlmKGN1c3RvbUF0dHJpYnV0ZSl7XHJcbiAgICAgIGlmKGN1c3RvbUF0dHJpYnV0ZS5sZW5ndGggPiAxKXtcclxuICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGN1c3RvbUF0dHJpYnV0ZVswXSwgY3VzdG9tQXR0cmlidXRlWzFdKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRhZygge2VsZW1lbnQsIHRleHQsIGNsYXNzZXMsIGlkZW50aWZpZXJ9KXtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICBpZihjbGFzc2VzKXtcclxuICAgICAgY2xhc3Nlcy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGl0ZW0pKTtcclxuICB9XHJcbiAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdpZCcsaWRlbnRpZmllcik7XHJcbiAgfVxyXG4gIGlmKHRleHQpe1xyXG4gICAgICBub2RlLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5cclxuY29uc3QgVUkgPSBmdW5jdGlvbiBjcmVhdGVVSSAoKXtcclxuXHJcbiAgY29uc3QgY2hhbmdlV2VhdGhlckRhdGEgPSBmdW5jdGlvbiBjaGFuZ2VDdXJyZW50V2VhdGhlckRhdGFUb01hdGNoRE9NKGN1cnJXZWF0aGVyRGF0YSl7XHJcbiAgICAvLyBnZXRzIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBuZWVkIHRvIGJlIGNoYW5nZWRcclxuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtd2VhdGhlcl0nKTtcclxuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbkRPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxvY2F0aW9uXScpO1xyXG4gICAgY29uc3QgY3VycmVudFRpbWVET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10aW1lXScpO1xyXG4gICAgY29uc3QgY3VycmVudFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC10ZW1wZXJhdHVyZScpO1xyXG4gICAgY29uc3QgY3VycmVudEhpZ2hUZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWN1cnJlbnQtaGlnaCcpO1xyXG4gICAgY29uc3QgY3VycmVudExvd1RlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC1sb3cnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC13aW5kJyk7XHJcbiAgICBjb25zdCBjdXJyZW50SHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jdXJyZW50LWh1bWlkaXR5Jyk7XHJcblxyXG4gICAgY3VycmVudFdlYXRoZXJET00uaW5uZXJUZXh0ID0gY3VycldlYXRoZXJEYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgY3VycmVudExvY2F0aW9uRE9NLmlubmVyVGV4dCA9IGN1cnJXZWF0aGVyRGF0YS5sb2NhdGlvbjtcclxuICAgIGN1cnJlbnRUaW1lRE9NLmlubmVyVGV4dCA9IGN1cnJXZWF0aGVyRGF0YS50aW1lO1xyXG4gICAgY3VycmVudFRlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGAke2NvbnZlcnRVbml0cy5rVG9GKGN1cnJXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgIGN1cnJlbnRIaWdoVGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gYEhpZ2g6ICR7Y29udmVydFVuaXRzLmtUb0YoY3VycldlYXRoZXJEYXRhLm1heF90ZW1wZXJhdHVyZSl9wrBGYDtcclxuICAgIGN1cnJlbnRMb3dUZW1wZXJhdHVyZS5pbm5lclRleHQgPSBgTG93OiAke2NvbnZlcnRVbml0cy5rVG9GKGN1cnJXZWF0aGVyRGF0YS5taW5fdGVtcGVyYXR1cmUpfcKwRmA7XHJcbiAgICBjdXJyZW50SHVtaWRpdHkuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke2N1cnJXZWF0aGVyRGF0YS5odW1pZGl0eX0lYDtcclxuICAgIGN1cnJlbnRXaW5kLmlubmVyVGV4dCA9IGBXaW5kOiAke2NvbnZlcnRVbml0cy5tVG9NaShjdXJyV2VhdGhlckRhdGEud2luZF9zcGVlZCl9IG1waGA7XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKGN1cnJXZWF0aGVyRGF0YSk7XHJcbiAgICAvLyBjdXJyZW50V2VhdGhlckRPTS5pbm5lclRleHQgPSBjdXJyV2VhdGhlckRhdGEuZGVzY3JpcHRpb247XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTG9jYXRpb25Gb3JtRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIGNvbnN0IGxvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbi1mb3JtJyk7XHJcbiAgICBsb2NhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24nKTtcclxuICAgICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbklucHV0LnZhbHVlO1xyXG4gICAgICBjb25zdCBsb2NhdGlvbkFycmF5ID0gbG9jYXRpb24uc3BsaXQoJywgJyk7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uT2JqID0ge307XHJcbiAgICAgIGxvY2F0aW9uQXJyYXkuZm9yRWFjaCgocHJvcGVydHksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoaW5kZXggPT09IDApe1xyXG4gICAgICAgICAgbG9jYXRpb25PYmouY2l0eSA9IHByb3BlcnR5O1xyXG4gICAgICAgIH0gZWxzZSBpZihpbmRleCA9PT0gMSl7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5zdGF0ZSA9IHByb3BlcnR5O1xyXG4gICAgICAgIH0gZWxzZSBpZihpbmRleCA9PT0gMil7XHJcbiAgICAgICAgICBsb2NhdGlvbk9iai5jb3VudHJ5ID0gcHJvcGVydHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBjb25zdCBjdXJyV2VhdGhlckRhdGFQcm9taXNlID0gZ2V0V2VhdGhlckRhdGEobG9jYXRpb25PYmopO1xyXG4gICAgICAvLyBjaGFuZ2UgdGhlIHByb21pc2UgdG8gYW4gb2JqZWN0XHJcbiAgICAgIGN1cnJXZWF0aGVyRGF0YVByb21pc2UudGhlbigoY3VycldlYXRoZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgY2hhbmdlV2VhdGhlckRhdGEoY3VycldlYXRoZXJEYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIFRPLURPIGVtcHR5IGZvcm0gdmFsdWUgaWYgc3VjY2Vzc2Z1bDsgb3RoZXJ3aXNlIHdyaXRlIGVycm9yXHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcblxyXG5cclxuICBmdW5jdGlvbiBpbml0aWFsUmVuZGVyKCl7XHJcbiAgICBhZGRMb2NhdGlvbkZvcm1GdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgLy8gaW5pdGlhbGx5IHJlbmRlciBTYW4gRnJhbmNpc2NvXHJcbiAgICBjb25zdCBjdXJyV2VhdGhlckRhdGFQcm9taXNlID0gZ2V0V2VhdGhlckRhdGEoXHJcbiAgICAgIHtjaXR5OiBcIlNhbiBGcmFuY2lzY29cIn1cclxuICAgICk7XHJcbiAgICAvLyBjaGFuZ2UgdGhlIHByb21pc2UgdG8gYW4gb2JqZWN0XHJcbiAgICBjdXJyV2VhdGhlckRhdGFQcm9taXNlLnRoZW4oKGN1cnJXZWF0aGVyRGF0YSkgPT4ge1xyXG4gICAgICBjaGFuZ2VXZWF0aGVyRGF0YShjdXJyV2VhdGhlckRhdGEpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyTmV3TG9jYXRpb24od2VhdGhlckRhdGEpe1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiB7aW5pdGlhbFJlbmRlciwgcmVuZGVyTmV3TG9jYXRpb259O1xyXG5cclxufSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVUk7IiwiY29uc3QgY29udmVydFVuaXRzID0gKCgpID0+IHtcclxuICBjb25zdCBrVG9DID0gZnVuY3Rpb24ga2VsdmluVG9DZWxzaXVzKGtlbHZpbikge1xyXG4gICAgcmV0dXJuIChrZWx2aW4gLSAyNzMuMTUpLnRvRml4ZWQoMCk7XHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IGtUb0YgPSBmdW5jdGlvbiBrZWx2aW5Ub0ZhaHJlbmhlaXQoa2VsdmluKSB7XHJcbiAgICByZXR1cm4gKDEuOCooa2VsdmluIC0gMjczKSszMikudG9GaXhlZCgwKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1Ub01pID0gZnVuY3Rpb24gbWV0ZXJzVG9NaWxlcyhtZXRlcnMpe1xyXG4gICAgY29uc3QgbWkgPSAobWV0ZXJzLzE2MDkuMzQ0KS50b0ZpeGVkKDEpO1xyXG4gICAgaWYobWkgPT09IFwiMC4wXCIpe1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBtaTtcclxuICB9XHJcblxyXG4gIC8vIFRPLURPIC0gVU5JWCBUSU1FIFRPIExPQ0FMIFRJTUUgSU4gVEhBVCBUSU1FIFpPTkVcclxuXHJcbiAgcmV0dXJuIHtrVG9DLCBrVG9GLCBtVG9NaX07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0VW5pdHM7IiwiLy8gIGFwaSBrZXkgZm9yIG9wZW4gd2VhdGhlciBhcGkgaXMgODQ2NDhkZjFjZDg4OTVmYTg1MjY0NTJmMzcyNWM5M2NcclxuXHJcbi8vIHNob3VsZCBrZWVwIEFQSSBLZXkgaW4gYmFjay1lbmQgb25jZSBsZWFybiBob3cgdG9cclxuY29uc3QgQVBJS2V5ID0gJzg0NjQ4ZGYxY2Q4ODk1ZmE4NTI2NDUyZjM3MjVjOTNjJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldENvb3JkcyAoe2NpdHksIHN0YXRlLCBjb3VudHJ5fSA9IHt9KXtcclxuICBjb25zdCBvYmogPSB7Y2l0eSwgc3RhdGUsIGNvdW50cnl9O1xyXG4gIGxldCBhcGlMb2NhdGlvblN0cmluZyA9ICcnO1xyXG4gIE9iamVjdC52YWx1ZXMob2JqKS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICBpZih2YWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZihhcGlMb2NhdGlvblN0cmluZyA9PT0gJycpe1xyXG4gICAgICAgIGFwaUxvY2F0aW9uU3RyaW5nID0gdmFsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFwaUxvY2F0aW9uU3RyaW5nID0gYCR7YXBpTG9jYXRpb25TdHJpbmd9LCR7dmFsfWA7IFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2FwaUxvY2F0aW9uU3RyaW5nfSZsaW1pdD0xJmFwcGlkPSR7QVBJS2V5fWAsIHttb2RlOiAnY29ycyd9KTtcclxuICBjb25zdCBjb29yZGluYXRlc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSB7XHJcbiAgICBsYXRpdHVkZTogY29vcmRpbmF0ZXNEYXRhWzBdLmxhdCxcclxuICAgIGxvbmdpdHVkZTogY29vcmRpbmF0ZXNEYXRhWzBdLmxvblxyXG4gIH1cclxuICByZXR1cm4gY29vcmRpbmF0ZXM7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIgKHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHt9KXtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtsYXRpdHVkZX0mbG9uPSR7bG9uZ2l0dWRlfSZhcHBpZD0ke0FQSUtleX1gLCB7bW9kZTogJ2NvcnMnfSk7XHJcbiAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc3QgcmVsZXZhbnRXZWF0aGVyRGF0YSA9IHtcclxuICAgIGxvY2F0aW9uOiB3ZWF0aGVyRGF0YS5uYW1lLFxyXG4gICAgLy8gZGVmYXVsdCB1bml0IGlzICVcclxuICAgIGh1bWlkaXR5OiB3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5LFxyXG4gICAgLy8gZGVmYXVsdCB1bml0IGlzIGtlbHZpblxyXG4gICAgdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcCxcclxuICAgIG1heF90ZW1wZXJhdHVyZTogd2VhdGhlckRhdGEubWFpbi50ZW1wX21heCxcclxuICAgIG1pbl90ZW1wZXJhdHVyZTogd2VhdGhlckRhdGEubWFpbi50ZW1wX21pbixcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyBtL3NcclxuICAgIHdpbmRfc3BlZWQ6IHdlYXRoZXJEYXRhLndpbmQuc3BlZWQsXHJcbiAgICAvLyB0aW1lem9uZSBpcyBpbiBzZWNvbmRzIHZhciBkID0gbmV3IERhdGUoKG5ldyBEYXRlKCkuZ2V0VGltZSgpKS0yNTIwMCoxMDAwKVxyXG4gICAgLy8gZC50b0lTT1N0cmluZygpXHJcbiAgICB0aW1lOiB3ZWF0aGVyRGF0YS5kdCxcclxuICAgIGRlc2NyaXB0aW9uOiB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uXHJcbiAgfVxyXG4gIHJldHVybiByZWxldmFudFdlYXRoZXJEYXRhO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXQ3RGF5V2VhdGhlcih7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB7fSl7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdC9kYWlseT9sYXQ9JHtsYXRpdHVkZX0mbG9uPSR7bG9uZ2l0dWRlfSZjbnQ9NyZhcHBpZD0ke0FQSUtleX1gKTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YUxpc3QgPSB3ZWF0aGVyRGF0YS5saXN0O1xyXG4gIGNvbnN0IHJlbGV2YW50V2VhdGhlckRhdGEgPSBbXTtcclxuICBmb3IobGV0IGkgPSAwOyBpIDwgNzsgaSArPSAxKXtcclxuICAgIGNvbnN0IHJlbGV2YW50VmFsdWVzSW5EYXRhTGlzdCA9IHtcclxuICAgICAgdGltZTogd2VhdGhlckRhdGFMaXN0W2ldLmR0LFxyXG4gICAgICBtYXhfdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhTGlzdFtpXS50ZW1wLm1heCxcclxuICAgICAgbWluX3RlbXBlcmF0dXJlOiB3ZWF0aGVyRGF0YUxpc3RbaV0udGVtcC5taW4sXHJcbiAgICAgIHdlYXRoZXI6IHdlYXRoZXJEYXRhTGlzdFtpXS53ZWF0aGVyLm1haW5cclxuICAgIH1cclxuICAgIHJlbGV2YW50V2VhdGhlckRhdGEucHVzaChyZWxldmFudFZhbHVlc0luRGF0YUxpc3QpO1xyXG4gIH1cclxuICByZXR1cm4gcmVsZXZhbnRXZWF0aGVyRGF0YTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEgKGxvY2F0aW9uT2JqKXtcclxuICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihhd2FpdCBnZXRDb29yZHMobG9jYXRpb25PYmopKTtcclxuICByZXR1cm4gd2VhdGhlcjtcclxufVxyXG4gXHJcbmFzeW5jIGZ1bmN0aW9uIGdldDdEYXlXZWF0aGVyRGF0YSAobG9jYXRpb25PYmope1xyXG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBnZXQ3RGF5V2VhdGhlcihhd2FpdCBnZXRDb29yZHMobG9jYXRpb25PYmopKTtcclxuICByZXR1cm4gd2VhdGhlcjtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRXZWF0aGVyRGF0YSwgZ2V0N0RheVdlYXRoZXJEYXRhfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVSSBmcm9tICcuL1VJJ1xyXG5cclxuLy8gY3JlYXRlcyB0aGUgd2VhdGhlciBwYWdlXHJcbmNvbnN0IG1haW4gPSBmdW5jdGlvbiBkb0FsbE9wZXJhdGlvbnMoKXtcclxuICBVSS5pbml0aWFsUmVuZGVyKCk7XHJcbn1cclxuXHJcbm1haW4oKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=