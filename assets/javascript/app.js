//peon and start timer
//Shows first question and answer 
//Hover to show answer choice
//On click, checks if user is right or wrong
	//if right, then Correct screen pops up and correct counter++
	//if wrong, show Incorrect screen with correct answer and incorrect counter++
	//wait a few seconds
//New question and answer set shows up
//Once all questions are answered or timer ends, 
    //show Final screen with all correct, incorrect and Play Again button
    
// VARIABLES
// ==========================================================================
$(document).ready(function(){

    var winCounter = 0;
    var lossCounter = 0;
    
    // this is where the game questions are stored
    var game = {
        
        time:25,
    
         trivia: {
             q1: {question: "There are around _____ different species of cactus that differ in size, shape, color and type of habitat", 
                 a1: "500", 
                 a2: "4,000", 
                 a3: "2,000", //* correct
                 a4: "300,000"
             },
            q2: {question: "Which of these continents represent the natural habit of the cactus?", 
                a1:"South and North America", //* correct
                a2:"North America, South America and Africa", 
                a3:"South America and Africa", 
                a4:"North America and Africa"
            },
            q3: {question: "Cacti can survive from 15 to ____ years, depending on the species.", 
                a1:"300", //* correct
                a2:"50", 
                a3:"600", 
                a4:"1,000"
            },
            q4: {question: "Name the largest type of cactus in the world that is found in Arizona.", 
                a1:"Mexican Giant", 
                a2: "Golden Barrel", 
                a3: "Prickly Pear", 
                a4: "Saguaro" //* correct
            }, 
        }, 
    // FUNCTION DECLARATIONS
    // ==============================================================================		
        start: function(){
            var counter = setInterval(game.count, 1000);
            if (game.time < 0) {
                game.results();
                clearInterval(counter);
                //show results
            }
            
        },
        stop: function() {
            var currentTime = game.timeConverter(game.time);
            if (game.time < 0) {
                game.results();
                clearInterval(currentTime);
                //show results
            }},
        count: function(){
            game.time--;
            currentTime = game.timeConverter(game.time);
            $("#timer").html("<h3>" + currentTime + "</h3>");
           
            if (game.time < 0) {
                game.results();
                clearInterval(currentTime);
            }
        },
    
        timeConverter: function(t){
            //converts seconds to minutes and seconds
            var minutes = Math.floor(t/60);
            var seconds = t - (minutes * 60);
            if (seconds < 10){
                seconds = "0" + seconds;
            }
            if (minutes === 0){
                minutes = "00";
            } else if (minutes < 10){
                minutes = "0" + minutes;
            }
        
            return minutes + ":" + seconds;
        }, 
    
        displayFirstQuestion: function(){
            $("#question").html("<h2>" + game.trivia.q1.question + "</h2>");
            $("#a1").html("<p id='a1'>" + game.trivia.q1.a1 + "</p>");
            $("#a2").html("<p id='a2'>" + game.trivia.q1.a2 + "</p>");
            $("#a3").html("<p id='a3'>" + game.trivia.q1.a3 + "</p>");
            $("#a4").html("<p id='a4'>" + game.trivia.q1.a4 + "</p>");
            console.log("firstquestion");
            //correct answer for Q1
            $("#a1").click(function() {
                console.log("Clicked a1");
                $("#a1").data('clicked', true);
                winCounter++;
                game.nextQuestion();
            });

            $("#a2, #a3, #a4").click(function() {
                if(jQuery("#a1").data('clicked')){
                    game.nextQuestion();
                }
                else{
                    lossCounter++;
                    console.log("clicked anything wrong");
                    game.nextQuestion();
                }
            });
            
        },
    
        nextQuestion: function(){
            $("#a1").data('clicked', null);
            $("#question").html("<h2>" + game.trivia.q2.question + "</h2>");
            $("#a1").html("<p id='a1'>" + game.trivia.q2.a1 + "</p>");
            $("#a2").html("<p id='a2'>" + game.trivia.q2.a2 + "</p>");
            $("#a3").html("<p id='a3'>" + game.trivia.q2.a3 + "</p>");
            $("#a4").html("<p id='a4'>" + game.trivia.q2.a4 + "</p>");
            console.log("nextquestion");
            
            $("#a3").click(function() {
                console.log("Clicked a3");
                $("#a3").data('clicked', true);
                winCounter++;
                game.thirdQuestion();
            });
            
            $("#a1, #a2, #a4").click(function() {
                
                lossCounter++;
                console.log("clicked anything wrong");
                game.thirdQuestion();
            });
         }, 
    
        thirdQuestion: function(){
            $("#a3").data('clicked', null);
            $("#question").html("<h2>" + game.trivia.q3.question + "</h2>");
            $("#a1").html("<p id='a1'>" + game.trivia.q3.a1 + "</p>");
            $("#a2").html("<p id='a2'>" + game.trivia.q3.a2 + "</p>");
            $("#a3").html("<p id='a3'>" + game.trivia.q3.a3 + "</p>");
            $("#a4").html("<p id='a4'>" + game.trivia.q3.a4 + "</p>");
            console.log("thirdquestion");
            $("#a2").click(function() {
                console.log("Clicked a2");
                $("#a2").data('clicked', true);
                winCounter++;
                game.lastQuestion();
            });
            $("#a1, #a3, #a4").click(function() {
                lossCounter++;
                console.log("clicked anything wrong");
                game.lastQuestion();
            });
         }, 
    
         lastQuestion: function(){
            $("#a2").data('clicked', null);
            $("#question").html("<h2>" + game.trivia.q4.question + "</h2>");
            $("#a1").html("<p id='a1'>" + game.trivia.q4.a1 + "</p>");
            $("#a2").html("<p id='a2'>" + game.trivia.q4.a2 + "</p>");
            $("#a3").html("<p id='a3'>" + game.trivia.q4.a3 + "</p>");
            $("#a4").html("<p id='a4'>" + game.trivia.q4.a4 + "</p>");
            console.log("thirdquestion");
            $("#a4").click(function() {
                console.log("Clicked a4");
                $("#a4").data('clicked', true);
                
                winCounter++;
                game.results();
            });

            $("#a1, #a2, #3").click(function() {
                
                lossCounter++;
                console.log("clicked anything wrong");
                game.results();
            });
         }, 
    
        results: function(){
            $("#timer").html(null);
            $("#question").html("<h2> Game Over! </h2>");
            $("#a1").html("<p id='a1'> Correct answers: " + winCounter + "</p>");
            $("#a2").html("<p id='a2'> Incorrect answers: " + lossCounter + "</p>");
            $("#a3").html("<p> To play again, refresh page. </p>");
            $("#a4").html(null);
            game.stop();
        },
    }; 
    
        $("#timer").on('click', game.start());
        $("#question").on('click', game.displayFirstQuestion());
        
    
    }); 
    