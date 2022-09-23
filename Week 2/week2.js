//quiz ninja js
const quiz = [
   ["What is Superman's real name?","Clark Kent"],
   ["What is Wonder Woman's real name?","Diana Prince"],
   ["What is Batman's real name?","Bruce Wayne"]
];

function start(quiz) {
   let score = 0;

   //main loop of game
   for(const [question, answer] of quiz) {
      const response = ask(question);
      check(response, answer);
   }

   gameOver();

   function ask(question) {
      return prompt(question);
   }

   function check(response, answer) {
      if (response === answer){
         alert ('Correct!');
         score++;
      } else {
         alert (`Wrong! The correct answer was ${answer}`);
      }
   }

   function gameOver() {
      alert (`Game over, you scored ${score} point${score !== 1 ? 's' : ''}`)
   }
}

