// variables
logModeAll = 1
logModeCoarse=0
logModeFine=0
logModeNone=0
timeLimit=20 //50 seconds per question
interval=1000
time = timeLimit;
questionID = 1;
questions = 10;
timeoutFlag = false;
submitFlag = false;
cancelFlag = false;
correct = 0;
wrong = 0;
answer = [];
appState = "";
pageSetFlag = false;
newTimer = false;
intervalClearFlag = false;
var score = 0;
scores = []



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
scoreEl = document.querySelector(".score");
result1El =document.querySelector("#res1");
result2El =document.querySelector("#res2");
result3El =document.querySelector("#res3");
result4El =document.querySelector("#res4");
result5El =document.querySelector("#res5");
result6El =document.querySelector("#res6");
result7El =document.querySelector("#res7");
result8El =document.querySelector("#res8");
result9El =document.querySelector("#res9");
result10El =document.querySelector("#res10");
tableEl = document.querySelector("#high-score-table")

//navigation event listeners
document.querySelector("#start-quiz").addEventListener("click",stateInstr);
document.querySelector("#high-scores").addEventListener("click",stateHighScore);
document.querySelector("#next-instr").addEventListener("click",stateRunQuiz);
document.querySelector("#cancel-quiz-quest").addEventListener("click",cancelQuiz);
document.querySelector("#cancel-quiz-instr").addEventListener("click",cancelQuiz);
document.querySelector("#submit-score").addEventListener("click",submitHighScore);
document.querySelector("#submit-question").addEventListener("click",submitHandler);
document.querySelector("#retry-finish-page").addEventListener("click",stateHome);
document.querySelector("#retry-scores-page").addEventListener("click",stateHome)
// document.querySelector("#option1").addEventListener('change', flipCheckboxes);
// document.querySelector("#option2").addEventListener('change', flipCheckboxes);
// document.querySelector("#option3").addEventListener('change', flipCheckboxes);
// document.querySelector("#option4").addEventListener('change', flipCheckboxes);

//questions and answer options

Q1 = "Inside which HTML element name do we put the JavaScript?";
Q2 = 'What is the correct JavaScript syntax to change the content of the HTML element below?<br>p id="demo" This is a demonstration. /p ';
Q3 = 'Where is the correct place to insert a JavaScript?';
Q4 = 'What is the correct syntax for referring to an external script called "xxx.js"?';
Q5 = 'The external JavaScript file must contain the script tag.';
Q6 = 'How do you write "Hello World" in an alert box?';
Q7 = 'How do you create a function in JavaScript?';
Q8 = 'How do you call a function named "myFunction"?';
Q9 = 'How to write an IF statement in JavaScript?';
Q10 = 'How to write an IF statement for executing some code if "i" is NOT equal to 5?';

options1 = ["js", "script", "scripting","javascript"];
options2 = ['document.getElement("p").innerHTML = "Hello World!";',
'document.getElementById("demo").innerHTML = "Hello World!";',
'#demo.innerHTML = "Hello World!";',
'document.getElementByName("p").innerHTML = "Hello World!";'];
options3 = ['The body section', 'The head section', 'Both the head section and the body section are correct','None of the above'];
options4 = ['script href="xxx.js"', 'script name="xxx.js"', 'script src="xxx.js"','script value="xxx.js"'];
options5 = ['True', 'False', 'Sometimes', 'I give up, next question'];
options6 = ['alertBox("Hello World");', 'alert("Hello World");', 'msgBox("Hello World");', 'msg("Hello World");']
options7 = ['function myFunction()', 'function = myFunction()', 'function:myFunction()', 'function() {my function}'];
options8 = ['call function myFunction()', 'call myFunction()', 'myFunction()', 'function myFunction()'];
options9 = ['if i = 5','if (i == 5)', 'if i = 5 then', 'if i == 5 then'];
options10 = ['if i =! 5 then', 'if (i != 5)', 'if i * 5', 'if (i = 5)'];

//question dictionary to setup functions that create question pages
// key: [function, result, question, correctanswer]

questDict = {
    1:["question1","wrong",Q1,options1[1],"reason",options1,1],
    2:["question2","wrong",Q2,options2[1],"reason",options2,1],
    3:["question3","wrong",Q3,options3[2],"reason",options3,2],
    4:["question4","wrong",Q4,options4[2],"reason",options4,2],
    5:["question5","wrong",Q5,options5[1],"reason",options5,1],
    6:["question6","wrong",Q6,options6[1],"reason",options6,1],
    7:["question7","wrong",Q7,options7[0],"reason",options7,0],
    8:["question8","wrong",Q8,options8[2],"reason",options8,2],
    9:["question9","wrong",Q9,options9[1],"reason",options9,1],
    10:["question10","wrong",Q10,options10[1],"reason",options10,1],
}

