async function fetchBook(url) {
   try {
     const response = await fetch(url);
     //console.log(response);
     return await response.json();
   } catch (error) {
     console.log(error);
   }  
  }

  async function fetchImage(url) {
   const img = new Image();
   return new Promise((res, rej) => {
      img.onload = () => res(img);
      img.onerror = e => rej(e);
      img.src = url;
   });
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
   fetchImage,
   qs, 
   onClick
}