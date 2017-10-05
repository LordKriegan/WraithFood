var game = {
    wins: 0,
    losses: 0,
    currentWord: "",
    wordHTML: "",
    setWord: function() {
        game.currentWord = wordlist[Math.floor(Math.random() * wordlist.length)];
        for (var i = 0; i < game.currentWord.length; i++) {
            game.wordHTML += "_";
        }
        document.getElementById("word").innerHTML = game.wordHTML;
        console.log(game.currentWord);
    },
    endGame: function() {
    	console.log("test");
    },    
    checkLet: function(letter) {
    	for (i = 0; i < game.currentWord.length; i++) {
    		if (game.currentWord.charAt(i) === letter) {
    			game.wordHTML = game.wordHTML.substr(0, i) + letter + game.wordHTML.substr(i + 1);
    		}
    	}
    	document.getElementById("word").innerHTML = game.wordHTML;
    	if (!(game.wordHTML.includes("_"))) {
    		game.endGame();
    	}
    }
};

window.onload = function() {
    game.setWord();
    document.onkeyup = function (event) {
    	//even though this game is designed for only lower case letters,
    	//onkeyup only returns ascii code for upper case letters,
    	//regardless of what user intended to input. Thus,
    	//we check for upper A and Z instead of lower.
    	if ((event.keyCode >= 65) && (event.keyCode <= 90)) {
    		game.checkLet(event.key);

    	}
    };
};