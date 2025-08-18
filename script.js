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



