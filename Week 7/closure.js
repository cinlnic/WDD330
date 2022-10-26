//function returned from another function
function instructionGenerator() {
   function multiplyBy2 (num) {
      return num * 2;
   }
   return multiplyBy2;
}

const generatedFunc = instructionGenerator();
const result = generatedFunc(3);
console.log(result);

/*calling a function in the same scope as it was defined
Where you define your functions determines what variables your functions have access to when you call the function
function outer() {
   let counter = 0;
   function incrementCounter() {
      counter++;
   }
   incrementCounter(); 
}

outer(); 

incrementCounter(); //won't run outside of outer(), because it is not defined here*/

/*run a function outside where it was defined without an error - return the inner function and assing it to a new variable*/

function outer() {
   let counter = 0;
   function incrementCounter() {
      counter++;
   }
   return incrementCounter;//returns the function value = counter++ // also returns "backpack" of the surrounding data
}

const myNewFunction = outer(); //myNewFunction = incrementCounter
myNewFunction(); //run incrementCounter in the golbal context through its new label myNewFuntion
myNewFunction(); //counter would now be 2, "backpack" holds onto the count

/**technical name for "backpack" - Persistant Lexical Scope Reference, Closed Over Variable Enviroment, Closure*/

const anotherFunction = outer(); //new function with it's own backpack
anotherFunction();
anotherFunction();//counter would be 2

/**The power of Closure -
 * Now: Our functions get 'memories' - once, memorize
 * Advanced: We can implement the module pattern in JavaScript
 */