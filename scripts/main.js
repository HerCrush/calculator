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
    switch(op) {
        case '+': return a+b;
            break;
        case '-': return a-b;
            break;
        case '*': return a*b;
            break;
        case '/': return a/b;
            break;
        default: return 'Syntax error!';
    }
}