let expression = "";
let lastResult = null;
let justCalculated = false;

function press(value) {
    if (justCalculated) {
        if (/[0-9.]/.test(value)) {
            expression = value;
        } else {
            expression = lastResult + value;
        }
        justCalculated = false;
    } else {
        expression += value;
    }
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    lastResult = null;
    justCalculated = false;
    updateDisplay();
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function toggleSign() {
    if (expression) {
        if (expression.startsWith('-')) {
            expression = expression.slice(1);
        } else {
            expression = '-' + expression;
        }
        updateDisplay();
    }
}

function calculate() {
    try {
        let expr = expression.replace(/%/g, "/100");
        let ans = Function("return (" + expr + ")")();

        if (Math.abs(ans) >= 1e12 || (Math.abs(ans) < 1e-6 && ans !== 0)) {
            ans = ans.toExponential();
        }

        document.getElementById("result").innerText = ans;
        lastResult = ans;     // store last answer
        justCalculated = true; // mark that "=" was pressed
    } catch {
        document.getElementById("result").innerText = "Error";
        lastResult = null;
        justCalculated = true;
    }
}

function updateDisplay() {
    const display = document.getElementById("result");
    const equation = document.getElementById("equation");

    equation.innerText = expression;
    display.innerText = expression || "0";

    if (display.innerText.length > 12) {
        display.classList.add("shrink");
    } else {
        display.classList.remove("shrink");
    }
}
