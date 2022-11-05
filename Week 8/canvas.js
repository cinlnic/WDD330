//get the canvas element and context - place where the drawing is rendered
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

//define stroke and fill color, can use any CSS value to set color as long as it is a string: RGB, HEX, or Color name
context.strokeStyle = 'red';
context.fillStyle = 'rgba(0, 0, 255, 0.5)';

//draw the rectangle
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

function drawPattern() {
   const canvas = document.getElementById('demo2');
   const context = canvas.getContext('2d');
   context.strokeStyle = 'red';

   const img = new Image();
   img.src = '../images/bg-bike.png';
   img.onload = function () {
      const pattern = context.createPattern(img, 'repeat');
      context.fillStyle = pattern;
      context.fillRect(10, 10, 100, 100);
      context.strokeRect(10, 10, 100, 100);
   };
}

function drawGradient() {
   const canvas = document.getElementById('demo3');
   const context = canvas.getContext('2d');
   context.strokeStyle = 'red';
   const gradient = context.createLinearGradient(0, 0, 0, 200);
   gradient.addColorStop(0, 'blue');
   gradient.addColorStop(1, 'orange');
   context.fillStyle = gradient;
   context.fillRect(10, 10, 100, 100);
   context.strokeRect(10, 10, 100, 100);
}

function drawCircle(canvas) {

   const context = canvas.getContext('2d');
   context.beginPath();
   context.arc(50, 50, 30, 0, Math.PI * 2, true);
   context.closePath();
   context.strokeStyle = "purple";
   context.fillStyle = "lavender";
   context.lineWidth = 3;
   context.fill();
   context.stroke();
}

function saveDrawing() {
   const canvas5 = document.getElementById('demo5');
   window.open(canvas5.toDataURL('image/png'));
}

const button = document.getElementById('saveButton');
button.addEventListener('click', saveDrawing, false);

function drawImageToCanvas() {
   const canvas = document.getElementById("demo6");
   const context = canvas.getContext("2d");
   const image = document.getElementById("myImageElem");
   context.drawImage(image, 68, 68);
   const imageData = context.getImageData(0, 0, 1, 1);
   const pixelData = imageData.data;
   console.log(pixelData.length);
}

function manipulateImage() {
   const canvas = document.getElementById("demo7");
   const context = canvas.getContext("2d");
   const image = document.getElementById("secondImage");
   context.drawImage(image, 68, 68);

   const imageData = context.getImageData(0, 0, 200, 200);

   let red, green, blue, greyscale;
   for (let i = 0; i < imageData.data.length; i += 4) {
      red = imageData.data[i];
      green = imageData.data[i + 1];
      blue = imageData.data[i + 2];

      greyscale = red * 0.3 + green * 0.59 + blue * 0.11;

      imageData.data[i] = greyscale;
      imageData.data[i + 1] = greyscale;
      imageData.data[i + 2] = greyscale;
   }
   context.putImageData(imageData, 0, 0);

}

const canvas4 = document.getElementById('demo4');
const canvas5 = document.getElementById('demo5');

drawPattern();
drawGradient();
drawCircle(canvas4);
drawCircle(canvas5);

window.addEventListener("load", drawImageToCanvas, false);
window.addEventListener("load", manipulateImage, false);

