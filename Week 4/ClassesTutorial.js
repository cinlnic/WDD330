
 //Basics of classes
 class Rectangle {
   //constructor is used to setup object
   constructor(width, height, color) {
      this.width = width;
      this.height = height;
      this.color = color;
   }

   getArea() {
      return this.width * this.height;
   }

   printDescription() {
      console.log(`I am a rectange of ${this.width} x ${this.height} and I am ${this.color}`);
   }
 }

 let myRectange1 = new Rectangle(5, 3, "red");
 console.log(myRectange1.getArea());
 console.log(myRectange1.printDescription());

 //Getter and Setters
 class Square {
   constructor(width) {
      this.width = width;
      this.height = width;
      this.numberOfRequestsForArea = 0;
   }

   get area() {
      this.numberOfRequestsForArea++;
      return this.width * this.height;
      
   }

   set area(area) {
      this.width = Math.sqrt(area);
      this.height = this.width
   }

 }

 let square1 = new Square(4);
 console.log(square1.area);
 console.log(square1.area);
 console.log(square1.area);
 console.log(square1.area);

 console.log(square1.numberOfRequestsForArea);

 square1.area = 25;
 console.log(square1.width);
 console.log(square1.height);

 //Static Methods
 class Square3 {
   constructor (width) {
      this.width = width;
      this.height = width;
   }

   static equals(a, b) {
      return a.width * a.height === b.width * b.height;
   }

   static isValidDimensions(width, height) {
      return width === height;
   }
 }

 let square3 = new Square3(8);
 let square4 = new Square3(9);
 let square5 = new Square3(9);
 console.log(square3);

 //call static methods directly on the class not on the instance
 //don't require an instance of the class to work
 console.log(Square3.equals(square3, square4));
 console.log(Square3.equals(square5, square4));

 console.log(Square3.isValidDimensions(6, 6));
 console.log(Square3.isValidDimensions(6, 7));

 //Inheritance and Extends

 //Parent class
 class Person {
   constructor(name, age) {
      this.name = name;
      this.age = age;
   }

   describe() {
      console.log(`I am ${this.name}, and I am ${this.age} years old.`);
   }
 }

 //child class
 class Programmer extends Person {
   constructor(name, age, yearsExperience) {
      //super calls the parent class
      super(name, age);
      //custom behavior of programmer class
      this.yearsExperience = yearsExperience;
   }

   code() {
      console.log(`${this.name} is coding.`);
   }
 }

let person1 = new Person("Jeff", 45);
let programmer1 = new Programmer("Dom", 56, 12); 

console.log(person1);
console.log(programmer1);

//calls methods from person class and programmer class
programmer1.code();
programmer1.describe();

//create array of programmers
const programmers = [
   new Programmer('Cindi', 42, 2),
   new Programmer('Rob', 42, 8)
]

//loops through programmers array and calls code method from programmer class
function developSoftware(programmers) {
   for (let programmer of programmers) {
      programmer.code();
   }
}

//calls and passes programmers array to developSoftware function
developSoftware(programmers);


//Polymorphism

class Animal {
   constructor(name) {
      this.name = name;
   }

   makeSound() {
      console.log(`Generic animal sound!`);
   }
}

class Dog extends Animal {
   constructor(name) {
      super(name);
   }

   //overrides the makeSound method in the parent class
   makeSound() {
      //calls the parent class animal.makeSound
      super.makeSound();
      console.log("Woof! Woof!");
   }
}

const a1 = new Animal('Spot');
a1.makeSound();

const a2 = new Dog('Jeff');
a2.makeSound();

//Classes: HTML List Binding
