//Facts
const textButton = document.getElementById('number');
const apiButton = document.getElementById('chuck');
const outputDiv = document.getElementById('output');
const taskId = document.getElementById('task-id');

const textURL = 'http://numbersapi.com/random';
const apiURL = 'https://api.chucknorris.io/jokes/random';

textButton.addEventListener('click', () => {
   fetch(textURL)
   .then(response => {
      outputDiv.innerHTML = 'Waiting for response...';
   if (response.ok) {
      return response;
   }
      throw Error(response.statusText);
   })
   .then(response => response.text())
   .then(text => outputDiv.innerText = text)
   .catch(error => console.log('There was an error:', error))
}, false);

apiButton.addEventListener('click', () => {
   fetch(apiURL)
   .then(response => {
      outputDiv.innerHTML = 'Waiting for a response...';
   if (response.ok) {
      return response;
   }
   throw Error(response.statusText);
   })
   .then(response => response.json())
   .then(data => outputDiv.innerText = data.value)
   .catch(error => console.log('There was an error:', error))
}, false);

//To Do List
const form = document.forms['todo'];
form.addEventListener('submit', addTask, false);

function addTask(event) {
   event.preventDefault();
   const task = new FormData(form);
   const url = `http://echo.jsontest.com/id/1/title/${form.task.value}`;
   const headers = new Headers({
       'Accept': 'application/json',
       'Content-Type': 'application/json'
   });
   const request = new Request(url,
   {
       method: 'POST',
       mode: 'cors',
       header: headers,
       body: JSON.stringify(task)
   }
   )

   fetch(request)
   .then(response => response.json())
   .then(data => taskId.innerText = `${data.title} saved with an id of ${data.id}`)
   .catch(error => console.log('There was an error:', error))

}