import convertUnits from "./unitConversion";

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
      text: this.isFahrenheit ? `${convertUnits.kToF(this.maxTemperature)}°` : `${convertUnits.kToC(this.maxTemperature)}°`
    })

    const lowTemperature = createTag({
      element: 'h2',
      classes: ['normal-header','low-temperature'],
      text: this.isFahrenheit ? `${convertUnits.kToF(this.minTemperature)}°` : `${convertUnits.kToC(this.minTemperature)}°`
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

export default FutureWeather;
