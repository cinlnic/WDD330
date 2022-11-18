import { getJSON, getLocation } from "./utilities.js";

export default class Quake {
  constructor() {
    this.baseUrl =
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02";
    this._quakes = [];
  }
  async getEarthQuakesByRadius(position, radius = 100) {
    
    return this._quakes;
  }
  getQuakeById(id) {
    return this._quakes.features.filter((item) => item.id === id)[0];
  }
}

async function showQuakes() {
  // get the current location
  const location = await initPos();
  // get the list of quakes for the location
  const quakes = await getQuakesForLocation(location);
  // render the list to the list element
  const listElement = document.querySelector("#quakeList");
  listElement.innerHTML = generateListMarkup(
    quakes.features,
    earthquakeListTemplate
  );

  // attach a listener to the quakes that will listen for a click and render out details about the quake
  listElement.addEventListener("click", earthQuakeClickHandler);
}

// async function initPos() {
//   let locResp = await getLocation();
//   console.log(locResp);
//   const location = locResp.coords;
//   return location;
// }

// async function getQuakesForLocation(location) {
//     location.initPos();
//     const radius = 100;
//   const query =
//     baseUrl +
//     `&latitude=${location.latitude}&longitude=${location.longitude}&maxradiuskm=${radius}`;
//   console.log(query);
//   const quakes = await getJSON(query);
//   return quakes;
// }

// function generateListMarkup(list, templateCallback) {
//     let quakes = list;
//     const listElement = document.querySelector("#quakeList");
// } 

// function earthquakeListTemplate(data) {
//     let quakes = data;
//     const listHtml = quakes.features.map((quake) => {
//       return `${quake.properties.title} ${new Date(quake.properties.time)}`;
//     });
//     listElement.innerHTML = listHtml.join("");
// }

// function earthQuakeClickHandler(event) {
//     listElement.addEventListener("click", (event) => {
//       console.log(event.currentTarget); // note the difference between target and currentTarget
//       console.log(event.target);
//       const quakeId = event.target.dataset.id;
//       // find the quake with that ID
//       const quake = quakes.features.find((item) => item.id === quakeId);
//       // render details
//       const detailsElement = document.querySelector("#quakeDetails");
//       // our quake information is inside of an object called properties. Objects are sometimes hard to iterate over...below is a nice way to convert an object into an array.
//       const quakeProperties = Object.entries(quake.properties);
//       detailsElement.innerHTML = quakeProperties
//         .map((item) => {
//           if (item[0] === "time" || item[0] === "updated") {
//             return `
// ${item[0]}: ${new Date(item[1])}
// `;
//           } else
//             return `
// ${item[0]}: ${item[1]}
// `;
//         })
//         .join("");
//     });
// }
