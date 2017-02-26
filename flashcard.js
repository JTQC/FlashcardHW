//====================================
//Initalizing inquirer

var inquirer = require("inquirer");

//====================================


//====================================
//Creating Constructors

//Basic
function BasicCard(front, back){
this.front = front;
this.back = back
}

//Cloze

function ClozeCard(cloze, partial){
	this.cloze = cloze;
	this.partial = partial;
	this.fullText = function(){
		console.log(this.cloze + " " + this.partial);
	}
}

//====================================

//====================================
//creating array of cards 

var basicArray = [
firstPresident = new BasicCard("Who was the first president of the United States?","George Washington"),
secondPresident = new BasicCard("Who was the second president of the United States?", "John Adams"),
thirdPresident = new BasicCard("Who was the third president of the United States?", "Thomas Jefferson"),
fourthPresident = new BasicCard("Who was the fourth president of the United States?", "James Madison"),
fifthPresident = new BasicCard("Who was the fifth president of the United States?", "James Monroe")
]


var clozeArray = [
firstPresident = new ClozeCard("George Washington", "...was the first president of the United States."),
secondPresident = new ClozeCard("John Adams", "...was the second president of the United States."),
thirdPresident = new ClozeCard("Thomas Jefferson", "...was the third president of the United States."),
fourthPresident = new ClozeCard("James Madison", "...was the fourth president of the United States."),
fifthPresident = new ClozeCard("James Monroe", "...was the fifth president of the United States.")
]

//====================================

//====================================
//Front End GUI

//Switch statement to run either basic or cloze
var runCards = function() {
	inquirer.prompt(
	{
		type: "list",
		message: "Which flashcard would you like to use",
		choices: ["BasicCard", "ClozeCard"],
		name: "choice"
	}).then(function(answer){

		switch (answer.choice) {
			case "BasicCard":
				basicFunction();
				break;
		
			case "ClozeCard":
				clozeFunction();
				break;
		}
	});
};

var i = 0;

//Count variable for recursion
var cardCount = 0;

//Count variable for correct
var correctCount = 0;

//Count variable for incorrect
var incorrectCount = 0;

//Basic card function
var basicFunction = function() {
	
	//Move through array of questions
	if(cardCount < basicArray.length) {
	
		console.log(basicArray[i].front)

		inquirer.prompt(
			{
				type: "input",
				message: "What is your answer?",
				name: "basicAnswer"
			}
				).then(function(user){
					if(user.basicAnswer === basicArray[i].back){
						console.log("That's right!")
						correctCount++;
					}

					else{
						console.log("That's wrong!")
						incorrectCount++;
						console.log("The correct answer is" + " " + basicArray[i].back)
					}
				//up our count for recursion	
				cardCount++;
				//Cycle through array
				i++;
				//run function again for remaining cards
				basicFunction();
				})
	}
	
	else {
		console.log("You have finished all the cards!  You got" + " " + correctCount + " " + "right and " + " " + incorrectCount + " wrong.")
		//Ask user if they want to try again
		inquirer.prompt(
			{
			type: "list",
			message: "Would you like to start again?",
			choices: ["Yes", "No"],
			name: "yesOrNo"
			}
		).then(function(user){
			if(user.yesOrNo === "Yes"){
				cardCount = 0;
				basicFunction();
			}

			else if (user.yesOrNo === "No"){
				cardCount = 0;
				runCards();
			}
		})
	}
		

};

var clozeFunction = function() {
	
	//Move through array of questions
	if(cardCount < clozeArray.length) {
	
		console.log(clozeArray[i].partial)

		inquirer.prompt(
			{
				type: "input",
				message: "What is your answer?",
				name: "clozeAnswer"
			}
				).then(function(user){
					if(user.clozeAnswer === clozeArray[i].cloze){
						console.log("That's right!")
						correctCount++;
						clozeArray[i].fullText;
					}

					else{
						console.log("That's wrong!")
						incorrectCount++;
						console.log("The correct answer is" + " " + clozeArray[i].fullText)
					}
				//up our count for recursion	
				cardCount++;
				//Cycle through array
				i++;
				//run function again for remaining cards
				clozeFunction();
				})
	}
	
	else {
		console.log("You have finished all the cards!  You got" + " " + correctCount + " " + "right and " + " " + incorrectCount + " wrong.")
		//Ask user if they want to try again
		inquirer.prompt(
			{
			type: "list",
			message: "Would you like to start again?",
			choices: ["Yes", "No"],
			name: "yesOrNo"
			}
		).then(function(user){
			if(user.yesOrNo === "Yes"){
				cardCount = 0;
				clozeFunction();
			}

			else if (user.yesOrNo === "No"){
				cardCount = 0;
				runCards();
			}
		})
	}
		

};

runCards();