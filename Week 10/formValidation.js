//form validation with Constraint API
const email = document.getElementById('mail');

email.addEventListener("input", (e) => {
   if (email.validity.typeMismatch) {
      email.setCustomValidity('I am expecting an e-mail address!');
      email.reportValidity();
   } else {
      email.setCustomValidity("");
   }
});

//form validation with Constraint API and custom error message
const form = document.querySelector('form');
const email2 = document.getElementById('mail2');
const emailError = document.querySelector('#mail2 + span.error');

email2.addEventListener('input', (e) => {
   if (email2.validity.valid) {
      emailError.textContent = '';
      emailError.className = 'error';
   } else {
      showError();
   }
});

form.addEventListener('submit', (e) => {
   if (!email2.validity.valid) {
      showError();
      e.preventDefault();
   }
});

function showError() {
   if (email2.validity.valueMissing) {
      emailError.textContent = 'You need to enter an e-mail address.';

   } else if (email2.validity.typeMismatch) {
      emailError.textContent = 'Entered value needs to be an e-mail address.';
   
   } else if (email2.validity.tooShort) {
      emailError.textContent = `Email should be at least ${email2.minLength} characters; you entered ${email2.value.length}.`;
   }

   emailError.className = "error active";
}

//form validation without API
const form3 = document.querySelector('#form3');
const email3 = document.getElementById('mail3');
const error2 = email3.nextElementSibling;

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

window.addEventListener('load', () => {
   const isValid = email3.value.length === 0 || emailRegExp.test(email3.value);
   email3.className = isValid ? 'valid' : 'invalid';
});

email3.addEventListener('input', () => {
   const isValid = email3.value.length === 0 || emailRegExp.test(email3.value);
   if (isValid) {
      email3.className = 'valid';
      error2.textContent = '';
      error2.className = 'error';
   } else {
      email3.className = 'invalid';
   }
});

form3.addEventListener('submit', (e) => {
   e.preventDefault();

   const isValid = mail3.value.length === 0 || emailRegExp.test(email3.value);
   if (!isValid) {
      email3.className = 'invalid';
      error2.textContent = 'An email address is expected.';
      error2.className = 'error active';
   } else {
      email.className = "valid";
      error.textContent = "";
      error.className = "error";
   }
});


