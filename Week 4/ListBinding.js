//get the ul element by id and assigning it to myList 
const myList = document.getElementById('myList');


class ListBinding {
   constructor(element) {
      this.listElement = element;
      this.textList = [];
   }

   //makes an li tag
   static createListItem(text) {
      const li = document.createElement('li');
      li.textContent = text;
      return li;
   }

   update() {
      /*Remove all existing <li> elements/tags*/
      while (this.listElement.firstChild) {
         this.listElement.removeChild(this.listElement.firstChild);
      }

      /*Fill <ul> tag with <li> */
      for (const text of this.textList) {
         //calls static createListItem method and appending it to the ul
         this.listElement.appendChild(ListBinding.createListItem(text));
      }
   }

   add(text) {
      this.textList.push(text);
      this.update();
   }

   //remove and item using the index
   remove(index) {
      this.textList.splice(index, 1);
      this.update();
   }
}

//creating new instance of ListBinding class and passing in the myList(ul element)
const listBinding = new ListBinding(myList);