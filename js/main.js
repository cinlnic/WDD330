let indexList = document.querySelector('.index');

function createIndex() {
   const index = [
      {
         label: "Week 1",
         url: "Week 1/week1.html"
      },
      {
         label: "Week 2",
         url: "Week 2/week2.html"
      },
      {
         label: "Week 3",
         url: "Week 3/week3.html"
      },
      {
         label: "Week 4",
         url: "Week 4/week4.html"
      },
      {
         label: "Week 5",
         url: "Week 5/week5.html"
      },
      {
         label: "To-do App",
         url: "ToDo/index.html"
      },
      {
         label: "Week 7",
         url: "Week 7/week7.html"
      },
      {
         label: "Week 8",
         url: "Week 8/week8.html"
      },
      {
         label: "Week 9",
         url: "Week 9/week9.html"
      },
      {
         label: "Week 10",
         url: "Week 10/week10.html"
      },
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