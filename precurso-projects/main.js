const numberButton = document.getElementsByName('number');
const operationButton = document.getElementsByName('operation');
const equalButton = document.getElementsByName('equal')[0];
const deleteButton = document.getElementsByName('delete')[0];

let result = document.getElementById('result');
let currentOperation = '';
let previuousOperation = '';
let operation = undefined;
let previousNumber="";
let currentNumber="";

numberButton.forEach(button => {
    button.addEventListener('click', ()=>{
        addNumber(button.innerText)
    })
});

operationButton.forEach(button => {
    button.addEventListener('click', ()=>{
        selectOperation(button.innerText);
    })
});

equalButton.addEventListener('click', ()=>{
    calculate();
    updateDisplay();
});

deleteButton.addEventListener('click', ()=>{
    clearDisplay();
    updateDisplay();
})

const selectOperation = (op) => {
    if(currentOperation === '') return;
    if(previuousOperation !== ''){
        calculate();
    }
    operation = op.toString();
    previuousOperation = currentOperation;
    currentOperation = '';
}

const calculate = () => {
    let calculation;
    previousNumber = parseFloat(previuousOperation);
    currentNumber = parseFloat(currentOperation);
    
    if(isNaN(previousNumber) || isNaN(currentNumber)) return;
    
    switch (operation) {
        case "+":
            calculation = previousNumber + currentNumber;
            break;
        case "-":
            calculation = previousNumber - currentNumber;
            break;
        case "*":
            calculation = previousNumber * currentNumber;
            break;
        case "/":
            calculation = previousNumber / currentNumber;
            break;
        default:
            return;
    }
    currentOperation = calculation;
    operation = undefined;
    previuousOperation = '';
}

const addNumber = (num) => {
    if(num==="." && currentOperation.includes(".")) return;
    currentOperation = currentOperation.toString() + num.toString();
    updateDisplay();
}

const clearDisplay = () => {
    currentOperation = '';
    previuousOperation = '';
    operation = undefined;
}

const updateDisplay = () => {
    result.value = currentOperation;
}