let currentOperand = "";
let previousOperand = "";
let operation = null;

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Handle number keys (0-9) and dot for decimals
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    }
    
    // Handle operations (+, -, *, /, %)
    else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        chooseOperation(key);
    }
    
    // Handle the "Enter" key for calculation
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    
    // Handle the "Backspace" key for removing the last character
    else if (key === 'Backspace') {
        backspace();
    }
    
    // Handle the "Escape" key for clearing the display
    else if (key === 'Escape') {
        clearDisplay();
    }
});

function clearDisplay() {
    currentOperand = "";
    previousOperand = "";
    operation = null;
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    currentOperand = result.toFixed(10).replace(/\.0$/, ''); // Format result
    operation = null;
    previousOperand = "";
    updateDisplay();
}

function updateDisplay() {
    if (operation != null) {
        document.getElementById("display").value = previousOperand + " " + operation + " " + currentOperand;
    } else {
        document.getElementById("display").value = currentOperand || "0";
    }
}

function backspace() {
    if (currentOperand !== "") {
        currentOperand = currentOperand.slice(0, -1);
    } else if (previousOperand !== "") {
        previousOperand = previousOperand.slice(0, -1);
    }
    updateDisplay();
}

