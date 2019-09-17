// Initial Values
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer; 

// Display Question and choices in browser

function nextQuestion() {
  
  const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
  
  if (isQuestionOver) {
       
    displayResult();        //Supposed to call function displayResult and for some reason doesn't work?
    
    console.log("gameover");

  } else {
    
    currentQuestion++;
    
    loadQuestion();
  }
}

function timeUp() {
  clearInterval(timer);

  lost++;

  nextQuestion();
}

function countDown() {
  counter--;

  $('#time').html('Timer: ' + counter);

  if (counter === 0) {
      timeUp();
  }
}


function loadQuestion() {
  counter = 10;
  timer = setInterval(countDown, 1000);
  
  
  const question = quizQuestions[currentQuestion].question;
  const choices = quizQuestions[currentQuestion].choices;

  $('#time').html('Timer: ' + counter);
  $('#game').html(`
      <h4>${question}</h4>
      ${loadChoices(choices)}
      ${loadRemainingQuestion()}
  `);
    
}

function loadChoices(choices) {
  let result = "";

  for (let i = 0; i < choices.length; i++) {
    result += `<p class ="choice" data-answer=" ${choices[i]} "> ${choices[i]} </p>`;
  }

  return result;
}

$(document).on('click', '.choice', function() {
  clearInterval(timer);
  
  const selectedAnswer = $(this).attr('data-answer');
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

  if (correctAnswer === selectedAnswer) {
    
    score++;
    console.log("win");
    nextQuestion();
    
  } 
  else {
    
    lost++;
    console.log("lost");
    nextQuestion();
    
  }

});


function displayResult() {
  
  var result = `
  
  <p>You Got ${score} Question(s) Right!</p>
  <p>You Got ${lost} Question(s) Wrong!</p>
  <button id= "reset" class="btn btn-success">Replay Game</button>         
  `; // Doesn't Work. Need to correct the code.
}

// Reset Button


function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


$('#start').click(function() {
  
  $('#start').remove();
  $('#time').html(counter);
  loadQuestion();

});