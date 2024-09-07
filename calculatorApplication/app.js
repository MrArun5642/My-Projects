let display = document.getElementById('display');


function appendToDisplay(value) {
    console.log(value,"888=")
    display.value += value;
}


function clearDisplay() {
    display.value = '';
}


function calculate() {
    try {
        let result = eval(display.value);
        if (result === Infinity) {
            throw new Error('Division by zero');
        }
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}


function calculateSquareRoot() {
    try {
        let result = Math.sqrt(parseFloat(display.value));
        if (isNaN(result)) {
            throw new Error('Invalid input');
        }
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}


function calculatePercentage() {
    try {
        let result = parseFloat(display.value) / 100;
        if (isNaN(result)) {
            throw new Error('Invalid input');
        }
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}


function handleKeyboardInput(event) {
    const key = event.key;


    if (!isNaN(key) || key === '.') {
        appendToDisplay(key);
    }


    if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    }

 
    if (key === 'Enter' || key === '=') {
        event.preventDefault(); 
        calculate();
    }

    if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }

    if (key === 'Escape' || key.toUpperCase() === 'C') {
        clearDisplay();
    }

    if (key.toUpperCase() === 'S') {
        calculateSquareRoot();
    }

    if (key === '%') {
        calculatePercentage();
    }
}

document.addEventListener('keydown', handleKeyboardInput);
