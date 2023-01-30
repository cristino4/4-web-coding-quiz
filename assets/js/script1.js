//HTML file contains all pages. Load all pages and store them to variables. 
//then clear all pages and display the desired page only as needed
//pages
homePage = document.querySelector(".home-page");
instrPage = document.querySelector(".instr-page");
questPage = document.querySelector(".question-page");
finishPage = document.querySelector(".finish-page");
highScorePage = document.querySelector(".high-scores-page");
footerEl = document.querySelector("footer");
body = document.querySelector("body");

//useful elements
timeEl = document.querySelector("#time");
checkbox1El = document.querySelector("#option1");
checkbox2El = document.querySelector("#option2");
checkbox3El = document.querySelector("#option3");
checkbox4El = document.querySelector("#option4");

//navigation event listeners
document.querySelector("#start-quiz").addEventListener("click",goToInstrPage);
document.querySelector("#high-scores").addEventListener("click",goToHighScorePage);
document.querySelector("#next-instr").addEventListener("click",runQuiz);
document.querySelector("#cancel-quiz-quest").addEventListener("click",cancelReset);
document.querySelector("#cancel-quiz-instr").addEventListener("click",cancelReset);
document.querySelector("#submit-score").addEventListener("click",recordScore);
document.querySelector("#submit-question").addEventListener("click",recordAnswer);
document.querySelector("#retry-finish-page").addEventListener("click",cancelReset);
document.querySelector("#retry-scores-page").addEventListener("click",cleanUpAndHome)


//question dictionary to setup functions that create question pages
// key: [function, result, question, correctanswer]
questDict = {
    1:["question1","wrong","this is question #1","this is the correct answer for 1","reason"],
    2:["question2","wrong","this is question #2","this is the correct answer for 2","reason"],
    3:["question3","wrong","this is question #3","this is the correct answer for 3","reason"],
    4:["question4","wrong","this is question #4","this is the correct answer for 4","reason"],
    5:["question5","wrong","this is question #5","this is the correct answer for 5","reason"],
    6:["question6","wrong","this is question #6","this is the correct answer for 6","reason"],
    7:["question7","wrong","this is question #7","this is the correct answer for 7","reason"],
    8:["question8","wrong","this is question #8","this is the correct answer for 8","reason"],
    9:["question9","wrong","this is question #10","this is the correct answer for 9","reason"],
    10:["question10","wrong","this is question #1","this is the correct answer for 10","reason"],
}
//functions to create new questions
var question1 = function(){
    document.querySelector(".heading").innerHTML = `Question 1 of ${questions}`;
    document.querySelector(".question").innerHTML ="this is question 1"
}
var question2 = function(){
    document.querySelector(".heading").innerHTML = `Question 2 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 2"
}
var question3 = function(){
    document.querySelector(".heading").innerHTML = `Question 3 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 3"
}
var question4 = function(){
    document.querySelector(".heading").innerHTML = `Question 4 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 4"
}
var question5 = function(){
    document.querySelector(".heading").innerHTML = `Question 5 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 5"
}
var question6 = function(){
    document.querySelector(".heading").innerHTML = `Question 6 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 6"
}
var question7 = function(){
    document.querySelector(".heading").innerHTML = `Question 7 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 7"
}
var question8 = function(){
    document.querySelector(".heading").innerHTML = `Question 8 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 8"
}
var question9 = function(){
    document.querySelector(".heading").innerHTML = `Question 9 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 9"
}
var question10 = function(){
    document.querySelector(".heading").innerHTML = `Question 10 of ${questions}`
    document.querySelector(".question").innerHTML = "this is question 10"
}



// variables
logModeAll = 1
logModeCoarse=0
logModeFine=0
logModeNone=0
timeLimit=2 //50 seconds per question
interval=1000
time = timeLimit;
timerIntervalID = null;
questionID = 1;
questions = 10;
timeoutFlag = false;
submitFlag = false;
cancelFlag = false;
correct = 0;
wrong = 0;
answer = [];


//init code
init();

function init(){
    goToHomePage();
}

