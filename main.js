/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
    time: weatherData.timezone,
    description: weatherData.weather[0].description
  }
  return relevantWeatherData;
}

async function main (locationObj){
  const weather = await getWeather(await getCoords(locationObj));
  console.log(weather);
}

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
  main(locationObj);
  event.preventDefault();
})

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0JBQXNCLElBQUk7QUFDckQsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsK0JBQStCLGtCQUFrQixHQUFHLElBQUk7QUFDeEQ7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGlGQUFpRixrQkFBa0IsaUJBQWlCLE9BQU8sSUFBSSxhQUFhO0FBQzVJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscUJBQXFCLElBQUk7QUFDckQsc0ZBQXNGLFNBQVMsT0FBTyxVQUFVLFNBQVMsT0FBTyxJQUFJLGFBQWE7QUFDako7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gIGFwaSBrZXkgZm9yIG9wZW4gd2VhdGhlciBhcGkgaXMgODQ2NDhkZjFjZDg4OTVmYTg1MjY0NTJmMzcyNWM5M2NcclxuXHJcbi8vIHNob3VsZCBrZWVwIEFQSSBLZXkgaW4gYmFjay1lbmQgb25jZSBsZWFybiBob3cgdG9cclxuY29uc3QgQVBJS2V5ID0gJzg0NjQ4ZGYxY2Q4ODk1ZmE4NTI2NDUyZjM3MjVjOTNjJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldENvb3JkcyAoe2NpdHksIHN0YXRlLCBjb3VudHJ5fSA9IHt9KXtcclxuICBjb25zdCBvYmogPSB7Y2l0eSwgc3RhdGUsIGNvdW50cnl9O1xyXG4gIGxldCBhcGlMb2NhdGlvblN0cmluZyA9ICcnO1xyXG4gIE9iamVjdC52YWx1ZXMob2JqKS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICBpZih2YWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZihhcGlMb2NhdGlvblN0cmluZyA9PT0gJycpe1xyXG4gICAgICAgIGFwaUxvY2F0aW9uU3RyaW5nID0gdmFsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFwaUxvY2F0aW9uU3RyaW5nID0gYCR7YXBpTG9jYXRpb25TdHJpbmd9LCR7dmFsfWA7IFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2FwaUxvY2F0aW9uU3RyaW5nfSZsaW1pdD0xJmFwcGlkPSR7QVBJS2V5fWAsIHttb2RlOiAnY29ycyd9KTtcclxuICBjb25zdCBjb29yZGluYXRlc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSB7XHJcbiAgICBsYXRpdHVkZTogY29vcmRpbmF0ZXNEYXRhWzBdLmxhdCxcclxuICAgIGxvbmdpdHVkZTogY29vcmRpbmF0ZXNEYXRhWzBdLmxvblxyXG4gIH1cclxuICByZXR1cm4gY29vcmRpbmF0ZXM7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIgKHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHt9KXtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtsYXRpdHVkZX0mbG9uPSR7bG9uZ2l0dWRlfSZhcHBpZD0ke0FQSUtleX1gLCB7bW9kZTogJ2NvcnMnfSk7XHJcbiAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc3QgcmVsZXZhbnRXZWF0aGVyRGF0YSA9IHtcclxuICAgIGxvY2F0aW9uOiB3ZWF0aGVyRGF0YS5uYW1lLFxyXG4gICAgLy8gZGVmYXVsdCB1bml0IGlzICVcclxuICAgIGh1bWlkaXR5OiB3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5LFxyXG4gICAgLy8gZGVmYXVsdCB1bml0IGlzIGtlbHZpblxyXG4gICAgdGVtcGVyYXR1cmU6IHdlYXRoZXJEYXRhLm1haW4udGVtcCxcclxuICAgIG1heF90ZW1wZXJhdHVyZTogd2VhdGhlckRhdGEubWFpbi50ZW1wX21heCxcclxuICAgIG1pbl90ZW1wZXJhdHVyZTogd2VhdGhlckRhdGEubWFpbi50ZW1wX21pbixcclxuICAgIC8vIGRlZmF1bHQgdW5pdCBpcyBtL3NcclxuICAgIHdpbmRfc3BlZWQ6IHdlYXRoZXJEYXRhLndpbmQuc3BlZWQsXHJcbiAgICAvLyB0aW1lem9uZSBpcyBpbiBzZWNvbmRzIHZhciBkID0gbmV3IERhdGUoKG5ldyBEYXRlKCkuZ2V0VGltZSgpKS0yNTIwMCoxMDAwKVxyXG4gICAgLy8gZC50b0lTT1N0cmluZygpXHJcbiAgICB0aW1lOiB3ZWF0aGVyRGF0YS50aW1lem9uZSxcclxuICAgIGRlc2NyaXB0aW9uOiB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uXHJcbiAgfVxyXG4gIHJldHVybiByZWxldmFudFdlYXRoZXJEYXRhO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBtYWluIChsb2NhdGlvbk9iail7XHJcbiAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXIoYXdhaXQgZ2V0Q29vcmRzKGxvY2F0aW9uT2JqKSk7XHJcbiAgY29uc29sZS5sb2cod2VhdGhlcik7XHJcbn1cclxuXHJcbmNvbnN0IGxvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbi1mb3JtJyk7XHJcbmxvY2F0aW9uRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICBjb25zdCBsb2NhdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJyk7XHJcbiAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbklucHV0LnZhbHVlO1xyXG4gIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBsb2NhdGlvbi5zcGxpdCgnLCAnKTtcclxuICBjb25zdCBsb2NhdGlvbk9iaiA9IHt9O1xyXG4gIGxvY2F0aW9uQXJyYXkuZm9yRWFjaCgocHJvcGVydHksIGluZGV4KSA9PiB7XHJcbiAgICBpZihpbmRleCA9PT0gMCl7XHJcbiAgICAgIGxvY2F0aW9uT2JqLmNpdHkgPSBwcm9wZXJ0eTtcclxuICAgIH0gZWxzZSBpZihpbmRleCA9PT0gMSl7XHJcbiAgICAgIGxvY2F0aW9uT2JqLnN0YXRlID0gcHJvcGVydHk7XHJcbiAgICB9IGVsc2UgaWYoaW5kZXggPT09IDIpe1xyXG4gICAgICBsb2NhdGlvbk9iai5jb3VudHJ5ID0gcHJvcGVydHk7XHJcbiAgICB9XHJcbiAgfSlcclxuICBtYWluKGxvY2F0aW9uT2JqKTtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG59KVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=