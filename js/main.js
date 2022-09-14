let indexList = document.querySelector('.index');

function createIndex() {
   const index = [
      {
         label: "Week 1",
         url: "Week 1/week1.html"
      }
   ]

   for (let i = 0; i < index.length; i++) {

      let li = document.createElement('li');
      let a = document.createElement('a');

      a.textContent = index[i].label;
      a.setAttribute("href", index[i].url);

      li.appendChild(a);
      indexList.appendChild(li);   

   }
}

document.onload = createIndex();