import Todos from './Todos.js';
import * as util from './utilities.js';

const todos = new Todos("#task-list", "task");

todos.listTodos();

const addTask = util.qs('#add-task');
util.onTouch(addTask, todos.addTodo);



console.log (todos.key);
console.log (todos.element);


