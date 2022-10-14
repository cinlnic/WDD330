function renderOneHike(hike, imgBasePath) {
  const item = document.createElement("li");

  item.innerHTML = ` <h2>${hike.name}</h2>
        <div class="flex">
        <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
        <div>
                <div>
                    <h3>Distance</h3>
                    <p>${hike.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${hike.difficulty}</p>
                </div>
        </div>
        </div>`;

  return item;
}

export {renderOneHike}