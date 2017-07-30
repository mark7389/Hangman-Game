var wordZ = ["Madonna", "Bertrand","Schopenhauer","gladiator","soarise","figs","aristotle", "Plato","odysseus","ramsis","napoleon","Television", "rope", "chair", "marmalade"];

var alphabet = ["a","b","c","d","e","f",
"g","h","i","j","k","l","m","n","o","p",
"q","r","s","t","u","v","w","x","y","z"];

var playerGuess = "";

var game = {

currentWord: "",
previousWord: "",
empty: [],
win: 0,
lose: 0,
Guesses: 6,
letterGuess: [],
isFound: "",


reset: function(){
	this.Guesses = 6;
	this.currentWord = "";
	this.empty = [];
	this.letterGuess = [];
	this.isFound = "";
	

},

placeHolder: function (str){

	for(j=0;j<str.length;j++){

		this.empty.push("_");
	};

},

generateWord: function(){

	this.currentWord = wordZ[Math.floor(Math.random() * wordZ.length)];

	return this.currentWord;
},

isLose: function(){

	if(this.Guesses <= 0){

		
		return true;
	}
	else{

		return false;
	}
},

isWin: function(){

	if(this.empty.join("").toLowerCase() === this.currentWord.toLowerCase()){

		
		return true;
	}
	else{

		return false;
	}
},

amatch: function(start, end){

	this.empty.fill(playerGuess,start ,end);
	

},

used: function(char){

	this.letterGuess.push(char);
},



};
// first anykey initiates new word
// second key should be letter
//isWin ...reset with new word;
//islose...reset with new word


document.onkeyup = function (event){


	if(game.empty.join("") === ""){

		game.generateWord();

		game.placeHolder(game.currentWord);
		
	}
	else{

		playerGuess = event.key.toLowerCase();

		if((alphabet.indexOf(playerGuess) > -1) && !(game.letterGuess.indexOf(playerGuess) > -1)){


		game.isFound = false;


		for( i = 0; i < game.currentWord.length ; i++){

			if(playerGuess === game.currentWord.charAt(i).toLowerCase()){
					
						game.amatch(i, i+1);
						game.isFound = true;
						
			}
					
				
		}
		if(game.isFound == false){

			game.Guesses--;
		}
		game.used(playerGuess);
		
		if(game.isWin()){

			game.previousWord = game.currentWord;
			game.reset();
			game.generateWord();
			game.placeHolder(game.currentWord);
			game.win++;
		}
		else if(game.isLose()){

			game.previousWord = game.currentWord;
			game.reset();
			game.generateWord();
			game.placeHolder(game.currentWord);
			game.lose++;
		}

		}
		else{

			alert("not a letter or already guessed")
		}			
	}
	

	var html = "<p> " + game.empty.join("").toUpperCase() +"</p>" +
	"<p> win: " + game.win + "</p>" + 
	"<p> lose: " + game.lose + "</p>" + 
	"<p> Guesses Left: " + game.Guesses + "</p>" + "<p> letters used:" + game.letterGuess.join(" / ").toUpperCase() + "</p>" + "<p> Previous Word: "
	+ game.previousWord.toUpperCase() + "</p>" ;

	document.querySelector("#game").innerHTML = html;
}


