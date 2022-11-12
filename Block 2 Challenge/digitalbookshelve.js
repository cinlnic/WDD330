const url = 'https://openlibrary.org/isbn/9781462118724.json';
const url2 = 'https://openlibrary.org/isbn/97800624225454.json';

async function apiFetch(url) {
   const response = await fetch(url);
   const data = await response.json();
   return data;
 }

 console.log(apiFetch(url));

 //console.log(apiFetch(url2));