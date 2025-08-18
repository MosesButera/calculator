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


