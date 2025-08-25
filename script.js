function add(x, y) {
    return (x + y).toFixed(2);
}

function subtract(x, y) {
    return (x - y).toFixed(2);
}

function multiply(x, y) {
    return (x * y).toFixed(2);
}

function divide(x, y) {
    return (x / y).toFixed(2);
}

function operate(operator, number1, number2) {
    switch (operator) {
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

let justClickedOperator = false;

//  1. Possible conditions when digit button is clicked: 

digitButtons.forEach(button => {
    button.addEventListener("click", onDigitClick);
});

function onDigitClick(event) {
    const clickedButton = event.target.textContent;

    // if(inputDisplay.value === "ERROR"){
    //     inputDisplay.value = "";
    //     inputDisplay.value += clickedButton;
    // }

    if (operator === "" && result === "") {
        //building number1 from scratch. 
        inputDisplay.value += clickedButton;
        // console.log(`user building number1 from scratch ${inputDisplay.value}`);
    }
    else if (operator === "" && result !== "") {
        //user pressed digit after equals, start fresh number1.
        number1 = "";
        result = "";
        inputDisplay.value = clickedButton;
        console.log(`user pressed digit after equals, start fresh number1`);
    }

    else if (justClickedOperator) {
        //overwrite display because operator was just clicked
        inputDisplay.value = clickedButton;
        justClickedOperator = false; //reset flag
    }
    else {
        //normal case: typing number2
        inputDisplay.value += clickedButton;
    }
}

//  2. Possible conditions when an operator button is clicked. (+, -, *, /)
//onOperatorClick()

const arithmeticButtons = document.querySelectorAll(".arithmetic");

arithmeticButtons.forEach(button => {
    button.addEventListener("click", function (event) {

        if (number1 === "" && result === "") {
            //First operator clicked after entering first number
            number1 = inputDisplay.value;
            operator = event.target.className;
            // inputDisplay.value = "";
            justClickedOperator = true;  //mark state
            console.log(`First operator clicked ${operator}after entering first number. number1: ${number1}`)
        }

        else if (justClickedOperator) {
            //user clicked multiple operator just update operator
            operator = event.target.className;
        }

        else if ((number1 !== "") && (operator !== "") && (inputDisplay.value !== "")) {
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
            justClickedOperator = true;  //mark state again        
            console.log(`second operator is clicked, number2 has been entered we are ready to operate. number1:${number1}, number2: ${number2} result: ${result}`);
        }

        else if (result !== "" && inputDisplay.value === "") {
            //result exists from a previous calculation user is chaining operators without typing new number.
            number1 = result;
            operator = event.target.className;
            // result = "";
            justClickedOperator = true;  // mark state again 
            console.log(`You clicked operator: ${operator} result is :${result}`);
        }
    });
});

//  3. When equals is clicked. OnEqualsClick ()

const equals = document.querySelector(".equals");
equals.addEventListener("click", onEqualsClick);

function onEqualsClick() {

    if (inputDisplay.value === "0") {
        //Division by zero
        inputDisplay.value = "ERROR";
        return; //exit immediately, skip the rest of the function.
    }

    else if ((number1 !== "") && (operator !== "") && (inputDisplay.value !== "")) {
        number2 = inputDisplay.value;
        let number1Int = parseFloat(number1);
        let number2Int = parseFloat(number2);

        if (operator === "divide arithmetic" && number2Int === 0) {
            inputDisplay.value = "ERROR";
            return; //exit immediately, skip the rest of the function.
        }
        result = operate(operator, number1Int, number2Int);
        console.log(`number1: ${number1}, number2: ${number2}, operator: ${operator}, result: ${result}, inputDisplay: ${inputDisplay.value}`);
        inputDisplay.value = result;
        number1 = result;
        number2 = "";
        operator = "";
    }
};

const clear = document.querySelector(".clear");
clear.addEventListener("click", function () {
    number1 = "";
    number2 = "";
    result = "";
    operator = "";
    inputDisplay.value = "";
    console.log(`number1: ${number1}, number2: ${number2}, operator: ${operator}, result: ${result}, inputDisplay: ${inputDisplay.value}`);
});

//  4. When "." is clicked. onDotClick()

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", onDotClick);

function onDotClick() {
    const displayContent = inputDisplay.value;

    if (inputDisplay.value === ".") {
        inputDisplay.value = "0.";
    }
    else if (displayContent.includes(".") || inputDisplay.value === "ERROR" || inputDisplay.value === undefined) {
        console.log("contains error");
        return;
    }
    else if (inputDisplay.value === "" || inputDisplay.value === "0") {
        inputDisplay.value = "0.";
        console.log("contains 0");
    }
    else {
        inputDisplay.value += ".";
        console.log("append decimal");
    }
};

//5. When (DEL) button is clicked. OnBackspaceClick()

const backSpace = document.querySelector(".backSpace");
backSpace.addEventListener("click", onBackspaceClick);

function onBackspaceClick() {
    const displayValue = inputDisplay.value;
    if (inputDisplay.value === "ERROR") {
        inputDisplay.value = "0";
    }
    else {
        inputDisplay.value = displayValue.slice(0, -1); //Removes the last character
    }

};

//6. When "+/-" button is clicked. onChangeSignClick()

const signChange = document.querySelector(".signChange");
signChange.addEventListener("click", onChangeSignClick);

function onChangeSignClick() {
    let displayNumber = inputDisplay.value;
    let displayNumber1 = (parseInt(displayNumber)) * (-1);
    let displayNumber2;

    if (inputDisplay.value === "ERROR" || inputDisplay.value === "" || inputDisplay.value === "0" || inputDisplay.value === "." || inputDisplay.value === "0.") {
        return;
    }

    else {
        displayNumber2 = displayNumber1.toString();
        inputDisplay.value = displayNumber2;
    }
};
