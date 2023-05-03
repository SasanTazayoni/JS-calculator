let prevInput = document.querySelector('[data-prev-input]');
let currentInput = document.querySelector('[data-current-input]');
const allClearBtn = document.querySelector('[data-clear]');
const inverseSignBtn = document.querySelector('[data-plus-minus]');
const deleteBtn = document.querySelector('[data-delete]');
const divideBtn = document.querySelector('[data-divide]');
const multiplyBtn = document.querySelector('[data-multiply]');
const subtractBtn = document.querySelector('[data-subtract]');
const addBtn = document.querySelector('[data-add]');
const equalsBtn = document.querySelector('[data-equals]');
const numberBtns = document.querySelectorAll('[data-number]');
let operator = null;

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const digit = btn.innerText;
        if (currentInput.innerText === '😑 Divide by zero...') {
            currentInput.innerText = '';
        }
        addDigitToInput(digit);
    });
});

function addDigitToInput(digit) {
    const currentInputValue = currentInput.innerText;
    if (digit === '.' && currentInputValue.includes('.')) return;
    if (digit === '0' && currentInputValue === '0') return;
    currentInput.innerText += digit;
}

deleteBtn.addEventListener('click', () => {
    let currentInputValue = currentInput.innerText;
    if (currentInputValue === '') return;
    if (currentInputValue === '😑 Divide by zero...') {
        currentInputValue = '';
    }

    const newInput = parseFloat(currentInputValue.slice(0, -1));
    if (newInput === '-' || isNaN(newInput)) {
        currentInput.innerText = '';
    } else {
        currentInput.innerText = newInput;
    }
});

allClearBtn.addEventListener('click', () => {
    currentInput.innerText = '';
    prevInput.innerText = '';
});

inverseSignBtn.addEventListener('click', () => {
    const currentInputValue = currentInput.innerText;
    if (currentInputValue === '' || currentInputValue === '😑 Divide by zero...') return;
    currentInput.innerText = -currentInputValue;
});

function operationClick(operation) {
    if (currentInput.innerText === '' && prevInput.innerText === '') return;
    if (currentInput.innerText === '😑 Divide by zero...') return;
    if (currentInput.innerText && prevInput.innerText === '') {
        if (operation === '=') {
            return currentInput.innerText;
        } else {
            prevInput.innerText = `${parseFloat(currentInput.innerText)} ${operation}`;
            currentInput.innerText = '';
        }
    }
    if (currentInput.innerText === '' && prevInput.innerText) {
        if (operation === '=') {
            operator = prevInput.innerText.slice(-1);
            calculate(prevInput.innerText, prevInput.innerText);
        } else {
            operator = operation;
            prevInput.innerText = prevInput.innerText.slice(0, -1) + operation;
        }
    }
    if (currentInput.innerText && prevInput.innerText) {
        if (operation === '=') {
            console.log((prevInput.innerText).slice(0, -2))
            calculate(currentInput.innerText, (prevInput.innerText).slice(0, -2));
        } else {
            calculate(currentInput.innerText, (prevInput.innerText).slice(0, -2));
            operator = operation;
            prevInput.innerText = `${parseFloat(currentInput.innerText)} ${operation}`;
            currentInput.innerText = '';
        }
    }
}

divideBtn.addEventListener('click', () => {
    operationClick('/');
});

multiplyBtn.addEventListener('click', () => {
    operationClick('*');
});

subtractBtn.addEventListener('click', () => {
    operationClick('-');
});

addBtn.addEventListener('click', () => {
    operationClick('+');
});

equalsBtn.addEventListener('click', () => {
    operationClick('=');
});

function calculate(largeScreenInput, smallScreenInput) {
    const currentInputValue = parseFloat(largeScreenInput);
    const prevInputValue = parseFloat(smallScreenInput);
    let result;
    switch (operator) {
        case '/':
            if (currentInputValue === 0) {
                result = '😑 Divide by zero...';
            } else {
                result = prevInputValue / currentInputValue;
            }
            break;
        case '*':
            result = prevInputValue * currentInputValue;
            break;
        case '-':
            result = prevInputValue - currentInputValue;
            break;
        case '+':
            result = prevInputValue + currentInputValue;
            break;
        default:
            return;
    }
    if (typeof result === 'number') {
        currentInput.innerText = result.toFixed(6).replace(/\.?0+$/, '');
    } else {
        currentInput.innerText = result;
    }
    prevInput.innerText = '';
    operator = null;
}