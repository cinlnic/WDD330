/*Create a Calculator - Object methods, "this" */

const calculator = {     
   read() {  
      this.a = parseInt(document.getElementById('num1').value);
      this.b = parseInt(document.getElementById('num2').value);
      this.sum();
      this.mul();
   },

   sum() {
      let sum = this.a + this.b;
      return document.getElementById("added").innerHTML = `Your numbers added equal ${sum}.`;
   },

   mul() {
      let mul = this.a * this.b;
      return document.getElementById("multiply").innerHTML = `Your numbers multiplied equal ${mul}.`;
   }

};

