async function fetchBook(url) {
   try {
     const response = await fetch(url);
     console.log(response);
     return await response.json();
   } catch (error) {
     console.log(error);
   }  
  }

function qs(selector) { 
   const element = document.querySelector(selector);
   if (element !== null) {
      return element;
   }
   return null;
}

function onClick(elementSelector, callback) { 
   elementSelector.addEventListener('touchend', callback);
   elementSelector.addEventListener('click', callback);
}

export {
   fetchBook,
   qs, 
   onClick
}