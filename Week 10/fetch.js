//fetch api

// fetch('https://openlibrary.org/isbn/9781462118724.json')
//    .then((response) => {
//       console.log('resolved', response);
//       return response.json();
//    })
//    .then(data => {
//       console.log(data);
//    })
//    .catch((err) => {
//       console.log('rejected', err)
//    });

//asynce & await

const getBooks = async () => { //async function always returns a promise

   const response = await fetch('https://openlibrary.org/isbn/9781462118724.json');
   if(response.status !== 200) {
      throw new Error("Cannot fetch the data");
   }

   const data = await response.json();
   return data;
};

getBooks()
   .then(data => console.log('resolved:', data))
   .catch(err => console.log('rejected:', err.message));
