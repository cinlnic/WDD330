
import Auth from "./Auth.js";
//import {makeRequest} from "./authHelpers.js";

const auth = new Auth();

const submit = document.getElementById('submit');
submit.addEventListener('click', auth.login);


// makeRequest('login', 'POST',  {
//    password: 'user1',
//    email: 'user1@email.com'
// });