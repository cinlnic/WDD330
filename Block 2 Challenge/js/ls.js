//read book list from localstorage
function readFromLS(key) { 
   const bookList = JSON.parse(localStorage.getItem(key)) || [];
   return bookList;
}

//save books to localstorage
function writeToLS(key, data) { 
   localStorage.setItem(key, JSON.stringify(data));
}

export {
   readFromLS,
   writeToLS
}