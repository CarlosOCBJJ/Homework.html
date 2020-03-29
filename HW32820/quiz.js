var questions = [
  {
    question: "1. How do you write 'Hello World' in an alert box?",
    choices: [
      "msg('Hello World')",
      "msgBox('Hello World');",
      "alertBox('Hello World');",
      "alert('Hello World');"
    ],
    correctAnswer: 3
  },
  {
    question: "2. Inside which HTML element do we put the JavaScript?",
    choices: [
      "<js>",
      "<script>",
      "<scripting>",
      "<javascript>"
    ],
    correctAnswer: 2
  },
  {
    question:
      "3. What function to add an element at the begining of an array and one at the end?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choices: ["<Head> & <Body>, <Head>, <Body>"],
    correctAnswer: 0
  },
  {
    question:
      "5. What would following code return? console.log(typeof typeof 1);",
    choices: ["string", "number", "Syntax error", "undefined"],
    correctAnswer: 0
  },
  {
    question: "6. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1
  },
  {
    question: "7. What would be the result of 3+2+'7'?",
    choices: ["327", "12", "14", "57"],
    correctAnswer: 3
  },
  {
    question:
      "8. Look at the following selector: $('div'). What does it select?",
    choices: [
      "The first div element",
      "The last div element",
      "All div elements",
      "Current div element"
    ],
    correctAnswer: 2
  },
  {
    question: "9. How can a value be appended to an array?",
    choices: [
      "arr(length).value;",
      "arr[arr.length]=value;",
      "arr[]=add(value);",
      "None of these"
    ],
    correctAnswer: 1
  },
  {
    question:
      "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: ["'32'", "'122'", "'13'", "'14'"],
    correctAnswer: 0
  }
];

var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 180;
var t;
$(document).ready(function () {
  // Display the first question
  displayCurrentQuestion();
  $(this).find(".quizMessage").hide();
  $(this).find(".preButton").attr("disabled", "disabled");

  timedCount();

  $(this)
    .find(".preButton")
    .on("click", function () {
      if (!quizOver) {
        if (currentQuestion == 0) {
          return false;
        }

        if (currentQuestion == 1) {
          $(".preButton").attr("disabled", "disabled");
        }

        currentQuestion--; 
        if (currentQuestion < questions.length) {
          displayCurrentQuestion();
        }
      } else {
        if (viewingAns == 3) {
          return false;
        }
        currentQuestion = 0;
        viewingAns = 3;
        viewResults();
      }
    });
  $(this)
    .find(".nextButton")
    .on("click", function () {
      if (!quizOver) {
        var val = $("input[type='radio']:checked").val();

        if (val == undefined) {
          $(document).find(".quizMessage").text("Please select an answer");
          $(document).find(".quizMessage").show();
        } else {
          TODO: Remove any message -> 
          $(document).find(".quizMessage").hide();
          if (val == questions[currentQuestion].correctAnswer) {
            correctAnswers++;
          }
          iSelectedAnswer[currentQuestion] = val;

          currentQuestion++; 
          if (currentQuestion >= 1) {
            $(".preButton").prop("disabled", false);
          }
          if (currentQuestion < questions.length) {
            displayCurrentQuestion();
          } else {
            displayScore();
            $("#iTimeShow").html("Quiz Time Completed!");
            $("#timer").html(
              "You scored: " + correctAnswers + " out of: " + questions.length
            );
            c = 185;
            $(document).find(".preButton").text("View Answer");
            $(document).find(".nextButton").text("Play Again?");
            quizOver = true;
            return false;
          }
        }
      } else {
        quizOver = false;
        $("#iTimeShow").html("Time Remaining:");
        iSelectedAnswer = [];
        $(document).find(".nextButton").text("Next Question");
        $(document).find(".preButton").text("Previous Question");
        $(".preButton").attr("disabled", "disabled");
        resetQuiz();
        viewingAns = 1;
        displayCurrentQuestion();
        hideScore();
      }
    };
});

function timedCount() {
  if (c == 185) {
    return false;
  }

  var hours = parseInt(c / 3600) % 24;
  var minutes = parseInt(c / 60) % 60;
  var seconds = c % 60;
  var result =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  $("#timer").html(result);

  if (c == 0) {
    displayScore();
    $("#iTimeShow").html("Quiz Time Completed!");
    $("#timer").html(
      "You scored: " + correctAnswers + " out of: " + questions.length
    );
    c = 185;
    $(document).find(".preButton").text("View Answer");
    $(document).find(".nextButton").text("Play Again?");
    quizOver = true;
    return false;
  }

  if(c == 0 )
		{	
			if (!quizOver) 
			{
				var val = $("input[type='radio']:checked").val();
            	if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				currentQuestion++; 
				
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					c=15;
				} 
				else 
				{
					displayScore();
					$('#timer').html('');
					c=16;
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
				}
			}
			else 
			{ 
				quizOver = false;
				$(document).find(".nextButton").text("Next Question");
				resetQuiz();
				displayCurrentQuestion();
				hideScore();
			}		
		}	*/
  c = c - 1;
  t = setTimeout(function () {
    timedCount();
  }, 1000);
}


function displayCurrentQuestion() {
  if (c == 185) {
    c = 180;
    timedCount();
  }
  console.log("In display current Question");
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
 
  $(questionClass).text(question);
  $(choiceList).find("li").remove();
  var choice;

  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];

    if (iSelectedAnswer[currentQuestion] == i) {
      $(
        <li><input type="radio" class="radio-inline" checked="checked"  value=' +
          i +
          ' name="dynradio" />' +
          " " +
          choice +
          "</li>"
      ).appendTo(choiceList);
    } else {
      $(
        <li><input type="radio" class="radio-inline" value=' +
          i +
          name="dynradio" /> +
          " " +
          choice +
          </li>
      ).appendTo(choiceList);
    }
  }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function displayScore() {
  $(document)
    .find(.quizContainer > .result)
    .text("You scored:" + correctAnswers + " out of: " + questions.length);
  $(document).find(".quizContainer > .result").show();
}

function hideScore() {
  $(document).find(".result").hide();
}
function viewResults() {
  if (currentQuestion == 10) {
    currentQuestion = 0;
    return false;
  }
  if (viewingAns == 1) {
    return false;
  }

  hideScore();
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  
  $(questionClass).text(question);
  $(choiceList).find("li").remove();
  var choice;

  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];

    if (iSelectedAnswer[currentQuestion] == i) {
      if (questions[currentQuestion].correctAnswer == i) {
        $(
          <li style= "border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            </li>
        ).appendTo(choiceList);
      } else {
        $(
          <li style= "border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value='+
            i +
            ' name="dynradio" /> +
            " " +
            choice +
            </li>
        ).appendTo(choiceList);
      }
    } else {
      if (questions[currentQuestion].correctAnswer == i) {
        $(
          <li style= "border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' +
            i +
            ' name="dynradio" />+
            " " +
            choice +
            </li>
        ).appendTo(choiceList);
      } else {
        $(
          <li><input type="radio" class="radio-inline" value=' +
            i +
            ' name="dynradio" />+
            " " +
            choice +
            "</li>
        ).appendTo(choiceList);
      }
    }
  }

  currentQuestion++;

  setTimeout(function () {
    viewResults();
  }, 3000);
}
