const squareElement1 = document.getElementById('square1');
const squareElement2 = document.getElementById('square2');
let angle = 0;

setInterval( () => {
   angle = (angle + 2) % 360;
   squareElement1.style.transform = `rotate(${angle}deg)`
}, 1000/60);

function rotate() {
   angle = (angle + 2) % 360;
   squareElement2.style.transform = `rotate(${angle}deg)`
   window.requestAnimationFrame(rotate);
}

const id = requestAnimationFrame(rotate);