let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag a ?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Mit welchem Zeichen steuert man ein Kindelement an?",
        "answer_1": ">",
        "answer_2": "#",
        "answer_3": "+",
        "answer_4": "~",
        "right_answer": 1
    },
    {
        "question": "Mit welchem Befehl verändert man die Höhe?",
        "answer_1": "width",
        "answer_2": "height",
        "answer_3": "brigthness",
        "answer_4": "length",
        "right_answer": 2
    },
    {
        "question": "Wie definiert man in JS eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    }

];

let rightQuestions = 0;
let currentQuestion = 0;
let audio_success = new Audio('audio/right.mp3');
let audio_fail = new Audio('audio/wrong.mp3');

function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {  
        showEndScreen();
    }
    else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    // Show End Screen
    document.getElementById('endScreen').style = ``;
    document.getElementById('questionBody').style = `display: none`;
    document.getElementById('amountOfQuestions').innerHTML = questions.length;
    document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.png';
    document.getElementById('header-image').classList.remove('card-img-top');
    document.getElementById('header-image').classList.add('endScreenMargin');
    let percent = (currentQuestion) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `100 %`;
    document.getElementById('progress-bar').style = `width: 100%`;
}

function updateToNextQuestion() {
    // Show question
    let question = questions[currentQuestion];
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar() {
    let percent = (currentQuestion) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    console.log('Selected answer is ', selection);
    let selectedQuestionNumber = selection.slice(-1);
    console.log('selectedQuestionNumber is ', selectedQuestionNumber);
    console.log('Current question is ', question['right_answer']);

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        console.log('Richtig');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audio_success.play();
        rightQuestions++;

    }
    else {
        console.log('Falsch');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_fail.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++; //z.B. von 0 auf 1
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {

    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function restartGame() {
    document.getElementById('header-image').src = './img/bg b.png';
    document.getElementById('header-image').classList.add('card-img-top');
    document.getElementById('header-image').classList.remove('endScreenMargin');
    document.getElementById('questionBody').style = ``; //questionBody wieder anzeigen
    document.getElementById('endScreen').style = `display: none`; //Endscreen ausblenden
    rightQuestions = 0;
    currentQuestion = 0;


    init();
}

