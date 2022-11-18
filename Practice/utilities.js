function getJSON(url) {
   return fetch(url)
      .then(function(response) {
         return response.json();
      }
      .catch(function(error) {
         console.log(error);
     });
};
