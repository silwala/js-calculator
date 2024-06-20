let result = '0';
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let operatorPressed = false;
let equalsPressed = false;

let display = document.querySelector('.display')
let numbers = document.querySelectorAll('.numBtn')
let dot = document.querySelector('.dot');
let add = document.querySelector('.add');
let sub = document.querySelector('.sub');
let divide = document.querySelector('.divide');
let mul = document.querySelector('.mul');
let equals = document.querySelector('.equals');
let clear = document.querySelector('.clear')
let backspace = document.querySelector('.backspace')

display.textContent = 0;
numbers.forEach((number) => number.addEventListener('click', () => updateNumber(number.textContent)))
dot.addEventListener('click', () => updateNumber('.'));
add.addEventListener('click', () => onOperator('+'));
sub.addEventListener('click', () => onOperator('-'));
mul.addEventListener('click', () => onOperator('x'));
equals.addEventListener('click', onEqual);
divide.addEventListener('click', () => onOperator('/'));
backspace.addEventListener('click', onBackspace);
clear.addEventListener('click', onClear);
display.textContent = result;


function dotCheck(number){
    return number.includes('.');
}  

function checkCurrentNumber(){
    if(operatorPressed) return 'secondNumber';
    return 'firstNumber';
}

function updateNumber(number){
    let currentNumber = checkCurrentNumber();
    if(dotCheck(currentNumber) && number === '.') return;
    if(currentNumber === 'firstNumber'){
        if(display.textContent.length === 12) return;
        if(equalsPressed) {
            onClear();
        }
        firstNumber += number; 
    }
    else if(display.textContent.length === 14) return;
    else{
        secondNumber += number;
    }
    displayNumber(number);
}

function onBackspace(){
    let currentNumber = checkCurrentNumber();
    let length = display.textContent.length;
    if(isOperator(display.textContent[length - 1])) return;
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    if(currentNumber === firstNumber){
        firstNumber = firstNumber.slice(0, firstNumber.length - 1)
    }
    else{
        secondNumber = secondNumber.slice(0, secondNumber.length - 1)
    }

    if(display.textContent === ''){
        display.textContent = '0';
    }
}

function isOperator(character){
    return (character === '+' || character === '-' || character === 'x' || character === '/')
}

function displayNumber(number){
    if(display.textContent === '0'){
        display.textContent = number;
    }
    else{
        display.textContent += number;
    }
}

function onClear(){
    result = '0';
    firstNumber = result;
    secondNumber = '';
    operatorPressed = false;
    equalsPressed = false;
    display.textContent = result;
}

function onOperator(operator){
    if(display.textContent.length === 14) return;
    if(operatorPressed){
        if (operate() === 'error') return;
    }
    operatorPressed = true;
    equalsPressed = false;
    currentOperator = operator;
    let length = display.textContent.length;
    if(isOperator(display.textContent[length - 1])){
        display.textContent = display.textContent.replace(display.textContent[length - 1], operator);
    }
    else{
        display.textContent += operator;
    }
}

function onEqual(){
    operatorPressed = false;
    equalsPressed = true;
    operate();
}

function operate(){

    if(currentOperator === '') return;
    if(currentOperator === '+'){
        result = onAdd();
    }
    else if(currentOperator === '-'){
        result = onSub();
    }
    else if(currentOperator === 'x'){
        result = onMul();
    }
    else if(currentOperator === '/'){
        result = onDivide();
    }
    if(result.length > 14){
        display.textContent = 'length too long';
        setTimeout(onClear, 1000);
        return 'error';
    }
    else{
        display.textContent = result;
    }
    firstNumber = result;
    secondNumber = '0';
}

function onAdd(){
    let answer = (Number(firstNumber) + Number(secondNumber)).toString();
    return checkToRound(answer);
}

function onSub(){
    let answer =  (Number(firstNumber) - Number(secondNumber)).toString();
    return checkToRound(answer);
}

function onMul(){
    let answer = (Number(firstNumber) * Number(secondNumber)).toString();
    return checkToRound(answer);

}

function onDivide(){
    let answer = (Number(firstNumber) / Number(secondNumber)).toString();
    return checkToRound(answer);

}

function checkToRound(number){
    let numParts;
    if(number.includes('.')){
        numParts = number.split('.');
        if(numParts[1].length > 3){
            return (Number(number).toFixed(3)).toString();
        }
    }
    return number;
}