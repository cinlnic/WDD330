import * as ls from './ls.js';
import * as util from './utilities.js';

let todoList = null;

/*in the constructor you should set a variable with the element our todo list will be built in, 
and the key we will use to read/write from localStorage*/
export default class Todos {
   constructor(element, key) {
      this.element = util.qs(element);
      this.key = key;
      this.addEventListeners();
   }

   // Add a method to the Todos class called addTodo. It should grab the input in the html where users enter the text of the task, 
   // then send that along with the key to a SaveTodo() function. Then update the display with the current list of tasks
   addTodo() {
      const task = util.qs('#task').value;
      saveTodo(this.key, task);
      this.listTodos();
   }

   listTodos() {
      // Add a method to the Todos class called listTodos(). It should use the renderTodoList function to output our todo list when called.
      // It should get called when a todo is added, or removed, and when the Todos class is instantiated.
      todoList = getTodos(this.key);
      updateTasksLeft(todoList);
      renderTodoList(todoList, this.element);
   }

   completeTodo(e) {
      if (!e.target.matches("input[type='checkbox']")) return;
      const todo = todoList.find(todo => todo.id === e.target.parentElement.id);
      todo.completed = !todo.completed;
      ls.writeToLS(this.key, todoList);
      updateTasksLeft(todoList);
   }

   removeTodo(e) {
      if (e.target && e.target.matches("button.delete-button")) {
         todoList.splice(todoList.findIndex(i => i.id === e.target.parentElement.id), 1);
         ls.writeToLS(this.key, todoList);
         this.listTodos();
      }

   }

   filterTodo(e) {
      if (e.target && e.target.matches("button.active-button")) {
         const activeTasks = todoList.filter(task => task.completed === false);
         renderTodoList(activeTasks, this.element);
      } else if (e.target && e.target.matches("button.completed-button")) {
         const completedTasks = todoList.filter(task => task.completed === true);
         renderTodoList(completedTasks, this.element);
      } else {
         renderTodoList(todoList, this.element);
      }
   }

   addEventListeners() {
      const addTask = util.qs('#add-task');
      util.onTouch(addTask, this.addTodo.bind(this));
      util.onTouch(this.element, this.removeTodo.bind(this));
      util.onTouch(this.element, this.completeTodo.bind(this));
      const filterTask = util.qs('.list-footer');
      util.onTouch(filterTask, this.filterTodo.bind(this));

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
   const todo = { id: timestamp, content: task, completed: false };
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
   return todoList;
}


/**foreach todo in list, build a li element for the todo, and append it to element
@param {array} list The list of tasks to render to HTML 
@param {element} element The DOM element to insert our list elements into.

*/
function renderTodoList(list, element) {
   element.innerHTML = '';
   list.forEach(task => {
      const taskLi = document.createElement('li');
      taskLi.setAttribute("id", `${task.id}`);
      taskLi.innerHTML = `<input id="${task.id} "type="checkbox" ${task.completed ? 'checked' : ''}/>
                        <label for="${task.id}" class="task-content">${task.content}</label>
                        <button type="submit" class="delete-button">X</button>`
      element.append(taskLi);
   });
}


function updateTasksLeft(list) {
   const taskLeft = list.filter(task => task.completed === false).length;
   const p = util.qs("#num-left");
   p.innerHTML = `${taskLeft} task${taskLeft === 1 ? '' : 's'} left`;
}




