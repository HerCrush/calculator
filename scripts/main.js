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
    if(a==='.') a = 0;
    if(b==='.') b = 0;
    a = + a;
    b = + b;
    switch(op) {
        case '+':
            return limitDigits(add(a,b));
            break;
        case '-':
            return limitDigits(subtract(a,b));
            break;
        case '*':
            return limitDigits(multiply(a,b));
            break;
        case '/':
            return limitDigits(divide(a,b));
            break;
        default:
            return 'Syntax error!';
    }
}

function limitDigits(num) {
    if(num==='Math ERROR' || num===0) {
        return num;
    }
    if(Math.abs(num)>=100000000000) {
        let e = 0;
        while(Math.abs(num)>=10){
            num = num/10;
            e++;
        }
        num = Math.round(num*1000)/1000;
        return `${num}e${e}`;
    }
    if(Math.abs(num)<0.000000001) {
        let e = 0;
        while(Math.abs(num)<1){
            num = num*10;
            e--;
        }
        num = Math.round(num*1000)/1000;
        return `${num}e${e}`;
    }
    if(String(num).length>11) {   //in case the number doesn't meet above conditions but still overflows the display
        if(num<0) {
            num = Math.abs(num);
            let index = String(num).indexOf('.');
            if(index>10) {
                let e = 0;
                while(num>=10){
                num = num/10;
                e++;
                }
            num = Math.round(num*1000)/1000;
            return `${num*(-1)}e${e}`;
            }
            else if(index===10) {
                return Math.round(num*(-1));
            }
            num = Math.round(num*(10**(9-index)))/(10**(9-index));
            return num*(-1);
        }
        else {
            let index = String(num).indexOf('.');
            if(index>10) {
                return Math.round(num);
            }
            return Math.round(num*(10**(10-index)))/(10**(10-index));
        }
    }
    return num;
}


let displayValue = '';

const displayScreen = document.querySelector('#display');

let storedOperator = '';

let storedValue = '';

let nextTimeClean = false;

let dotDisabled = false;


//NUMBER BUTTONS
const digBtns = document.querySelectorAll('.digit');
digBtns.forEach( btn => btn.addEventListener( 'click' , e => {
    if(nextTimeClean) {
        displayScreen.textContent = '';
        displayValue = '';
        nextTimeClean = false;
        dotDisabled = false;
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
    if(storedValue==='Math ERROR') {
        clearMemory();
        return;
    }
    storedOperator = e.target.innerText;
    nextTimeClean = true;
    dotDisabled = false;
} ) );

//CLEAR BUTTON
const clrBtn = document.querySelector('#clear_btn');
clrBtn.addEventListener( 'click' , () => {
    clearMemory();
    displayScreen.textContent = '';
} );

//EQUAL BUTTON
const eqlBtn = document.querySelector('#equal_btn');
eqlBtn.addEventListener( 'click' , () => {
    if( storedOperator!=='' && storedValue!=='' && displayValue!=='' ) {
        displayScreen.textContent = displayValue = operate(storedOperator,storedValue,displayValue);
        storedValue = '';
        nextTimeClean = true;
        dotDisabled = false;
    }
    if(displayValue==='Math ERROR') {
        clearMemory();
        return;
    }
    storedOperator = '';
} );

//DOT BUTTON
const dotBtn = document.querySelector('#dot');
dotBtn.addEventListener( 'click' , () => {
    if(!dotDisabled){
        if(nextTimeClean) {
            displayScreen.textContent = '';
            displayValue = '';
            nextTimeClean = false;
        }
        if(displayValue.length>10) {
            return;
        }
        displayValue+='.';
        displayScreen.textContent = displayValue;
        dotDisabled = true;
    }
} );


function clearMemory() {
    displayValue = '';
    storedOperator = '';
    storedValue = '';
    nextTimeClean = true;
    dotDisabled = false;
}