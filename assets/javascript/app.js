// Javascript and jquery for crystal collector

$(document).ready(function() {

// Perform initialize tasks
// Variables

var rightAnswer = true;

var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

var questionNumber = 0

var timerSeconds = 0;
var timeToWait = 30;
var intervalId;


var questions = {
  q0: {question: "World's tallest steel coaster?",
       answers: ["Millenium Force",
                 "Fury 325",
                 "Steel Dragon",
                 "Kingda Ka",
                 "Leviathan"
                ],
       correctAnswer: "Kingda Ka" 
        },
  q1: {question: "World's tallest wooden coaster?",
       answers: ["Wildfire",
                 "Colossos",
                 "The Voyage",
                 "Lightning Rod",
                 "Great American Scream Machine"
                ],
       correctAnswer: "Colossos" 
        },
  q2: {question: "World's fastest steel coaster?",
       answers: ["Formula Rossa",
                 "Kingda Ka",
                 "Red Force",
                 "Steel Dragon",
                 "Leviathan"
                ],
       correctAnswer: "Formula Rossa" 
        },
  q3: {question: "World's fastest wooden coaster?",
       answers: ["Colossos",
                 "Outlaw Run",
                 "El Toro",
                 "Goliath",
                 "Lightning Rod"
                ],
       correctAnswer: "Lightning Rod" 
        },
  q4: {question: "World's longest steel coaster?",
       answers: ["Millenium Force",
                 "Fury 325",
                 "Steel Dragon",
                 "Kingda Ka",
                 "Leviathan"
                ],
       correctAnswer: "Steel Dragon" 
        },
  q5: {question: "World's longest wooden coaster?",
       answers: ["Mean Streak",
                 "The Boss",
                 "The Voyage",
                 "Jupiter",
                 "The Beast"
                ],
       correctAnswer: "The Beast" 
        },
  q6: {question: "Steel coaster with most inversions?",
       answers: ["The Smiler",
                 "Colossos",
                 "Altair",
                 "Flight Deck",
                 "Crazy Coaster"
                ],
       correctAnswer: "The Smiler" 
        },
  q7: {question: "Wooden coaster with most inversions?",
       answers: ["Wildfire",
                 "Goliath",
                 "Hades 360",
                 "Mine Blower",
                 "Outlaw Run"
                ],
       correctAnswer: "Outlaw Run" 
        },
  q8: {question: "World's most beautiful theme park?",
       answers: ["Carowinds",
                 "Busch Gardens Williamsburg",
                 "Busch Gardens Tampa",
                 "Dollywood",
                 "Cedar Point"
                ],
       correctAnswer: "Busch Gardens Williamsburg" 
        },
  q9: {question: "World's friendliest theme park?",
       answers: ["Carowinds",
                 "Busch Gardens Williamsburg",
                 "Busch Gardens Tampa",
                 "Dollywood",
                 "Cedar Point"
                ],
       correctAnswer: "Dollywood" 
        }  
}

//Stuff to run at load time
$(".questionRow").addClass("hide");
$(".answerPage").addClass("hide");
$(".gameTimer").html(timeToWait);

//********* Events 
// Start logic
$(".startButton").on("click", function() {

  // hide start button
  $(".startRow").addClass("hide");

  //display first question
  displayQuestion();

}) // *********** end of start button


//********** this happens when a user selects an answer
$(".answerBox").on("click", function() {

  clearInterval(intervalId);

  if ($(this).data("rightAnswer") === true) {
    
    displayCongratsPage();

  } else {
    
    displaySorryPage("incorrect");
  }

})
  
//**********  Functions  **********

// displays the questions and answers
function displayQuestion() {

  //Counter for total questions in object
  if (questionNumber === Object.keys(questions).length) {
    displayResults();
    return;
  }

  //start the timer
  timerSeconds = timeToWait;
  $(".gameTimer").html(timerSeconds);
  intervalId = setInterval(countdown, 1000);

  //display question on page

  $(".answerPage").addClass("hide");
  $(".questionRow").removeClass("hide");

  var objKey = "q" + questionNumber;

  $(".trivia").html(questions[objKey].question);

  $.each(questions[objKey].answers, function(index, value) {
  //  console.log(labelLeft + key + '_'+ index + '">' + value)

   $("#answerBox" + index).html(value);
     if (questions[objKey].correctAnswer === value) {
        rightAnswer = true;
     } else {
        rightAnswer = false;
     }
   $("#answerBox" + index).data("rightAnswer", rightAnswer);
 
  }) //********** end of answer loop

  questionNumber++;
} //********** end of display quesiton

//Congrats Page - displays if the answer is correct

function displayCongratsPage() {

   correctAnswers++
   //hide the questions
   $(".questionRow").addClass("hide");
   $(".ansExclaim").html("Correct!");
   $(".ansMessage1").html("U So Good!");
   $(".ansMessage2").html("");  
   $(".answerPage").removeClass("hide");

   setTimeout(displayQuestion, 3000);

}  //  ********* end of congrats page function

function displaySorryPage(type) {

  var mainMessage = "";

  if (type === "timer") {
    unanswered++;
    mainMessage = "Sorry - The Timer Expired!";
  } else {
    incorrectAnswers++;
    mainMessage = "Sorry!";
  }

   //hide the questions
   var theAnswer = "";

  for (var i = 0; i < 5; i++) {
    if ($("#answerBox" + i).data("rightAnswer") === true ) {
      theAnswer = $("#answerBox" + i).html();
      break;
    }
  }

  $(".questionRow").addClass("hide");
  $(".ansExclaim").html(mainMessage);
  $(".ansMessage1").html("The correct answer is " + theAnswer);
  $(".ansMessage2").html("");  
  $(".answerPage").removeClass("hide");

   setTimeout(displayQuestion, 3000);

}  //  ********* end of congrats page function

function displayResults() {

  $(".gameTimer").html(0);
  $(".ansExclaim").html("Game Over ");
  $(".ansMessage1").html("Correct Answers: " + correctAnswers);
  $(".ansMessage2").html("Incorrect Answers: " + incorrectAnswers);  
  $(".ansImg").html("Unanswered: " + unanswered);

}

function countdown() {

  timerSeconds--;
  $(".gameTimer").html(timerSeconds);

  if (timerSeconds === 0) {

    displaySorryPage("timer");
    clearInterval(intervalId);
  }

}



})  //********** end of document ready