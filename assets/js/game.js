var game = {
    wins: 0,
    losses: 0,
    guessesLeft: 9,
    currentWord: "",
    wordHTML: "",
    guessedLets: "",
    resetBoard: function() {
        game.setWord();
        game.guessesLeft = 9;
        game.guessedLets = ""
        document.getElementById("mainPic").src = "assets/images/wrong9.png";
        document.getElementById("lettersGuessed").innerHTML = "";
        document.getElementById("guessesLeft").innerHTML = "8";
    },
    setWord: function() {
        game.currentWord = wordlist[Math.floor(Math.random() * wordlist.length)];
        game.wordHTML = "";
        for (var i = 0; i < game.currentWord.length; i++) {
            game.wordHTML += "_";
        }
        document.getElementById("word").innerHTML = game.wordHTML;
        console.log(game.currentWord);
    },
    endGame: function(isGameWon) {
        if (isGameWon) {
            game.wins++;
            document.getElementById("wins").innerHTML = game.wins;
        } else {
            game.losses++;
            document.getElementById("losses").innerHTML = game.losses;
        }
        game.resetBoard();
    },
    checkLet: function(letter) {
        //if letter isnt in word update gamestate accordingly
        if (!(game.currentWord.includes(letter)) && !(game.guessedLets.includes(letter))) {
            if (game.guessesLeft > 0) {
                game.guessesLeft--;
                document.getElementById("mainPic").src = "assets/images/wrong" + game.guessesLeft + ".png";
                document.getElementById("guessesLeft").innerHTML = game.guessesLeft - 1;
            }
        }
        //just end the current function if they already guessed this letter
        if (game.guessedLets.includes(letter)) {
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
        if (game.guessesLeft === 1) {
            game.guessesLeft = 0;
            document.getElementById("word").innerHTML = "Game Over! Press any key to continue!";
        }
        else if (game.guessesLeft === 0) {
            game.endGame(false);
            return;
        }
        //if wordhtml is same as currentword end the game
        if (game.wordHTML === game.currentWord) {
            game.endGame(true);
        }

    };
};