//functions to create new questions
var question1 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 1 of ${questions}`;
    document.querySelector(".question").innerHTML =Q1
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options1[i];
    }   
    
}
var question2 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 2 of ${questions}`
    document.querySelector(".question").innerHTML = Q2
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options2[i];
    }   
}
var question3 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 3 of ${questions}`
    document.querySelector(".question").innerHTML = Q3
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options3[i];
    }   
}
var question4 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 4 of ${questions}`
    document.querySelector(".question").innerHTML = Q4
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options4[i];
    }   
}
var question5 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 5 of ${questions}`
    document.querySelector(".question").innerHTML = Q5
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options5[i];
    }   
}
var question6 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 6 of ${questions}`
    document.querySelector(".question").innerHTML = Q6
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options6[i];
    }   
}
var question7 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 7 of ${questions}`
    document.querySelector(".question").innerHTML = Q7
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options7[i];
    }   
}
var question8 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 8 of ${questions}`
    document.querySelector(".question").innerHTML = Q8
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options8[i];
    }   
}
var question9 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 9 of ${questions}`
    document.querySelector(".question").innerHTML = Q9
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options9[i];
    }   
}
var question10 = function(){
    timeEl.innerHTML = timeLimit;
    document.querySelector(".heading").innerHTML = `Question 10 of ${questions}`
    document.querySelector(".question").innerHTML = Q10
    resetCheckbox();
    for (let i = 0;i<4;i++){
        log(typeof options1[i])
        document.querySelector(`label[for=option${CSS.escape(i+1)}]`).innerHTML = options10[i];
    }   
}


//init code
init();

function init(){
    appState = "home";
    checkState()

    // stateIntervalID = setInterval(checkState,stateCheckInterval)
}

function checkState(){
    
    switch(appState){
        case "home":
            pageSetFlag = false;
            log(`\nSTATE: ${appState} started`);
            if(pageSetFlag === false){
                pageSetFlag = goToHomePage()
                log(`pageSetFlag: ${pageSetFlag}`)
            }
            resetQuiz();
            break;
        case "instrPage":
            log(`\nSTATE: ${appState} started`);
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToInstrPage()
                log(`pageSetFlag: ${pageSetFlag}`)
            }
            break;
        case "question1":
            log(`\nSTATE: ${appState} started`);
            questionID = 1
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(1);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question2":
            log(`\nSTATE: ${appState} started`);
            questionID = 2
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(2);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question3":
            log(`\nSTATE: ${appState} started`);
            questionID = 3
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(3);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question4":
            log(`\nSTATE: ${appState} started`);
            questionID = 4
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(4);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question5":
            log(`\nSTATE: ${appState} started`);
            questionID =5;
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(5);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question6":
            log(`\nSTATE: ${appState} started`);
            questionID = 6;
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(6);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question7":
            log(`\nSTATE: ${appState} started`);
            questionID = 7;
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(7);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question8":
            log(`\nSTATE: ${appState} started`);
            questionID = 8;
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(8);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question9":
            log(`\nSTATE: ${appState} started`);
            questionID = 9;
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(9);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "question10":
            log(`\nSTATE: ${appState} started`);
            questionID = 10;
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToQuestPage(10);
                log(`pageSetFlag: ${pageSetFlag}`)
                timerIntervalID = setInterval(timeHandler,interval);
            }
            break;
        case "results":
            log(`\nSTATE: ${appState} started`);
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToFinishPage();
                log(`pageSetFlag: ${pageSetFlag}`)
                score = calcResult();
                scoreEl.innerHTML = `Final Score:   ${score} or ${questions}`;
                
            }

            break;
        case "highScores":
            log(`\nSTATE: ${appState} started`);
            pageSetFlag = false;
            if(pageSetFlag === false){
                pageSetFlag = goToHighScorePage();
                updateScoreTable();
                log(`pageSetFlag: ${pageSetFlag}`)
            }
            break;
        default:
            log(`\nSTATE: "default" started`);
    }
}


function changeState(){
    console.log("button pressed")
    if(appState ==="state1"){
        appState ="state2"
        console.log("1")
    } else if (appState === "state2"){
        appState="state1"
        console.log("2")
    }
    console.log(`State: ${appState}`)
}


function stateHome(){
    appState = "home";
    checkState()
}

function stateInstr(){
    appState = "instrPage";
    checkState()
}

function stateRunQuiz(){
    appState = "question1";
    checkState();
}

function stateResults(){
    appState = "results";
    checkState();
}

function stateHighScore(){
    appState = "highScores";
    checkState()

}

function cancelQuiz(){
    log(`\nCANCELED: Quiz Canceled`)
    resetQuiz()
    appState = "home";
    checkState();
    

}

function submitHandler(){
    log("EVENT: Form Submitted")
    reason = "submitted";
    timeoutFlag = false;
    time = timeLimit;
    answer = processAnswer(questionID,reason)
    checkAnswer(questionID,answer)
    if(questionID ===questions){
        appState = "results";
    } else {
        appState = `question${questionID+1}`;
    }
    clearInterval(timerIntervalID);
    checkState()
}

function timeHandler(){
    log(`Time Left: ${time} seconds`)
    if(time===0){
        log("Update: Time is UP")
        reason = "timeout";
        timeoutFlag = true;
        time = timeLimit;
        answer = processAnswer(questionID,reason)
        checkAnswer(questionID,answer)
        if(questionID ===questions){
            appState = "results";
        } else {
            appState = `question${questionID+1}`;
        }
        clearInterval(timerIntervalID);
        checkState()
        return;
    }
    timeEl.innerHTML = time;
    time--;
}

function processAnswer(questionID,reason){
    
    answer[0]=checkbox1El.checked;
    answer[1]=checkbox2El.checked;
    answer[2]=checkbox3El.checked;
    answer[3]=checkbox4El.checked;
    questDict[questionID][4]=reason;

    log(`recording answer for question: ${questionID} reason: ${reason}`)
    log(`clearing timerIntervalID: ${timerIntervalID}`)
    return answer
}

function checkAnswer(questionID,answer){
    log(`checking answer: ${answer} for question ${questionID}`)
    for(let i = 0; i<answer.length; i++){
        if (questDict[questionID][6]===answer.indexOf(true)){
            questDict[questionID][1]="correct";
            correct++;
            log(`answer is correct!`)
        } else if (questDict[questionID][6]!==answer.indexOf(true)){
            questDict[questionID][1]="wrong";
            wrong++;
            log(`answer is wrong!`)
        }
    }
}

function calcResult(){
    resultElements = [result1El,result2El,result3El,result4El,result5El,
        result6El,result7El,result8El,result9El,result10El];
    for(i = 1; i<=questions; i++){
        if (questDict[i][1] === "correct"){
            resultElements[i-1].innerHTML = `Question #${i}: ${questDict[i][1]}`
            score++
        }
        else if(questDict[i][1] === "wrong"){
            resultElements[i-1].innerHTML = `Question #${i}: ${questDict[i][1]}`
        }
    }

    return score;
}

