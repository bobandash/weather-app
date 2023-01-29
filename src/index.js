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
