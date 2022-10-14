import * as ls from './ls.js';
import * as util from './utilities.js';

const todoList = null;

/*in the constructor you should set a variable with the element our todo list will be built in, 
and the key we will use to read/write from localStorage*/
class Todos {
   constructor (element, key) {
      this.element = element;
      this.key = key;
   }

   addTodo() {
      // Add a method to the Todos class called addTodo. It should grab the input in the html where users enter the text of the task, 
      // then send that along with the key to a SaveTodo() function. Then update the display with the current list of tasks
      const task = util.qs('#task').nodeValue;
      console.log(task);
      saveTodo(this.key, task);
      this.listTodos();
   }

   listTodos() {
      // Add a method to the Todos class called listTodos(). It should use the renderTodoList function to output our todo list when called.
      // It should get called when a todo is added, or removed, and when the Todos class is instantiated.
      const list = getTodos(this.key);
      renderTodoList(list, this.element);
   }

   completeTodo() {

   }

   removeTodo() {

   }

   filterTodo() {

   }
}


//In the Todo.js module, but not in the Todos class, create the following function
/**
 * build a todo object, add it to the todoList, and save the new list to local storage.
 * @param  {string} key The key under which the value is stored under in LS
* @param {string} task The text of the task to be saved. 

 */
function saveTodo(key, task) { 
   const timestamp = new Date();
   const todo = {id: timestamp, content: task, completed: "false"};
   todoList.push(todo);
   ls.writeToLS(key, todoList);
}

//A todo should look like this: { id : timestamp, content: string, completed: bool }


//In the Todos.js module, but not in the Todos class create the following function
/** check the contents of todoList, a local variable containing a list of ToDos. 
If it is null then pull the list of todos from localstorage, update the local variable, and return it
@param {string} key The key under which the value is stored under in LS 
@return {array} The value as an array of objects
*/
function getTodos(key) { 
   if (todoList === null) {
      todoList = ls.readFromLS(key);
      return todoList;
   }
}


/**foreach todo in list, build a li element for the todo, and append it to element
@param {array} list The list of tasks to render to HTML 
@param {element} element The DOM element to insert our list elements into.

*/
function renderTodoList(list, element) { 
   
   for (task of list) {
      const li = document.createElement('li');
      element.append(li);
   }
}



export default Todos;