function submitHighScore(event){
    rank = 0;
    initials = document.querySelector("#input-text").value
    log(`EVENT: initials submitted: ${initials} with score: ${score}`)
    scores.push([initials,score,rank])
    // rankScores(scores);
    stateHighScore()
}

// function rankScores(sco){

// }

function updateScoreTable(){

}

function clearContent(){
    while(document.querySelector("page")!=null){
        document.querySelector("page").remove();
    }
    document.querySelector("footer").remove();
}

function resetCheckbox(){
    checkbox1El.checked = false;
    checkbox2El.checked = false;
    checkbox3El.checked = false;
    checkbox4El.checked = false;
    log(`Checkboxes Reset`)
}

function goToHomePage(){
    clearContent()
    body.appendChild(homePage);
    body.appendChild(footerEl);
    log(`PAGE: Home page set`);
    return true;
}

function goToInstrPage(){
    clearContent()
    body.appendChild(instrPage)
    body.appendChild(footerEl);
    log(`PAGE: Instruction page set`);
    return true;
}

function goToQuestPage(questionID){
    clearContent()
    body.appendChild(questPage);
    body.appendChild(footerEl);
    setupQuestionPage(questionID);
    timeEl.innerHTML = timeLimit;
    log(`PAGE: Question page # ${questionID} set`);
    return true;
}

function setupQuestionPage(questionID){
    functionName = questDict[questionID][0];
    // log(`Setting up question page: ${questionID}`)
    window[functionName]();
}

function goToFinishPage(){
    clearContent()
    body.appendChild(finishPage);
    body.appendChild(footerEl);
    log(`PAGE: Finish page set`);
    return true;
}

function goToHighScorePage(){
    clearContent()
    body.appendChild(highScorePage);
    body.appendChild(footerEl);
    log(`PAGE: High Score page set`);
    return true;
}


function resetQuiz(){
    time=timeLimit;
    questionID=1;
    timeoutFlag = false;
    submitFlag = false;
    cancelFlag = false;
    wrong = 0;
    correct = 0;    
    score = 0;
    log(`RESET: Quiz Reset`)
}

// function flipCheckboxes(){
//     ch1 = checkbox1El.checked;
//     ch2 = checkbox2El.checked;
//     ch3 = checkbox3El.checked;
//     ch4 = checkbox4El.checked;
//     log(event)
//     log(event.target.id)
//     checkboxEvent = event.target.id;

//     if (checkbox1El.checked === true){
//         log(`EVENT: checkbox 1 checked flipping others`)
//         checkbox2El.checked = false;
//         checkbox3El.checked = false;
//         checkbox4El.checked = false;
//     } else if (checkbox2El.checked === true){
//         log(`EVENT: checkbox 2 checked flipping others`)
//         checkbox1El.checked = false;
//         checkbox3El.checked = false;
//         checkbox4El.checked = false;        
//     } else if (checkbox3El.checked === true){
//         log(`EVENT: checkbox 3 checked flipping others`)
//         checkbox2El.checked = false;
//         checkbox1El.checked = false;
//         checkbox4El.checked = false;
//     } else if (checkbox4El.checked === true){
//         log(`EVENT: checkbox 4 checked flipping others`)
//         checkbox1El.checked = false;
//         checkbox2El.checked = false;
//         checkbox3El.checked = false;
//     }
// }







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