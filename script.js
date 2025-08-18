function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function operate(operator, number1, number2){
    switch(operator){
        case "add arithmetic":
            return add(number1, number2);
        case "subtract arithmetic":
            return subtract(number1, number2); 
        case "multiply arithmetic":
            return multiply(number1, number2);
        case "divide arithmetic":
            return divide(number1, number2);
        default: 
            return "Unknown operator";
    }
}

const digitButtons = document.querySelectorAll(".digit");
const inputDisplay = document.getElementById("numb1");
let number1 = "";
let number2 = "";
let result = "";
let operator = "";

//Possible conditions when digit button is clicked: 

digitButtons.forEach(button => {
    button.addEventListener("click", onDigitClick());
});


function onDigitClick(event){

    if (operator === "" && result === ""){
        //building number1 from scratch. 
        const clickedButton = event.target.textContent; 
        inputDisplay.value += clickedButton;
    }
    else if (operator = "" && result !== ""){
        //user pressed digit after equals, start fresh number1.
        number1 = "";
        result = "";
        inputDisplay.value = clickedButton;
    }
    else if((operator !== "") && (number1 !== "") && (inputDisplay.value === "")){
        //first digit of number2 replaces empty display.
        inputDisplay.value = clickedButton;
    }
    else if((operator !== "") && (number1 !== "") && inputDisplay.value !== ""){
        //Already typing number2, keep appending digits to inputDisplay.
        inputDisplay.value += clickedButton;
    }
}

//Possible conditions when an operator button is clicked. (+, -, *, /)
//onOperatorClick()

const arithmeticButtons = document.querySelectorAll(".arithmetic"); 

arithmeticButtons.forEach(button => {
    button.addEventListener("click", function(event){

        if (number1 === "" && result === ""){
            //First operator clicked after entering first number
            number1 = inputDisplay.value;
            operator = event.target.className;
        }
        else if ((number1 !== "") && (operator !== "") && (inputDisplay.value !== "")){
            //Second operator is clicked, number2 has been entered and once
            //saved we are ready to operate, store result and display it.
            number2 = inputDisplay.value;
            let number1Int = parseFloat(number1);
            let number2Int = parseFloat(number2);
            result = operate(operator, number1Int, number2Int);
            inputDisplay.value = result;
            number1 = result;
            operator = event.target.className;
            number2 = ""         
        }

        else if (result !== "" && inputDisplay.value === ""){
            //user is chaining operators without typing new number.
            number1 = result;
            operator = event.target.className;
        }
        else if ((number1 !== "") && (operator !== "") && (inputDisplay.value === "")){
            //user clicked operator multiple time without entering number2
            //update to use the most recent operator only
            operator = event.target.className;
        }
    });
});

// When equals is clicked. OnEqualsClick ()

const equals = document.querySelector(".equals");
equals.addEventListener("click", OnEqualsClick ())

function OnEqualsClick (){
    If ((number1 !== "") && (operator !== "") && (inputDisplay.value !== "")){
        number2 = inputDisplay.value;
        let number1Int = parseFloat(number1);
        let number2Int = parseFloat(number2);
        result = (operator, number1Int, number2Int);
        inputDisplay.value = result;
        number1 = result;
        number2 = "";
        operator = "";
    }
}