import { renderOneHike } from "./renderHike.js";

class Hikes {
  showHikeList(hikeList, imgBasePath) {
    const hikeListElement = document.getElementById("hikes");
    hikeListElement.innerHTML = "";
    this.renderHikeList(hikeList, hikeListElement, imgBasePath);
  }

  renderHikeList(hikes, parent, imgBasePath) {
    hikes.forEach((hike) => {
      parent.appendChild(renderOneHike(hike, imgBasePath));
    });
  }
}

export default Hikes;