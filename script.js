let result = '0';
let firstNumber = result;
let secondNumber = '';
let currentOperator = '';
let operatorPressed = false;

let display = document.querySelector('.display')
let one = document.querySelector('.one');
let two = document.querySelector('.two');
let three = document.querySelector('.three');
let four = document.querySelector('.four');
let five = document.querySelector('.five');
let six = document.querySelector('.six');
let seven = document.querySelector('.seven');
let eight = document.querySelector('.eight');
let nine = document.querySelector('.nine');
let zero = document.querySelector('.zero');
let dot = document.querySelector('.dot');
let add = document.querySelector('.add');
let sub = document.querySelector('.sub');
let divide = document.querySelector('.divide');
let mul = document.querySelector('.mul');
let equals = document.querySelector('.equals');
let clear = document.querySelector('.clear')
let backspace = document.querySelector('.backspace')

display.textContent = 0;
one.addEventListener('click', () => updateNumber('1'));
two.addEventListener('click', () => updateNumber('2'));
three.addEventListener('click', () => updateNumber('3'));
four.addEventListener('click', () => updateNumber('4'));
five.addEventListener('click', () => updateNumber('5'));
six.addEventListener('click', () => updateNumber('6'));
seven.addEventListener('click', () => updateNumber('7'));
eight.addEventListener('click', () => updateNumber('8'));
nine.addEventListener('click', () => updateNumber('9'));
zero.addEventListener('click', () => updateNumber('0'));
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
    console.log(number.includes('.'))
    return number.includes('.');
}  

function checkCurrentNumber(){
    if(operatorPressed) return secondNumber;
    return firstNumber;
}

function updateNumber(number){
    let currentNumber = checkCurrentNumber();
    if(dotCheck(currentNumber) && number === '.') return;
    if(currentNumber === firstNumber){
        if(display.textContent.length === 12) return;
        firstNumber += number; 
    }
    else if(display.textContent.length === 14) return;
    else{
        console.log('secondNumber')
        secondNumber += number;
    }
    displayNumber(number);
}

function onBackspace(){
    let currentNumber = checkCurrentNumber();
    console.log('in');
    let length = display.textContent.length;
    if(isOperator(display.textContent[length - 1])) return;
    console.log('still in')
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    if(currentNumber === firstNumber){
        firstNumber = firstNumber.slice(0, firstNumber.length - 1)
        console.log(firstNumber);
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
    firstNumber = '';
    secondNumber = '';
    operatorPressed = false;
    display.textContent = result;
}

function onOperator(operator){
    if(display.textContent.length === 14) return;
    if(operatorPressed){
        if (operate() === 'error') return;
    }
    operatorPressed = true;
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
    if(operatorPressed){
        firstNumber = result;
    }
    secondNumber = '0';
    console.log('f', firstNumber);
    console.log('s', secondNumber);
    console.log('r', result);
}

function onAdd(){
    return (Number(firstNumber) + Number(secondNumber)).toString();
}

function onSub(){
    return (Number(firstNumber) - Number(secondNumber)).toString();
}

function onMul(){
    return (Number(firstNumber) * Number(secondNumber)).toString();
}

function onDivide(){
    return (Number(firstNumber) / Number(secondNumber)).toString();
}