// Grab the display element from the DOM
const display = document.getElementById('display');
let currentExpression = '';
let isResultDisplayed = false;


function appendNumber(number) {
    if (isResultDisplayed) {
        currentExpression = '';
        isResultDisplayed = false;
    }
    if (currentExpression === '0' && number !== '.') {
        currentExpression = number;
    } else {
        currentExpression += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    isResultDisplayed = false;

    const lastChar = currentExpression.slice(-1);
    if (currentExpression === '' || ['+', '-', '*', '/'].includes(lastChar)) {
        return; 
    }
    currentExpression += operator;
    updateDisplay();
}


function clearDisplay() {
    currentExpression = '0';
    updateDisplay();
}


function calculate() {
    try {
        // Error Handling: Catch divide by zero
        if (currentExpression.includes('/0')) {
            display.innerText = "Error: Divide by 0";
            currentExpression = '';
            isResultDisplayed = true;
            return;
        }

        // Perform calculation
        const result = eval(currentExpression);
        
        // Handle undefined or NaN results
        if (result === undefined || isNaN(result)) {
            display.innerText = "Error";
            currentExpression = '';
        } else {
            // Round long decimals to keep display clean
            currentExpression = Math.round(result * 100000000) / 100000000;
            currentExpression = currentExpression.toString();
            updateDisplay();
        }
        isResultDisplayed = true;
    } catch (error) {
        display.innerText = "Error";
        currentExpression = '';
        isResultDisplayed = true;
    }
}

// Helper to update DOM
function updateDisplay() {
    display.innerText = currentExpression || '0';
}