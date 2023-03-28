// Define the list of words for the typing test
const words = [
	"programming",
	"javascript",
	"developer",
	"function",
	"variable",
	"object",
	"array",
	"string",
	"number",
	"boolean",
	"html",
	"css",
	"server",
	"database",
	"algorithm"
];

// Define variables for the game state
let targetWord = "";
let inputWord = "";
let wordIndex = 0;
let correctCount = 0;
let startTime = 0;
let endTime = 0;

// Define references to HTML elements
const targetTextElement = document.getElementById("target-text");
const inputTextElement = document.getElementById("input-text");
const userInputElement = document.getElementById("user-input");

// Generate a random word from the list for the user to type
function generateWord() {
	const randomIndex = Math.floor(Math.random() * words.length);
	return words[randomIndex];
}

// Update the target and input text elements
function updateText() {
	targetTextElement.textContent = targetWord;
	inputTextElement.textContent = inputWord;
}

// Handle the user input
function handleInput() {
	// Get the user input value
	const userInputValue = userInputElement.value;

	// If the user finished typing the current word
	if (userInputValue.endsWith(" ")) {
		// Remove the trailing space from the input
		inputWord = inputWord.trim();

		// If the input word matches the target word
		if (inputWord === targetWord) {
			// Increment the correct count and reset the input word
			correctCount++;
			inputWord = "";
			wordIndex++;

			// If the user finished typing all the words
			if (wordIndex === words.length) {
				// Calculate the elapsed time
				endTime = Date.now();
				const elapsedTime = (endTime - startTime) / 1000;

				// Calculate the words per minute and accuracy
				const wpm = Math.round((correctCount / elapsedTime) * 60);
				const accuracy = Math.round((correctCount / words.length) * 100);

				// Display the results
				inputWord = `WPM: ${wpm} / Accuracy: ${accuracy}%`;
				updateText();

				// Disable the input element
				userInputElement.disabled = true;
			} else {
				// Generate the next target word
				targetWord = generateWord();
			}
		} else {
			// Reset the input word
			inputWord = "";
		}

		// Update the text elements
		updateText();
	} else {
		// Update the input word
		inputWord = userInputValue;
		updateText();
	}
}

// Initialize the game
function initializeGame() {
	// Generate the first target word
	targetWord = generateWord();

	// Set the start time
	startTime = Date.now();

	// Attach the handleInput function to the input element
	userInputElement.addEventListener("input", handleInput);

	// Focus on the input element
	userInputElement.focus();
}

// Start the game when the page is loaded
window.addEventListener("load", initializeGame);
