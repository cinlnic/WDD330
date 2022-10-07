/*Form Examples*/
// const form = document.forms.search;
// const input = form.elements.searchInput;

// //input.addEventListener('focus', () => alert('focused'), false);
// //input.addEventListener('blur', () => alert('blurred'), false);
// //input.addEventListener('change', () => alert('changed'), false);

// form.addEventListener ('submit', search, false);
// function search(event) {
//    alert(`You searched for ${input.value}`);
//    event.preventDefault();
// }

// // //Add a value to the input field. Make it blank when user clicks in the field and reappear when they click out of the field.
// // input.value = 'Search Here';

// input.addEventListener('focus', function() {
//    if (input.value === 'Search Here') {
//       input.value = '';
//    } 
// }, false);

// input.addEventListener('blur', function() {
//    if(input.value === '') {
//       input.value = 'Search Here';
//    }
// }, false);

/*Heroes JS*/
const form = document.forms['hero'];

form.heroName.addEventListener('keyup',validateInline,false);
form.heroName.addEventListener('keyup',disableSubmit,false);

function disableSubmit(event) {
   if(event.target.value === ''){
       document.getElementById('submit').disabled = true;
   } else {
       document.getElementById('submit').disabled = false;
   }
}

const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);


function validateInline() {
   const heroName = this.value.toUpperCase();
   if (heroName.startsWith('X')) {
      error.style.display = 'block';
   } else {
      error.style.display = 'none';
   }
}

form.addEventListener('submit', makeHero, false);

function makeHero(event) {
   event.preventDefault(); //prevent form from being sumbitted
   const hero = {}; //create empty object
   hero.name = form.heroName.value; //create a name property and assign the value of the input
   hero.realName = form.realName.value;
   hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);
   hero.category = form.category.value;
   hero.age = form.age.value;
   hero.city = form.city.value;
   hero.origin = form.origin.value;

   alert(JSON.stringify(hero)); //convert object to JSON string and display in alert dialog

   return hero;
}




// hero.powers = [];

// for (let i=0; i < form.powers.length; i++) {
//    if (form.powers[i].checked) {
//       hero.powers.push(form.powers[i].value);
//    }
// }

// form.addEventListener('submit', validate, false);

// function validate(event) {
//    const firstLetter = form.heroName.value[0];
//    if (firstLetter.toUpperCase() === 'X') {
//       event.preventDefault();
//       alert('Your name is not allowed to start with X!');
//    }
// }