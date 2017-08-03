var wordZ = ["Madonna", "Bertrand Russell","Lion King","Hoola Hoop","Schopenhauer","gladiator","soarise","figs","aristotle", "Plato","odysseus","ramsis","napoleon","Television", "rope", "chair", "marmalade"];

var alphabet = ["a","b","c","d","e","f",
"g","h","i","j","k","l","m","n","o","p",
"q","r","s","t","u","v","w","x","y","z"];

var playerGuess = "";

// canvas functions:
// -----------------
function drawArc(){
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.arc(187.5, 50 , 50, 0, Math.PI * 2, false);
ctx.strokeStyle = "white";
ctx.stroke();
}

function drawbod(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(187.5,100);
	ctx.lineTo(187.5,250);
	ctx.strokeStyle = "white";
	ctx.stroke();
}

function drawRarm(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(187.5,150);
	ctx.lineTo(230,180);
	ctx.strokeStyle = "white";
	ctx.stroke();
}

function drawLarm(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(187.5,150);
	ctx.lineTo(145,180);
	ctx.strokeStyle = "white";
	ctx.stroke();

}

function drawRleg(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(187.5,250);
	ctx.lineTo(230,280);
	ctx.strokeStyle = "white";
	ctx.stroke();
}

function drawLleg(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(187.5,250);
	ctx.lineTo(145,280);
	ctx.strokeStyle = "white";
	ctx.stroke();
}

function clearC(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.clearRect(0, 0, 375, 400);
}


// game object
// -----------
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
	clearC();
	
},

placeHolder: function (str){

	for(j=0;j<str.length;j++){
		if(str[j] == " "){

			this.empty.push(" ");
		}else{
		this.empty.push("_");
		}
	};

},

generateWord: function(){ //come back later and prevent replication of generated words during game. 

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
			
			if(game.Guesses == 5){

				drawArc();
			}
			else if(game.Guesses == 4){

				drawbod();
			}
			else if(game.Guesses == 3){

				drawLarm();
			}
			else if(game.Guesses == 2){

				drawRarm();
			}
			else if(game.Guesses == 1){

				drawLleg();
			}
			else if(game.Guesses == 0){

				drawRleg();
			}
			
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
	

	

	var play = "<p> " + game.empty.join("").toUpperCase() +"</p>" + "<br>" + "<p> Win: " + game.win + " " + " Lose: "+ game.lose + "</p>" +
	
	"<p> Guesses Left: " + game.Guesses + "</p>" + "<p> Letters Used:" + game.letterGuess.join(" / ").toUpperCase() + "</p>" + "<p> Previous Word: "
	+ game.previousWord.toUpperCase() + "</p>";

	
	document.querySelector("#score").innerHTML = play;
}