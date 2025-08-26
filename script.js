function hasDecimal(x){
    return typeof x === 'number' && !Number.isInteger(x);
}

function add(x, y) {
    z = x + y; 
    return hasDecimal(z) ? (x + y).toFixed(2) : z ;  //only round to the nearest second decimal if z has decimal values
}

function subtract(x, y) {
    z = x - y; 
    return hasDecimal(z) ? (x - y).toFixed(2) : z ;
}

function multiply(x, y) {
    z = x * y; 
    return hasDecimal(z) ? (x * y).toFixed(2) : z ;
}

function divide(x, y) {
    z = x / y; 
    return hasDecimal(z) ? (x / y).toFixed(2) : z ;
}

function operate(operator, number1, number2) {
    console.log("Operator received:", operator, "Type:", typeof operator);

    switch (operator) {
        case "add arithmetic":    //if this matches...
        case "+":                 //OR this matches...
            return add(number1, number2);     //Execute this code. 
        case "subtract arithmetic":
        case "-":
            return subtract(number1, number2);
        case "multiply arithmetic":
        case "*":
            return multiply(number1, number2);
        case "divide arithmetic": 
        case "/":
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


//7. Add keyboard accessability. 

//  a. Possible conditions when digit KEY is PRESSED on keyboard in 
// the input tag: 

let justPressedOperator = false;

inputDisplay.addEventListener("keydown", onDigitPressed);

function onDigitPressed(event) {
    const pressedKey = event.key;
    console.log(`Pressed KEY: ${pressedKey}`);
    const allowedDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (allowedDigits.includes(pressedKey)){

        if (operator === "" && result === "") {
            //building number1 from scratch. 
            inputDisplay.value += pressedKey;
            console.log(`user building number1 from scratch key pressed: ${inputDisplay.value}`);
        }
        else if (operator === "" && result !== "") {
            //user pressed digit after equals, start fresh number1.
            number1 = "";
            result = "";
            inputDisplay.value = pressedKey;
            console.log(`user pressed KEY after equals, start fresh number1`);
        }
    
        else if (justPressedOperator) {
            //overwrite display because operator was just clicked
            inputDisplay.value = pressedKey;
            justPressedOperator = false; //reset flag
            console.log("overwrite display because operator was just clicked or PRESSED");
        }

        else {
            //normal case: typing number2
            inputDisplay.value += pressedKey;
        }
    }
}


//  b. Possible conditions when an operator KEY is PRESSED. (+, -, *, /) on keyboard in 
// the input tag. onOperatorClick()

inputDisplay.addEventListener("keydown", onOperatorPressed);

function onOperatorPressed(event) {
    const pressedKey1 = event.key;
    const allowedOperators = ["+", "-", "*", "/"];

    if (allowedOperators.includes(pressedKey1)){

        if (number1 === "" && result === "") {
            //First operator clicked after entering first number
            number1 = inputDisplay.value;
            operator = event.key;
            // inputDisplay.value = "";
            justPressedOperator = true;  //mark state
            console.log(`First operator KEY PRESSED ${operator}after entering first number. number1: ${number1}`)
        }

        else if (justPressedOperator) {
            //user clicked multiple operator just update operator
            operator = event.key;
            console.log("User clicked multiple operator", operator);
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
            operator = event.key;
            number2 = "";
            justPressedOperator = true;  //mark state again        
            console.log(`Second OPERATOR KEY is PRESSED, number2 has been entered we are ready to operate. number1:${number1}, number2: ${number2} result: ${result}`);
        }

        else if (result !== "" && inputDisplay.value === "") {
            //result exists from a previous calculation user is chaining operators without typing new number.
            number1 = result;
            operator = event.key;
            // result = "";
            justPressedOperator = true;  // mark state again 
            console.log(`You PRESSED OPERATOR KEY: ${operator} result is :${result}`);
        }
    }
};        


//  c. When equals KEY is PRESSED on keyboard in the input tag. OnEqualsPRESS ()

inputDisplay.addEventListener("keydown", OnEqualsPress);

function OnEqualsPress(event) {
    const pressedKey2 = event.key;
    const allowedResultKeys = ["=", "Enter"];

    if (allowedResultKeys.includes(pressedKey2)){

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
    }
};


//d. When (DEL)/(Backspace) KEY is PRESSED inside input tag. OnBackspacePress()


inputDisplay.addEventListener("keydown", OnBackspacePress);

function OnBackspacePress(event) {
    const pressedKey3 = event.key;
    console.log("You pressed: ", pressedKey3);
    const allowedDelKeys = ["Backspace", "Delete"];
    const displayValue1 = inputDisplay.value;

    if (allowedDelKeys.includes(pressedKey3)){
        if (inputDisplay.value === "ERROR") {
            inputDisplay.value = "0";
        }
        else {
            inputDisplay.value = displayValue1.slice(0, -1); //Removes the last character
        }
    }
};


//  e. When "." KEY is PRESSED. onDotPressed()

inputDisplay.addEventListener("keydown", onDotPressed);

function onDotPressed(event) {
    const pressedKey4 = event.key;
    const displayContent = inputDisplay.value;

    if (pressedKey4 === "."){

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
    }
};
