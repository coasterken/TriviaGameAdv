// Javascript and jquery for crystal collector

$(document).ready(function() {

// Perform initialize tasks
// Variables

var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

var timerSeconds = 60;
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

intervalId = setInterval(countdown, 1000);

 //********* Events 
 // Start logic
 $(".startButton").on("click", function() {
 
    //update display hero
    $(".startRow").addClass("hide");

    $.each(questions, function(key, value) {

      $(".triviaList").append('<div class="trivia">' + questions[key].question + "</div>");
      $(".triviaList").append('<form  class="radioForm_' + key + ' radioForm"></form>');
      var labelLeft = '<input type="radio" name="'
      
      $.each(questions[key].answers, function(index, value) {
        //  console.log(labelLeft + key + '_'+ index + '">' + value)
         $(".radioForm_" + key).append('<label class="radio-inline ' + key + index + '">');
         $("." + key + index).append(labelLeft + key + '"' + 'value="' + value + '">' + value);
       
      }) //********** end of radio button each loop

    })  //*********** end of main form creation

        //Add a done button to end of list
        $(".triviaList").append('<div><h3 class="text-primary doneButton">DONE</h3></div>');

  }) // *********** end of start button
 

  // The Done Button - user has finished selecting answers

  $(".triviaList").on("click", ".doneButton", checkAnswers);

  //check answers is called when time runs out or user clicks done
  function checkAnswers() {
   
    clearInterval(intervalId);  
    //loop based on questions object - 10 entries
    $.each(questions, function(key, value) {

      //get sets of radio buttons (q0, q1..)  Key equals radio button group name
      var radios = document.getElementsByName(key);
      var checkedValue = "";
      console.log(radios)
  
      // find the checked one, if it exists

      for (var i = 0; i < radios.length; i++) {

       if (radios[i].checked) {          
           checkedValue = radios[i].value; 
           break;  
        }
      }  //********** end of for loop

      if (checkedValue === "") {
        unanswered++;
      } else if (checkedValue === questions[key].correctAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }

    }) //********** end of each questions loop
    //hide the questions and done box
    $(".triviaList").addClass("hide");

    //Header for end page
    $(".main-container").append('<h1 class="text-primary">All Done!</h1><br><br>');
    $(".main-container").append('<h2 class="text-primary">Correct Answers: ' + correctAnswers + '</h2>');
    $(".main-container").append('<h2 class="text-primary">Incorrect Answers: ' + incorrectAnswers + '</h2>');
    $(".main-container").append('<h2 class="text-primary">Unanswered: ' + unanswered + '</h2>');

  }  // ********** end of check answers function

//Functions

function countdown() {

  timerSeconds--;
  $(".gameTimer").html(timerSeconds);

  if (timerSeconds === 0) {

    checkAnswers();
    clearInterval(intervalId);
  }

}



})  //********** end of document ready