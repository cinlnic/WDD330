/*Ch.7 Events */
//  function doSomething() {
//   document.getElementById('clickme').innerHTML= 'Something Happened!'; //adds text to the div when a click happens
// }

function doSomething(event) {
   console.log(event.type); //shows the type as click in the console log
   console.log(event.target);//shows where the click occured on the page
   console.log(`screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.screenX},${event.screenY})`)//shows coordinates of the event
}

addEventListener('click', doSomething);

const clickParagraph = document.getElementById('click');

clickParagraph.addEventListener('click', () => console.log('click'));
clickParagraph.addEventListener('mousedown', () => console.log('down'));
clickParagraph.addEventListener('mouseup', () => console.log('up'));

const dblclickParagraph = document.getElementById('dblclick');
dblclickParagraph.addEventListener('dblclick', highlight);

function highlight(event) {
   event.target.classList.toggle('highlight');
}

const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);
mouseParagraph.addEventListener('mousemove', () => console.log('You Moved!'));

addEventListener('keydown', highlight);
addEventListener('keyup', () => console.log( `You stopped pressing the key on ${new Date}`));
addEventListener('keypress', (event) => console.log(`You pressed the ${event.key} character`));
addEventListener('keydown', (event) => console.log(`You pressed the ${event.key} character`));

addEventListener('touchend', () => console.log('Touch stopped'));

const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);

function remove(event) { //event parameter is never used??
   console.log('Enjoy this while it lasts!');
   onceParagraph.style.backgroundColor = 'pink';
   onceParagraph.removeEventListener('click', remove);
}

const brokenLink = document.getElementById('broken');

brokenLink.addEventListener('click', (event) => {
   event.preventDefault();
   console.log('Broken Link!');
})

//bubbling example
ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');

// ulElement.addEventListener('click', (event) => console.log('Clicked on ul'));
// //clicking on first li shows li was clicked and ul and on up, clicking on second or third li will start with ul, since querySelector only selects first element
// liElement.addEventListener('click', (event) => console.log('Clicked on li')); 

// //Third parameter of addEventListener - specifies whether capturing should be used or not. Defaults to false which is why bubbling happens.
// //This will implement capturing instead of bubbling
// ulElement.addEventListener('click', (event) => console.log('Clicked on ul'), true);

// liElement.addEventListener('click', (event) => console.log('Clicked on li'), true);

//stopPropagation() stop the click event from propagating to the ul element
// liElement.addEventListener('click', (event) => {
//    console.log('clicked on li');
//    event.stopPropagation(); }, false);

//
ulElement.addEventListener('click',highlight);