/** Drag and Drop JS */
const mice = document.querySelectorAll('#mouseContainer img')

let mouse = null;
for (let i = 0; i < mice.length; i++) {
   mouse = mice[i];
   mouse.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text/plain', this.id);
   });
}

const cat = document.getElementById('cat');
cat.addEventListener('dragover', function (event) {
   event.preventDefault();
});

cat.addEventListener('drop', function (event) {
   let mouseHash = {
      mouse1: 'NOMNOMNOM',
      mouse2: 'Meow',
      mouse3: 'Purrrrr...'
   };

   let catHeading = document.getElementById('cat-heading');
   let mouseID = event.dataTransfer.getData('text/plain');
   catHeading.innerHTML = mouseHash[mouseID];

   const mousey = document.getElementById(mouseID);
   mousey.parentNode.removeChild(mousey);
   event.preventDefault();

});