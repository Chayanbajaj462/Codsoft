document.addEventListener('DOMContentLoaded', function() {
    let display = document.getElementById('display');
    let currentValue = '0';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';
    let shouldReset = false;

    function updateDisplay() {
        display.innerText = currentValue;
    }

    function clear() {
        currentValue = '0';
        operator = '';
        firstOperand = '';
        secondOperand = '';
        shouldReset = false;
        updateDisplay();
    }

    function handleOperator(op) {
        if (operator === '' && !shouldReset) {
            operator = op;
            firstOperand = currentValue;
            currentValue = '0';
        } else if (operator !== '' && !shouldReset) {
            secondOperand = currentValue;
            currentValue = operate(firstOperand, secondOperand, operator);
            firstOperand = currentValue;
            secondOperand = '';
            operator = op;
        } else if (shouldReset) {
            operator = op;
            shouldReset = false;
        }
        updateDisplay();
    }

    function operate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                if (b !== 0) {
                    return (a / b).toString();
                } else {
                    clear();
                    return 'Error';
                }
            default:
                return b;
        }
    }

    function handleNumber(number) {
        if (shouldReset) {
            currentValue = '0';
            shouldReset = false;
        }
        if (currentValue === '0' || currentValue === '-0') {
            currentValue = number;
        } else {
            currentValue += number;
        }
        updateDisplay();
    }

    function convertTemperature() {
        // Convert between Fahrenheit and Celsius
        if (currentValue.endsWith('°F')) {
            const fahrenheit = parseFloat(currentValue);
            const celsius = ((fahrenheit - 32) * 5/9).toFixed(2);
            currentValue = celsius + '°C';
        } else if (currentValue.endsWith('°C')) {
            const celsius = parseFloat(currentValue);
            const fahrenheit = ((celsius * 9/5) + 32).toFixed(2);
            currentValue = fahrenheit + '°F';
        }
        updateDisplay();
    }

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', function() {
            handleNumber(button.innerText);
        });
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', function() {
            handleOperator(button.innerText);
        });
    });

    document.getElementById('clear').addEventListener('click', function() {
        clear();
    });

    document.getElementById('calculate').addEventListener('click', function() {
        if (operator !== '' && secondOperand !== '') {
            currentValue = operate(firstOperand, secondOperand, operator);
            firstOperand = '';
            secondOperand = '';
            operator = '';
            shouldReset = true;
            updateDisplay();
        }
    });

    document.getElementById('decimal').addEventListener('click', function() {
        if (!currentValue.includes('.')) {
            currentValue += '.';
            updateDisplay();
        }
    });

    document.getElementById('convert').addEventListener('click', function() {
        convertTemperature();
    });

    document.getElementById('backspace').addEventListener('click', function() {
        clear();
    });
});
