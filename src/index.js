import UI from './UI'

// creates the weather page
const main = function doAllOperations(){
  const initialLocation = {
    city: 'San Francisco'
  }
  UI.initialRender(initialLocation);
}

main();