function runQuiz(){
    log("****Quiz Begun****")
    log(`Quiz Parameters: 
    Time Limit: ${timeLimit} sec
    Questions: ${questions}
    timeoutFlag: ${timeoutFlag}
    submitFlag: ${submitFlag}
    cancelFlag: ${cancelFlag}
    logModeAll: ${logModeAll}
    logModeCoarse: ${logModeCoarse}
    logModeFine: ${logModeFine}
    logModeNone: ${logModeNone}`)
    goToQuestPage(1);
    resetQuiz();
    timerIntervalID = setInterval(timeHandler,interval)
    waitIntervalID  = setInterval(logger,interval);

    // for (let questionID = 1;questionID<=questions;questionID++){
    //     timeoutFlag = false;
    //     submitFlag = false;
    //     log(`i = ${i} timeoutFlag = ${timeoutFlag} submitFlag = ${submitFlag} cancelFlag = ${cancelFlag}`)
    //     setupQuestionPage(i);
    //     intervalID = setInterval(timeHandler,interval);

    //     if(submitFlag === true){
    //         cancelFlag = true;
    //         reason = "answer submitted";
    //         recordAnswer(i,reason);
    //     }
    // }
    

}

function logger(){
    while(true){
        log('hello')
    }
}
function recordAnswer(questionID,reason){
    
    answer[0]=checkbox1El.value;
    answer[1]=checkbox2El.value;
    answer[2]=checkbox3El.value;
    answer[3]=checkbox4El.value;
    questDict[questionID][4]=reason;

    log(`recording answer for question: ${questionID} reason: ${reason}`)
    log(`clearing timerIntervalID: ${timerIntervalID}`)
    return answer
}

function checkAnswer(questionID,answer){
    log(`checking answer: ${answer} for question ${questionID}`)
    for(let i=0;i<answer.length;i++){
        if (answer[i]===true){
            if(answer[i]===questDict[questionID][3]){
                questDict[questionID][1]="correct";
                correct++;
                log(`answer is correct!`)
            } else if(answer[i]!==questDict[questionID][3]){
                questDict[questionID][1]="wrong";
                wrong++;
                log(`answer is wrong!`)
            }
        }
    }

}


function timeHandler(){
    log(`Time Left: ${time} seconds`)
    if(time===0){
        log("Update: Time is UP")
        reason = "timeout";
        questionID++;
        timeoutFlag = true;
        answer = recordAnswer(questionID,reason)
        checkAnswer(questionID,answer)
        clearInterval(timerIntervalID);
    }
    timeEl.innerHTML = time;
    time--;
}





function recordScore(){
    // log(`recording score for user: ${user} score: ${score} `)
    log(`recording score  `)
}

function cancelReset(){
    goToHomePage()
}

function cleanUpAndHome(){
    goToHomePage()
}

function goToHomePage(){
    clearContent()
    body.appendChild(homePage);
    body.appendChild(footerEl)
    return true;
}

function goToInstrPage(){
    clearContent()
    body.appendChild(instrPage)
    body.appendChild(footerEl);
    return true;
}

function goToQuestPage(questionID){
    clearContent()
    body.appendChild(questPage);
    body.appendChild(footerEl);
    setupQuestionPage(questionID);
    timeEl.innerHTML = timeLimit;
    return true;
}

function setupQuestionPage(questionID){
    functionName = questDict[questionID][0];
    log(`Setting up question page: ${questionID}`)
    window[functionName]();
}

function goToFinishPage(finalScore,result){
    clearContent()
    body.appendChild(finishPage);
    body.appendChild(footerEl);
    return true;
}

function goToHighScorePage(){
    clearContent()
    body.appendChild(highScorePage);
    body.appendChild(footerEl);
    return true;
}

function clearContent(){
    while(document.querySelector("page")!=null){
        document.querySelector("page").remove();
    }
    document.querySelector("footer").remove();
}

function resetQuiz(){
    time=timeLimit;
    questionID=1;
    timeoutFlag = false;
    submitFlag = false;
    cancelFlag = false;
    wrong = 0;
    correct = 0;    
}

//=-------------------------- Utilities------------------------------


function log(message,logType){
    if ((logType ==="all") && (logModeAll ===1)){
        console.log(message);
    } else if((logType ==="coarse") && ((logModeCoarse ===1))||(logModeAll===1)){
        console.log(message);
    } else if((logType ==="fine") && ((logModeFine ===1))||(logModeAll===1)){
        console.log(message)    
    } else if(logModeNone ===1){
        return;
    } else if(logType === undefined){
        console.log(message);
    }
}


function setMultiAttributes(element,attributes){
    for(var key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

