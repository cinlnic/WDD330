import { renderOneHike } from "./renderHike.js";

class Hike {
  render(hike, imgBasePath) {
    const hikeElement = document.getElementById("hike");
    hikeElement.appendChild(renderOneHike(hike, imgBasePath));
    alert(sessionStorage.getItem("hike"));
  }
}

export default Hike;