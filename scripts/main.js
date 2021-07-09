function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(op,a,b) {
    a = + a;
    b = + b;
    switch(op) {
        case '+': return add(a,b);
            break;
        case '-': return subtract(a,b);
            break;
        case '*': return multiply(a,b);
            break;
        case '/': return divide(a,b);
            break;
        default: return 'Syntax error!';
    }
}


let displayValue = '';

const displayScreen = document.querySelector('#display');

let storedOperator = '';

let storedValue = '';

let nextTimeClean = false;


//NUMBER BUTTONS
const digBtns = document.querySelectorAll('.digit');
digBtns.forEach( btn => btn.addEventListener( 'click' , e => {
    if(nextTimeClean){
        displayScreen.textContent = '';
        displayValue = '';
        nextTimeClean = false;
    }
    displayValue+=e.target.innerText;
    displayScreen.textContent = displayValue;
} ) );

//OPERATIONS BUTTONS
const opBtns = document.querySelectorAll('.operator');
opBtns.forEach( btn => btn.addEventListener( 'click' , e => {
    if(storedOperator){
        displayScreen.textContent = storedValue = operate(storedOperator,storedValue,displayValue);
        displayValue = '';
    }
    else{
        storedValue = displayValue;
        displayValue = '';
    }
    storedOperator = e.target.innerText;
    nextTimeClean = true;
} ) );

//CLEAR BUTTON
const clrBtn = document.querySelector('#clear_btn');
clrBtn.addEventListener( 'click' , e => {
    displayScreen.textContent = '';
    displayValue = '';
    storedOperator = '';
    storedValue = '';
    nextTimeClean = false;
} )

//EQUAL BUTTON
const eqlBtn = document.querySelector('#equal_btn');
eqlBtn.addEventListener( 'click' , e => {
    if( storedOperator!=='' && storedValue!=='' && displayValue!=='' ){
        displayScreen.textContent = displayValue = operate(storedOperator,storedValue,displayValue);
        storedValue = '';
        nextTimeClean = true;
    }
    storedOperator = '';
} );