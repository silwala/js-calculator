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

let result = '0';
let firstNumber = '';
let secondNumber = '';
let operatorPressed = false;

function dotCheck(number){
    console.log(number.includes('.'))
    return number.includes('.');
}  

function updateNumber(number){
    let currentNumber = firstNumber;
    if(operatorPressed){
        currentNumber = secondNumber;
    }
    
    if(dotCheck(currentNumber)) return;
    if(currentNumber === firstNumber){
        firstNumber += number; 
    }
    else{
        console.log('secondNumber')
        secondNumber += number;
    }
    displayNumber(number);
}

function displayNumber(number){
    if(display.textContent === '0'){
        display.textContent = number;
    }
    else{
        display.textContent += number;
    }
}




