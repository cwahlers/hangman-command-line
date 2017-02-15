var inquirer = require('inquirer')
var Word = require('./Word.js');
var tries = 7;

var words = ['batman', 'robin', 'joker'];

var wordToPlay = words[Math.floor(Math.random()*words.length)];
console.log(" Welcome to Hangman");

var wordObject = new Word(wordToPlay);
wordObject.makeAndPushLettersIntoWord();
console.log(wordObject.display());

function askLetter(){
    if (wordObject.checkWinner() || tries == 0){
      if(tries == 0){
        console.log("Sorry you lose")
      } else {
        console.log("YOU WON");
      }      
      // Ask user if they want to play again
      inquirer.prompt([
      {
      type: "input",
      name: "playAgain",
      message: "Would you like to play again? Then say yes."},
      ]).then(function(data){
          if (data.playAgain == 'yes') {
              tries = 7;
              wordToPlay = words[Math.floor(Math.random()*words.length)];

              wordObject = new Word(wordToPlay);
              wordObject.makeAndPushLettersIntoWord();
              console.log(wordObject.display());

              askLetter();
          } else console.log("Goodbye");
      });

    }else{
      console.log("You have " + tries + " tries to guess the correct word");
      inquirer.prompt([
      {
      type: "input",
      name: "guess",
      message: "What letter do you guess? If you are done then say no."},
      ]).then(function(data){
          if (data.guess != 'no') {
              if( wordObject.updateLetter(data.guess) ) tries--;

              console.log(wordObject.display());

              askLetter();
          }
      });
    }
}

// Start of game

askLetter();