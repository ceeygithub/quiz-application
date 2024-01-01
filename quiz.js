
const quiz = [
    {
        q: ` What will be the output of the following code snippet?
       
     <br/>
 var x=12; 

var y=8;
 var res=eval("x+y"); 

document.write(res);  `,
        options: ['20', 'x + y', '128', 'I dont know'
        ],
        ans: 0,
    },
    {
        q: ` Which of the keyword is used to define a variable in javascript
`,
        options: ['var', 'let', 'const', 'All of the above'
        ],
        ans: 3,
    },
    {
        q: ` Javascript is an _______ language?
`,
        options: ['Object oriented', 'Object - based', 'Procedural', 'None of the above'
        ],
        ans: 0,

    },
    {
        q: ` what would be log to the console in the code snippet below :
        <br/>
     <br/>
const language = "javascript";

if(language) {
console.log("Javascript is a programming language")
} else {
console.log("I don't know the language")

}`,
        options: ['python', 'PHP', 'Javascript is a programming language', "I don't know the language",
        ],
        ans: 2,
    },
    {
        q: ` Which of the following methods is used to access HTML elements using Javascript?
`,
        options: ['getElementbyId()', 'getElementsByClassName()', 'Both A  and  B', 'None of the above'
        ],
        ans: 2,
    },
    {
        q: ` HTML stands for`,
        options: [' Hypermark Language', 'Hypermix language', 'Hypertext Markup Language', 'Hypertension Language'
        ],
        ans: 2,

    },

    {
        q: `Which tag is used to create a check box`,
        options: ['&lt;checkbox&gt;', '&lt;input type="checkbox"&gt;', '&lt;type="checkbox"', '&lt;type="checkbox"'],
        ans: 1,
    },


    {
        q: ` Which attribute set the text direction`,
        options: ['  dir', ' lang', 'direction', 'sub'
        ],
        ans: 0,

    },
    {
        q: ` HTML is subset of which of the following`,
        options: ['  GHL', ' SHL', 'SGHL', 'SGML'
        ],
        ans: 3,

    },
    {
        q: ` Which of the following statement is true?`,
        options: ['  SVG needs scripts to draw elements', ' In canvas, drawing is done with pixels', 'SVG do not support to event handlers', 'Canvas Contains built-in animations'
        ],
        ans: 1,

    },
    {
        q: `Which of the following specifies initial length of flex item?`,
        options: ['  flex-shrink', ' flex-basis', 'flex-grow', 'flex-flow'
        ],
        ans: 1,

    },

]


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;

const questionNumber = document.querySelector('.question-number');
const question = document.querySelector('.question');
const optionContainer = document.querySelector('.option-container');
const indicatorContainer = document.querySelector('.indicators');
const homeBox = document.querySelector('.container');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

// add event to next button
const nextQuestion = document.querySelector('.nxtBtn');
nextQuestion.addEventListener('click', () => {
    if (questionCounter === quiz.length) {
        quizOver();

    }
    else {
        getNewQuestions();

    }
});

function quizOver() {
    clearInterval(timerInterval);
    homeBox.classList.add('hide')
    quizBox.classList.add('hide')
    resultBox.classList.remove('hide')
    quizResult();

}

// add event to start button
const startBtn = document.querySelector('.hero-btn');
startBtn.addEventListener('click', () => {
    quizBox.classList.remove('hide');
    resetQuiz();
    setAvailableQuestions(); // Reset available questions
    getNewQuestions();
    updateBackground();
    resultBox.classList.add('hide')
    homeBox.classList.add('hide')
    startTimer();
})


const tryAgain = document.querySelector('.try');
tryAgain.addEventListener('click', () => {
    quizBox.classList.remove('hide');
    updateBackground();
    resultBox.classList.add('hide');
    homeBox.classList.add('hide');
    timeRemaining = timerDuration;
    resetQuiz();
    startTimer();
    setAvailableQuestions(); // Reset available questions
    getNewQuestions();
});

// add event to back to home button
const back = document.querySelector('.back');
back.addEventListener('click', () => {

    updateBackground();
    quizBox.classList.add('hide')
    resultBox.classList.add('hide')
    homeBox.classList.remove('hide')
    // document.body.style.background = "";
    timeRemaining = timerDuration;
    resetQuiz();
    startTimer();
    setAvailableQuestions(); // Reset available questions
    getNewQuestions();
})

