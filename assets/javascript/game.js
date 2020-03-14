/* GAME STRUCTURE:
- Have an array of words
- Pick a random word from the array
- The player will guess letters and try to guess the word
- Check that the letters pressed are valid
- Keep track of letters already guessed
- Display letters guessed correctly 
- Finish when player guesses word or runs out of guesses.*/

// Array that contains all the possible words to be guessed.
var ninjaTurtles = [
	'shredder',
	'splinter',
	'donatello',
	'michelangelo',
	'raphael',
	'leonardo',
	'apriloneil',
	'caseyjones',
	'footclan',
	'krang',
	'rocksteady',
	'bebop',
	'metalhead',
	'triceratons',
	'baxter'
];

// These are my global variables

// This var will store the random word chosen as a string
var currentWord = '';
// This var will store the random words letters in a array
var currWrdLtrs = [];
// This var will count the number of letters in the random word chosen
var numBlanks = 0;
// This var will store the correct letters chosen for the current word
var answerDisplay = [];
// This var will store the incorrect letters chosen for the current word
var wrongLtrs = [];

//Game Stat variables to track progress
// A variable that begins at 0 to track wins
var wins = 0;
// A variable that begins at 0 to track losses
var losses = 0;
// A variable that begins at 9 to track guesses remaining that will rest after
//  winning or losing each round
var guessesLeft = 9;

// FUNCTIONS

function newGame() {
	// Here we are assigning a random word from the array to the currentWord var
	// & logging it in the console
	currentWord = ninjaTurtles[Math.floor(Math.random() * ninjaTurtles.length)];
	console.log('The current word chosen is: ' + currentWord);

	// Here we are splitting the letters in the random word chosen by using the .split
	// method & logging it to the console
	currWrdLtrs = currentWord.split('');
	console.log("The current word's letters are: " + currWrdLtrs);

	// here we are counting the number of letters in the random word chosen &
	// logging it to the console
	numBlanks = currWrdLtrs.length;
	console.log('The number of letters in the current word is: ' + numBlanks);

	guessesLeft = 9;
	wrongLtrs = [];
	answerDisplay = [];

	// A for loop that runs each time i is less than numBlanks and .pushes an underscore
	// for the number of letters to the otherwise empty answerDisplay variable &
	//console logs it
	for (i = 0; i < numBlanks; i++) {
		answerDisplay.push('_');
		console.log(answerDisplay);
	}

	// Here we are tracking html elements by their Id and updating our
	// vars to show on the document as we progress with wins,
	// losses, guesses remaining and displaying the correct letters guessed
	//  by replacing the underscores
	document.getElementById('theWord').innerHTML = answerDisplay.join(' ');
	document.getElementById('remGuesses').innerHTML = 'Number of Guesses Remaining: ' + ' ' + guessesLeft;
	document.getElementById('wins').innerHTML = 'Wins: ' + ' ' + wins;
	document.getElementById('losses').innerHTML = 'Losses: ' + ' ' + losses;
}

// With this function we are tracking which letters have already been guessed
function checkLtrs(letter) {
	// In this if/else statement we are saying that if a key being selected is not in
	// the event.keyCode range between 65 and 90 then we wont run the rest of
	// the code and (else) display an alert telling the player to select a valid key within that range
	if (event.keyCode >= 65 && event.keyCode <= 90) {
		// This is a local variable that only pertains to this code block
		var correctLetter = false;

		// If the condition above is true then we will run the code below

		// In this for loop we are saying that if var i is less than numBlanks
		// then run the if statement nested inside
		for (var i = 0; i < numBlanks; i++) {
			// In this if statement we are saying that if the condition
			// currentWord var ='s a valid letter picked then the correctLetter var
			// becomes true
			if (currentWord[i] == letter) {
				correctLetter = true;
			}
		}

		// In this if/else statement we are saying that if the correctLetter var
		// becomes true then run the if statement nested in the for loop, If not
		// then run the else statement
		if (correctLetter) {
			// This for loop will run as long as i is less than numBlanks in the
			// random word chosen. As long as i is less than numBlanks the if
			// statement nested inside will run
			for (var i = 0; i < numBlanks; i++) {
				// This if statement is saying that as long as the currentWord var is
				// equal to a valid letter chosen then it will update the
				// answerDisplay var with the valid letter picked
				if (currentWord[i] == letter) {
					answerDisplay[i] = letter;
				}
			}
			// If the above conditions are not met then this else statement will
			// trigger which will .push the incorrect letters selected to the
			// display and minus 1 from the guesses left also on the display
		} else {
			wrongLtrs.push(letter);
			guessesLeft--;
		}
		console.log(answerDisplay);
		// This else will trigger an alert if an invalid key is pressed
	} else {
		alert('Please be sure to select a letter from the Alphabet (from a to z)');
	}
}

// This function tracks whether the player wins the game by guessing the correct
// word, or loses by using all of their alloted guesses. If the player wins or loses it
// will trigger a reset/newGame and begin a new round while updating the wins and losses html on
// the document
function roundComplete() {
	console.log('Win count: ' + wins + ' | Loss Count: ' + losses + ' | Guesses Left: ' + guessesLeft);

	// Here we are selecting html elements by their Id and updating those
	// elements on the document with the current game stats when either winning or
	// losing the game
	document.getElementById('remGuesses').innerHTML = 'Number of Guesses Remaining: ' + ' ' + guessesLeft;
	document.getElementById('theWord').innerHTML = answerDisplay.join(' ');
	document.getElementById('guessedLetters').innerHTML = 'Letters Already Guessed:' + ' ' + wrongLtrs.join(' ');

	// In this if/else if statement we saying that if the currWrdLtrs var is = to the
	// answerDisplay var then the player wins the round, we add + 1 to the wins
	// var, update the html wins element in the document, alert the message for
	// winning, and trigger the newGame function.
	// Else if, the guesses left = 0, we + 1 to the losses var, update the html
	// losses element in the document, alert the message for losing, and trigger
	// the newGame function.
	if (currWrdLtrs.toString() == answerDisplay.toString()) {
		wins++;
		alert("Cowabunga Dude! You totally guessed '" + currentWord + "' correctly! Play again?");
		console.log('YOU WIN!');

		document.getElementById('wins').innerHTML = 'Wins: ' + ' ' + wins;

		newGame();
		document.getElementById('guessedLetters').innerHTML = 'Letters Already Guessed:' + ' ' + ' ';
	} else if (guessesLeft == 0) {
		losses++;
		alert("Bummer! You have 0 guesses left. The correct word was '" + currentWord + "'. Do you want to try again?");
		console.log('You Lost!');

		document.getElementById('losses').innerHTML = 'Losses: ' + ' ' + losses;

		newGame();
		document.getElementById('guessedLetters').innerHTML = 'Letters Already Guessed:' + ' ' + ' ';
	}
}

// MAIN PROCESS

// Here we are calling the newGame function to start the game for the first time
newGame();

// Here we are tracking the input from the player on which keys have been
// pressed with a key event which runs the function below and the functions within
document.onkeyup = function(event) {
	// Here we are creating a new local variable that will only run inside of
	// this code block
	// The ltrsGuessed var will store all of the letters that have been guessed
	// and log it in the console
	var ltrsGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	console.log('You Guessed the letter: ' + ltrsGuessed);

	// Here we are calling the checkLtrs and roundComplete functions
	checkLtrs(ltrsGuessed);
	roundComplete();
};
