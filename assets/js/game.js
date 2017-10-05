var game = {
    wins: 0,
    losses: 0,
    currentWord: "",
    wordHTML: "",
    guessedLets: "",
    setWord: function() {
        game.currentWord = wordlist[Math.floor(Math.random() * wordlist.length)];
        for (var i = 0; i < game.currentWord.length; i++) {
            game.wordHTML += "_";
        }
        document.getElementById("word").innerHTML = game.wordHTML;
        console.log(game.currentWord);
    },
    endGame: function() {
        console.log("This function will end the current game, reset gameboard, and update scoreboard.");
    },
    checkLet: function(letter) {
        //if letter isnt in word update gamestate accordingly
        if (!(game.currentWord.includes(letter))) {
            console.log("This if statement needs to update guesses remaining, and change picture");
        }
        //just end the current function if they already guessed this letter
        else if (game.guessedLets.includes(letter)) {
        	return;
        }
        //otherwise update blanks to correctly guessed letters 
        else {
            for (i = 0; i < game.currentWord.length; i++) {
                if (game.currentWord.charAt(i) === letter) {
                    game.wordHTML = game.wordHTML.substr(0, i) + letter + game.wordHTML.substr(i + 1);
                }
            }
        }
        //add letter to list of guessed letters
        game.guessedLets += letter + " ";
        //update page to reflect current state of word and letters guessed
        document.getElementById("lettersGuessed").innerHTML = game.guessedLets;
        document.getElementById("word").innerHTML = game.wordHTML;
        if (!(game.wordHTML.includes("_"))) {
            game.endGame();
        }
    }
};

window.onload = function() {
    game.setWord();
    document.onkeyup = function(event) {
        //even though this game is designed for only lower case letters,
        //onkeyup only returns ascii code for upper case letters,
        //regardless of what user intended to input. Thus,
        //we check for upper A and Z instead of lower.
        if ((event.keyCode >= 65) && (event.keyCode <= 90)) {
            game.checkLet(event.key);
        }
    };
};