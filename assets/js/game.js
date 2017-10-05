var game = {
    wins: 0,
    losses: 0,
    currentWord: "wraithfood",
    setWord: function() {
        console.log("setWord triggered\n==============");
        game.currentWord = wordlist[Math.floor(Math.random() * wordlist.length)];
        var html = "";
        for (var i = 0; i < game.currentWord.length; i++) {
            html += "_ ";
        }
        document.getElementById("word").innerHTML = html;
    }
};

window.onload = function() {
    game.setWord();
    console.log(game.currentWord + "\n==============");
}