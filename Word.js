// Contain all of the methods which will check the letters guessed versus the random word selected
var Letter = require('./Letter.js');

function Word(word){
    this.word = word;
    this.letters = [];
    this.makeAndPushLettersIntoWord = function(){
        for (var i=0; i< this.word.length; i++){
            var lett = new Letter(this.word[i]);
            this.letters.push(lett);
        }
    },
    this.display = function(){
        var str = "";
        for (var i=0; i < this.letters.length; i++){
            str = str + this.letters[i].display();
        }

        return str;
    }
    this.updateLetter = function(guess){
        //check all of the letter objects and see if the guess matches
        //if it does I update that letter's found to true
        var updateTry = true;
        for (var i=0; i<this.letters.length; i++){
            if (this.letters[i].letter == guess) {
              this.letters[i].found = true;
              updateTry = false;
            }  
        }
        return updateTry;
    }
    this.checkWinner = function(){
        //check if all the letter were guessed correctly
        var winner = true;
        //one false found then no winner
        for (var i=0; i<this.letters.length; i++){
            if (this.letters[i].found == false ) winner = false;
        }
        return winner;
    }
}

module.exports = Word;