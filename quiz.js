
const body = document.getElementById("body");
const startButton = document.querySelector("#start-btn");
const nextButton = document.querySelector("#next");
const quizInfo = document.querySelector("#quiz-info");
const quizContent = document.querySelector("#quiz-content");
const quizQuestion = document.querySelector(".quizHeading");
const quizOption = document.querySelector(".options");
const quiz = document.querySelector("#quiz");
const score = document.querySelector(".score-text");
let counter = document.querySelector(".counter-number");

let points= 0,
    count = 0;
    
let sortQuestions, 
    currentIndex, 
    currentQuestion,
    option1,
    option2,
    option3,
    option4;

body.classList.add("body-flex");

function startGame() {
	quizInfo.classList.add("hide");

	setTimeout(() => {
		body.classList.remove("body-flex");
		quizContent.classList.remove("hide");
	}, 300);

	currentIndex = 0;
    points = 0;
    
	sortQuestions = questions.sort(() => {
		return Math.random() - 0.5;
	});
	nextQuestion();
};

const resetState = () => {
	nextButton.classList.add("hide");
	if (quizOption.firstChild) {
		quizOption.innerHTML = "";
	}
};

const nextQuestion = () => {
	resetState();
	currentQuestion = sortQuestions[currentIndex];
	displayQuestions(currentQuestion);
};



const displayQuestions = (question) => {
	quizQuestion.textContent = question.question;

	question.options.forEach((option, index) => {
		index++;
		const button = document.createElement("button");
		button.innerHTML = option;
		button.classList.add("optionlist");
		button.classList.add(`optionlist-${index}`);
		quizOption.classList.remove("pointer-fix");

		quizOption.appendChild(button);

		if (question.answer === index) {
			button.dataset.correct = question.answer;
		}
		option1 = document.querySelector(".optionlist-1");
		option2 = document.querySelector(".optionlist-2");
		option3 = document.querySelector(".optionlist-3");
		option4 = document.querySelector(".optionlist-4");
		button.addEventListener("click", checkAnswer);
	});
};

/**********************************
 * Check if the selected option is correct or wrong
 */

const checkAnswer = (e) => {
	const selectedOption = e.target;
	const correct = selectedOption.dataset.correct;

	if (correct) {
		count++;
		points += 5;
		score.textContent = `${points}`;
		quizOption.classList.add("pointer-fix");
		selectedOption.classList.add("correct");

		counter.innerText = `${count} of ${sortQuestions.length}`;
	} else {
		quizOption.classList.add("pointer-fix"); 
		selectedOption.classList.add("incorrect");
	
		if (currentQuestion.answer === 1) {
			option1.classList.add("correct");
		} else if (currentQuestion.answer === 2) {
			option2.classList.add("correct");
		} else if (currentQuestion.answer === 3) {
			option3.classList.add("correct");
		} else if (currentQuestion.answer === 4) {
			option4.classList.add("correct");
		}
	}

	if (sortQuestions.length > currentIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		setTimeout(() => {
			showResults();
		}, 200);
	}
};


const showResults = () => {
	quiz.innerHTML = "";
	document.body.classList.add("body-flex");
	const markup = `
    <div class="quizEnd">
        <h1 class="headingEnd-1">Game Over!</h1>
        <h2 class="headingEnd-2">
        Your score is: 
        </h2>
        <p class="score">${points}</p>
        <button id="btn-reload" class="btn-reload next">
            Restart
        </button>
    </div>
    `;

	quiz.insertAdjacentHTML("afterbegin", markup);

	document.getElementById("btn-reload").addEventListener("click", () => {
		window.location.reload();
	});
};

 //Questions
 

const questions = [
	{
		question: "Who was the protagonist in the movie titled \'Extraction'\?",
		options: [
			'John cena',
			"Chris Hemsworth",
			"Reekado Banks",
			'Lupe Fiasco'
		],
		answer: 2,
	},

	{
		question: `What is the latest Global Pandemic Diseases affecting the world right now?`,
		options: [
			'Malaria',
			'Covid-19',
			'Chicken pox',
			'Dysentry'
		],
		answer: 2,
	},

	{
		question: `Who is Bruno Fernandes?`,

		options: [
			'Footballer',
			'Actor',
			'Dancer',
			'Pilot'
		],
		answer: 1,
	},

	{
		question: 'Which of this is wrong?',

		options: [
			'Kahoot',
			'WhatsApp',
			'Twitter',
			'Instagram'
		],
		answer: 1,
	},

	{
		question: 'Who is the founder of HNG?',

		options: [
			'Gregory Mark',
			'Gospel Mark',
			'David Bakar',
			'Mark Essien'
		],
		answer: 4,
	},
];


startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
	currentIndex++;
	nextQuestion();
}); 