function updateBackground() {
    const darkMode = document.body.classList.contains('darkTheme');
    // const imageURL = darkMode
    //     ? 'url("https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
    //     : 'url("https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")';

    // document.body.style.background = `${imageURL} no-repeat center center/cover`;
    document.body.style.background = darkMode ? 'var(--bgColor)' : 'var(--bgColor)';
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswer = 0;
    attempt = 0;

}



function setAvailableQuestions() {
    totalQuestions = quiz.length;
    for (let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(quiz[i])
    }

}

function getNewQuestions() {

    if (availableQuestions.length === 0) {
        quizOver();
        return;
    }

    // set question number
    questionNumber.innerHTML = "Question" + ' ' + (questionCounter + 1) + " of" + '  ' + quiz.length;

    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    question.innerHTML = currentQuestion.q;
    // console.log(currentQuestion.q);
    // get postion of questionIdex from available Question array
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove questionIdex from available Question array so it does not
    availableQuestions.splice(index1, 1)
    // get the length of options
    const optionLength = currentQuestion.options.length;
    // push options into availableOptions
    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i)
    }


    // display options
    let animationDelay = 0.2;
    optionContainer.innerHTML = '';
    for (let i = 0; i < optionLength; i++) {
        // random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of  optionIndex from  availableOptions
        const index2 = availableOptions.indexOf(optionIndex);
        // remove optionIndex from  availableOptions so it doesnt repeat
        availableOptions.splice(index2, 1);
        const option = document.createElement('div')
        option.innerHTML = currentQuestion.options[i];
        option.id = i;
        // option animation
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute('onclick', "getResult(this)")
    }
    // optionContainer.innerHTML = '';
    // currentQuestion.options.forEach((option, index) => {
    //     const optionElement = document.createElement('div');
    //     optionElement.innerHTML = option;
    //     optionElement.id = index;
    //     optionElement.className = 'option';
    //     optionContainer.appendChild(optionElement);
    // });
    questionCounter++;
}
// get the result of the current question attempt
function getResult(element) {
    const id = parseInt(element.id);
    if (id === currentQuestion.ans) {
        element.style.background = "green"
        element.style.color = "white"
        correctAnswer++;
    }
    else {
        element.style.background = 'red';
        element.style.color = "white"
        const optionLen = optionContainer.children.length;

        for (let i = 0; i < optionLen; i++) {
            const option = optionContainer.children[i];
            const optionId = parseInt(option.id);

            if (optionId === currentQuestion.ans) {
                option.style.background = "green";
                option.style.color = "white";
            }
        }
    }
    attempt++;
    unclickableOption();
}
// make options unclickable after user selects an option
function unclickableOption() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].style.pointerEvents = 'none';
    }
}


// get quiz result
function quizResult() {
    resultBox.querySelector('.totalQuestion').innerHTML = quiz.length;
    resultBox.querySelector('.attempt').innerHTML = attempt;
    resultBox.querySelector('.correct').innerHTML = correctAnswer;
    resultBox.querySelector('.wrong').innerHTML = attempt - correctAnswer;
    const percentage = (correctAnswer / quiz.length) * 100
    resultBox.querySelector('.percentage').innerHTML = percentage.toFixed() + '%';
    resultBox.querySelector('.totalScore').innerHTML = correctAnswer + "/" + quiz.length;

}



let timerDuration = 60; // Set the timer duration in seconds
let timerInterval; // Variable to store the interval ID
let timeRemaining = timerDuration; // Variable to track remaining time

function startTimer() {
    timerInterval = setInterval(function () {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.querySelector('.timer').textContent = formattedTime;


        if (timeRemaining <= 0 || questionCounter === quiz.length) {
            clearInterval(timerInterval);
            quizOver();
        } else {
            timeRemaining--;
        }
    }, 1000);
}


window.onload = () => {

    setAvailableQuestions();
    getNewQuestions();
    quizBox.classList.add('hide')
    resultBox.classList.add('hide')
    homeBox.classList.remove('hide')

}