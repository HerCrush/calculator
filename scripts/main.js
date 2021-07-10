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
    if(b===0) {
        return 'Math ERROR'
    }
    return a/b;
}

function operate(op,a,b) {
    a = + a;
    b = + b;
    switch(op) {
        case '+': return limitDigits(add(a,b));
            break;
        case '-': return limitDigits(subtract(a,b));
            break;
        case '*': return limitDigits(multiply(a,b));
            break;
        case '/': return limitDigits(divide(a,b));
            break;
        default: return 'Syntax error!';
    }
}

function limitDigits(num) {
    if(num==='Math ERROR') {
        return num;
    }
    if(num>=100000000000) {
        let e = 0;
        while(num>=10){
            num = num/10;
            e++;
        }
        num = Math.round(num*1000)/1000;
        return `${num}e${e}`;
    }
    if(num<0.000000001) {
        let e = 0;
        while(num<1){
            num = num*10;
            e--;
        }
        num = Math.round(num*1000)/1000;
        return `${num}e${e}`;
    }
    if(String(num).length>11) {
        let index = String(num).indexOf('.');
        if(index>10) {
            return Math.round(num);
        }
        return Math.round(num*(10**(10-index)))/(10**(10-index));
    }
    return num;
}


let displayValue = '';

const displayScreen = document.querySelector('#display');

let storedOperator = '';

let storedValue = '';

let nextTimeClean = false;


//NUMBER BUTTONS
const digBtns = document.querySelectorAll('.digit');
digBtns.forEach( btn => btn.addEventListener( 'click' , e => {
    if(nextTimeClean) {
        displayScreen.textContent = '';
        displayValue = '';
        nextTimeClean = false;
    }
    if(displayValue.length>10) {
        return;
    }
    displayValue+=e.target.innerText;
    displayScreen.textContent = displayValue;
} ) );

//OPERATIONS BUTTONS
const opBtns = document.querySelectorAll('.operator');
opBtns.forEach( btn => btn.addEventListener( 'click' , e => {
    if(storedOperator) {
        displayScreen.textContent = storedValue = operate(storedOperator,storedValue,displayValue);
        displayValue = '';
    }
    else {
        storedValue = displayValue;
        displayValue = '';
    }
    storedOperator = e.target.innerText;
    nextTimeClean = true;
    if(storedValue==='Math ERROR') {
        clearMemory();
    }
} ) );

//CLEAR BUTTON
const clrBtn = document.querySelector('#clear_btn');
clrBtn.addEventListener( 'click' , () => {
    clearMemory();
    displayScreen.textContent = '';
} );

//EQUAL BUTTON
const eqlBtn = document.querySelector('#equal_btn');
eqlBtn.addEventListener( 'click' , e => {
    if( storedOperator!=='' && storedValue!=='' && displayValue!=='' ) {
        displayScreen.textContent = displayValue = operate(storedOperator,storedValue,displayValue);
        storedValue = '';
        nextTimeClean = true;
    }
    storedOperator = '';
    if(displayValue==='Math ERROR') {
        clearMemory();
    }
} );


function clearMemory() {
    displayValue = '';
    storedOperator = '';
    storedValue = '';
    nextTimeClean = true;
}