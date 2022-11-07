const btn = document.getElementById('rainbow');

const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'rebeccapurple', 'violet'];

function change() {
   document.body.style.background = rainbow[Math.floor(7 * Math.random())];
}

btn.addEventListener('click', change);

const form = document.forms[0];
form.addEventListener('submit', factorize, false);

function factorize(event) {
   event.preventDefault();
   document.getElementById('output').innerHTML = '<p>This could take a while...</p>';
   const number = Number(form.number.value);

   if (window.Worker) {
      const worker = new Worker('factors.js');
      worker.postMessage(number);
      worker.addEventListener('message', (event) => {
         document.getElementById('output').innerHTML = event.data;
      }, false);
   }
}

/**CANVAS */
const canvasElement = document.getElementById('canvas');
const context = canvasElement.getContext('2d');
context.fillStyle = "#0000cc";
context.strokeStyle = "#ccc";
context.lineWidth = 4;
context.fillRect(10, 10, 100, 50);
context.strokeRect(10, 100, 100, 50);

context.beginPath();
context.moveTo(130, 50);
context.lineTo(180, 50);
context.moveTo(155, 50);
context.lineTo(155, 90);
context.strokeStyle = '#c00';
context.lineWidth = 15;
context.stroke();

context.beginPath();
context.arc(200, 200, 30, 0, Math.PI * 2, false);
context.strokeStyle = "#ff0";
context.lineWidth = 4;
context.stroke();

context.fillStyle = "#0c0";
context.font = 'bold 26px sans-serif';
context.fillText('Hello', 20, 200);

