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
    if(apiLocationString === ''){
      apiLocationString = val;
    } else {
      apiLocationString = `${apiLocationString},${val}`; 
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
  return weatherData;
}

async function main (){
  const testObj = {
    city: 'Torrance',
    state: 'California',
    country: 'USA'
  };
  const weather = await getWeather(await getCoords(testObj));
  console.log(weather);
}

main();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0JBQXNCLElBQUk7QUFDckQsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLDZCQUE2QixrQkFBa0IsR0FBRyxJQUFJO0FBQ3REO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUZBQWlGLGtCQUFrQixpQkFBaUIsT0FBTyxJQUFJLGFBQWE7QUFDNUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixxQkFBcUIsSUFBSTtBQUNyRCxzRkFBc0YsU0FBUyxPQUFPLFVBQVUsU0FBUyxPQUFPLElBQUksYUFBYTtBQUNqSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gIGFwaSBrZXkgZm9yIG9wZW4gd2VhdGhlciBhcGkgaXMgODQ2NDhkZjFjZDg4OTVmYTg1MjY0NTJmMzcyNWM5M2NcclxuXHJcbi8vIHNob3VsZCBrZWVwIEFQSSBLZXkgaW4gYmFjay1lbmQgb25jZSBsZWFybiBob3cgdG9cclxuY29uc3QgQVBJS2V5ID0gJzg0NjQ4ZGYxY2Q4ODk1ZmE4NTI2NDUyZjM3MjVjOTNjJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldENvb3JkcyAoe2NpdHksIHN0YXRlLCBjb3VudHJ5fSA9IHt9KXtcclxuICBjb25zdCBvYmogPSB7Y2l0eSwgc3RhdGUsIGNvdW50cnl9O1xyXG4gIGxldCBhcGlMb2NhdGlvblN0cmluZyA9ICcnO1xyXG4gIE9iamVjdC52YWx1ZXMob2JqKS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICBpZihhcGlMb2NhdGlvblN0cmluZyA9PT0gJycpe1xyXG4gICAgICBhcGlMb2NhdGlvblN0cmluZyA9IHZhbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFwaUxvY2F0aW9uU3RyaW5nID0gYCR7YXBpTG9jYXRpb25TdHJpbmd9LCR7dmFsfWA7IFxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHthcGlMb2NhdGlvblN0cmluZ30mbGltaXQ9MSZhcHBpZD0ke0FQSUtleX1gLCB7bW9kZTogJ2NvcnMnfSk7XHJcbiAgY29uc3QgY29vcmRpbmF0ZXNEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzID0ge1xyXG4gICAgbGF0aXR1ZGU6IGNvb3JkaW5hdGVzRGF0YVswXS5sYXQsXHJcbiAgICBsb25naXR1ZGU6IGNvb3JkaW5hdGVzRGF0YVswXS5sb25cclxuICB9XHJcbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyICh7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB7fSl7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHtBUElLZXl9YCwge21vZGU6ICdjb3JzJ30pO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIHJldHVybiB3ZWF0aGVyRGF0YTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbiAoKXtcclxuICBjb25zdCB0ZXN0T2JqID0ge1xyXG4gICAgY2l0eTogJ1RvcnJhbmNlJyxcclxuICAgIHN0YXRlOiAnQ2FsaWZvcm5pYScsXHJcbiAgICBjb3VudHJ5OiAnVVNBJ1xyXG4gIH07XHJcbiAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGdldFdlYXRoZXIoYXdhaXQgZ2V0Q29vcmRzKHRlc3RPYmopKTtcclxuICBjb25zb2xlLmxvZyh3ZWF0aGVyKTtcclxufVxyXG5cclxubWFpbigpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=