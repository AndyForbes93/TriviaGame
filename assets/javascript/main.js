$(document).ready(function () {
    /*For some reason I cant get the restart button to show up reliably. theres a strange bug somewhere that makes it show up like 50% of the time. I also couldnt
     get a transition page to show up between each question without complely nuking the project so i gave up on that. other than that I feel that the quiz works fine.*/


    //globals
    var correct = 0;
    var incorrect = 0;
    var time = 31;
    var intervalId;
    var questionNumber = 0;
    var answerNumber = 0;
    var answerGuess = [];
    var timeOut = false;

    var questions = ["Which of these teams is an 'Original Six' team in the NHL?", "Who was the Fastest Player to hit 1,000 points in the NHL?",
        "Who was the first NHL player to score 50 goals in a season?", "Which team has the most amount of Stanley Cups in its history?", "How many player's are on the ice during a game?"
    ];

    var answers = [{
        a1: {
            ans: "Boston Bruins",
            v: true
        },
        a2: {
            ans: "Pittsburgh Penguins",
            v: false
        },
        a3: {
            ans: "Ottawa Senators",
            v: false
        },
        a4: {
            ans: "LA Kings",
            v: false
        }
    }, {
        a1: {
            ans: "Bobby Orr",
            v: false
        },
        a2: {
            ans: "Mario Lemeux",
            v: false
        },
        a3: {
            ans: "Wayne Gretzky",
            v: true
        },
        a4: {
            ans: "Bret Hull",
            v: false
        }
    }, {
        a1: {
            ans: "Goride Howe",
            v: false
        },
        a2: {
            ans: "Maurice Richard ",
            v: true
        },
        a3: {
            ans: "Eddie Shore",
            v: false
        },
        a4: {
            ans: "Patrick Roy",
            v: false
        }
    }, {
        a1: {
            ans: "Detroit Red Wings",
            v: false
        },
        a2: {
            ans: "Chicago Blackhawks",
            v: false
        },
        a3: {
            ans: "Montreal Canadiens",
            v: true
        },
        a4: {
            ans: "Toronto Maple Leafs",
            v: false
        }

    }, {
        a1: {
            ans: "12",
            v: true
        },
        a2: {
            ans: "10",
            v: false
        },
        a3: {
            ans: "8",
            v: false
        },
        a4: {
            ans: "6",
            v: false
        }
    }];

    //timer starts on strt button click
    $("#start").on("click", runQuiz);

    //on click to push boolean of answer clicked to array to check it in if statement if it is true or false
    $(".answer_1").on("click", function () {
        answerGuess.push(answers[answerNumber].a1.v);
        console.log(answerGuess);
        answerCheck();
        stop();
    });
    $(".answer_2").on("click", function () {
        answerGuess.push(answers[answerNumber].a2.v);
        console.log(answerGuess);
        answerCheck();
        stop();


    });
    $(".answer_3").on("click", function () {
        answerGuess.push(answers[answerNumber].a3.v);
        console.log(answerGuess);
        answerCheck();
        stop();


    });
    $(".answer_4").on("click", function () {
        answerGuess.push(answers[answerNumber].a4.v);
        console.log(answerGuess);
        answerCheck();
        stop();


    });



    //function to show questions
    function showQuestion() {
        $(".questions").html("<h1>" + questions[questionNumber] + "</h1>");
    };

    //function to show all answers
    function showAnswers() {
        $(".answer_1").html("<h2>" + answers[answerNumber].a1.ans + "</h2>");
        $(".answer_2").html("<h2>" + answers[answerNumber].a2.ans + "</h2>");
        $(".answer_3").html("<h2>" + answers[answerNumber].a3.ans + "</h2>");
        $(".answer_4").html("<h2>" + answers[answerNumber].a4.ans + "</h2>");
    }


    //function to check boolean value of answer if it is true
    function answerCheck() {
        if (answerGuess[questionNumber] === true) {
            correct++;


        }
        if (answerGuess[questionNumber] === false) {
            incorrect++;
        }
    };

    //function to run quiz on click
    function runQuiz() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        showQuestion();
        showAnswers();

    };

    //  The decrement function.
    function decrement() {

        //  Decrease number by one.
        time--;

        //  Show the number in the #show-number tag.
        $(".timer").html("<h2>" + time + "</h2>");

        //  Once number hits zero...
        if (time === 0) {



            //increases incorrect by 1
            incorrect++;

            //adds boolean to time running out


            //  ...run the stop function.
            stop();

            //  Alert the user that time is up.
            alert("Time Up!");


        }
    }

    function stop() {

        if (answerNumber < 4) {

            //  Clears our intervalId
            //  We just pass the name of the interval
            //  to the clearInterval function.
            clearInterval(intervalId);
            //move onto next question
            questionNumber++;
            answerNumber++;
            time = 31;
            runQuiz();
        } else {

            $(".questions").html("<h1>Quiz Over</h1>");
            $(".answer_1").html("<h2>Total Correct: " + correct + "</h2>");
            $(".answer_2").html("<h2>Total Incorrect: " + incorrect + "</h2>");
            $(".answer_3").html("");
            $(".answer_4").html("");
            $("#start").html("<button type='button' class='btn btn-info' id='restart'>Restart Quiz</button>");
            clearInterval(intervalId);
            restart();
        }
    }


    //function to restart quiz when it is complete
    function restart() {
        questionNumber = 0;
        answerNumber = 0;
        answerGuess = [];
        correct = 0;
        incorrect = 0;

    }
    //restarts quiz on click
    $("#restart").on("click", function () {
        stop();
    });
});