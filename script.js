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
        case "add":
            return add(number1, number2);
        case "subtract":
            return subtract(number1, number2); 
        case "multiply":
            return multiply(number1, number2);
        case "divide":
            return divide(number1, number2);
        default: 
            return "Unknown operator";
    }
}