
const peopleList = document.getElementById('people');
const personDetails = document.getElementById('person-details');

async function apiFetch(url) {
   const response = await fetch(url);
   const data = await response.json();
   return data;
 }

 async function showPeople(url = 'https://swapi.dev/api/people') {
   const data = await apiFetch(url);
   console.log(data);
   createList(data.results);

   if (data.next) {
      const next = document.getElementById('next');
      next.onclick = () => {
         showPeople(data.next);
      };
   }

   if (data.previous) {
      const previous = document.getElementById('previous');
      previous.onclick = () => {
         showPeople(data.previous);
      }; 
   }
 }

 function createList (data) {
   peopleList.innerHTML = '';
   data.forEach(person => {
      const peopleLink = document.createElement('li');
      peopleLink.setAttribute("id", `${person.name}`);
      peopleLink.innerHTML = `${person.name}`;
      peopleList.append(peopleLink);

      peopleLink.addEventListener('click', function(event) {
         event.preventDefault();
         getPersonDetails(person.url);
      })
   });
 }

 async function getPersonDetails(url) {
   const person = await apiFetch(url);
   renderSinglePerson(person);
 }

async function renderSinglePerson(person) {
   console.log(person);
   const homeworld = await apiFetch(person.homeworld);
   personDetails.innerHTML = `<h4>${person.name}</h4
               <p>Born: ${person.birth_year}</p>
               <p>Homeworld: ${homeworld.name}</p>
               <p>Gender: ${person.gender}</p>
               <p>Height: ${person.height}</p>
               <p>Mass: ${person.mass}</p>
               <p>Eye-color: ${person.eye_color}</p>
               <p>Hair-color: ${person.hair_color}</p>
               <p></p>`;
   
 }
 
 showPeople();

//  function renderPrevious(data) {
//    return () => {
//       if(data.previous === null) {
//       return;
//    }
//    apiFetch(data.previous).then((data) => {renderList(data)});
// }; 
// }

// function renderNext(data) {
//    return () => {
//    if(data.next === null) {
//       return;
//    }
//    apiFetch(data.next).then((data) => {renderList(data)});
// }
// }



//apiFetch(url).then(renderList);

 


