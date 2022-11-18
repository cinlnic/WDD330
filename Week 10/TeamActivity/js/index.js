import QuakesController from './QuakesController.js';

const myQuakesController = new QuakesController('#quakeList');
myQuakesController.init();


// import { getJSON, getLocation } from "./utilities.js";

// const baseUrl =
//   "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02";

// async function testGetQuakesForLocation() {
//   // call the getLocation function to get the lat/long
//   const location = await getLocation();
//   debugger;
//   console.log(location);

//   // use that information to build out the correct URL
//   const geoUrl =
//     baseUrl +
//     `&latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&maxradiuskm=100`; // add location information here
//   // use the url to request the correct quakes
//   const response = await getJSON(geoUrl);
//   debugger;
//   console.log(response);
//   return {
//     response,
//     location,
//   };
//   //log out the quakes for now.
// }

// testGetQuakesForLocation()
//   .then((res) => {
//     debugger;
//     console.log(res);
//   })
//   .catch(console.log);
