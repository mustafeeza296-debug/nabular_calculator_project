// Nova Calculator - built with vanilla JavaScript (no calculation libraries).

const display = document.getElementById("display");
const expression = document.getElementById("expression");
const statusText = document.getElementById("statusText");
const keypad = document.getElementById("keypad");
const themeToggle = document.getElementById("themeToggle");

let currentInput = "0";
let previousInput = null;
let currentOperator = null;
let shouldResetDisplay = false;
let lastExpression = "";

// Keep the display readable without changing the numeric value used for calculations.
function updateDisplay() {
  display.innerText = currentInput;
  expression.innerText = lastExpression;
}

function setStatus(message) {
  statusText.innerText = message;
}

function inputNumber(number) {
  if (shouldResetDisplay || currentInput === "Error") {
    currentInput = number;
    shouldResetDisplay = false;
  } else if (currentInput === "0") {
    currentInput = number;
  } else if (currentInput.length < 16) {
    currentInput += number;
  }
  setStatus("Entering a number");
  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay || currentInput === "Error") {
    currentInput = "0";
    shouldResetDisplay = false;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  setStatus("Decimal point added");
  updateDisplay();
}

function chooseOperator(operator) {
  if (currentInput === "Error") return;
  const value = Number(currentInput);

  if (previousInput !== null && currentOperator && !shouldResetDisplay) {
    calculate();
  }

  previousInput = Number(currentInput);
  currentOperator = operator;
  shouldResetDisplay = true;
  lastExpression = `${formatNumber(previousInput)} ${operatorSymbol(operator)}`;
  setStatus("Choose the next number");
  updateDisplay();
}

function calculateValues(first, second, operator) {
  // if/else is used to select the requested arithmetic operation.
  if (operator === "+") return first + second;
  else if (operator === "-") return first - second;
  else if (operator === "*") return first * second;
  else if (operator === "/") {
    if (second === 0) throw new Error("Cannot divide by zero");
    return first / second;
  } else if (operator === "%") {
    if (second === 0) throw new Error("Cannot use modulo with zero");
    return first % second;
  }
  throw new Error("Unknown operation");
}

function calculate() {
  if (previousInput === null || currentOperator === null || currentInput === "Error") return;

  const first = previousInput;
  const second = Number(currentInput);
  const operator = currentOperator;

  try {
    const answer = calculateValues(first, second, operator);
    if (!Number.isFinite(answer)) throw new Error("Result is out of range");

    lastExpression = `${formatNumber(first)} ${operatorSymbol(operator)} ${formatNumber(second)} =`;
    currentInput = formatNumber(answer);
    previousInput = null;
    currentOperator = null;
    shouldResetDisplay = true;
    setStatus("Calculation complete");
  } catch (error) {
    showError(error.message);
  }
  updateDisplay();
}

function formatNumber(number) {
  if (!Number.isFinite(Number(number))) return "Error";
  // Round floating-point artefacts while retaining useful decimal precision.
  return String(Number(Number(number).toPrecision(12)));
}

function operatorSymbol(operator) {
  const symbols = { "/": "÷", "*": "×", "-": "−", "+": "+", "%": "%" };
  return symbols[operator] || operator;
}

function clearAll() {
  currentInput = "0";
  previousInput = null;
  currentOperator = null;
  shouldResetDisplay = false;
  lastExpression = "";
  setStatus("Ready for your next calculation");
  updateDisplay();
}

function clearEntry() {
  currentInput = "0";
  shouldResetDisplay = false;
  setStatus("Current entry cleared");
  updateDisplay();
}

function backspace() {
  if (shouldResetDisplay || currentInput === "Error") {
    currentInput = "0";
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    if (currentInput === "-") currentInput = "0";
  }
  updateDisplay();
}

function squareRoot() {
  if (currentInput === "Error") return;
  const value = Number(currentInput);
  if (value < 0) {
    showError("Square root of a negative number is not real");
    return;
  }
  const answer = Math.sqrt(value);
  lastExpression = `√(${formatNumber(value)})`;
  currentInput = formatNumber(answer);
  shouldResetDisplay = true;
  setStatus("Square root calculated");
  updateDisplay();
}

function showError(message) {
  currentInput = "Error";
  previousInput = null;
  currentOperator = null;
  shouldResetDisplay = true;
  lastExpression = message;
  setStatus(message);
  updateDisplay();
}

// Event delegation: one listener handles all calculator keys.
keypad.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) inputNumber(button.dataset.number);
  else if (button.dataset.operator) chooseOperator(button.dataset.operator);
  else if (button.dataset.action === "decimal") inputDecimal();
  else if (button.dataset.action === "sqrt") squareRoot();
  else if (button.dataset.action === "equals") calculate();
});

// Utility controls are handled with a separate event listener.
document.querySelector(".utility-row").addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.action === "clear") clearAll();
  else if (button.dataset.action === "clear-entry") clearEntry();
  else if (button.dataset.action === "backspace") backspace();
  else if (button.dataset.operator) chooseOperator(button.dataset.operator);
});

// Keyboard support for digits, operators, Enter, Escape, decimal and Backspace.
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") inputNumber(key);
  else if (key === ".") inputDecimal();
  else if (["+", "-", "*", "/", "%"].includes(key)) chooseOperator(key);
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Escape") clearAll();
  else if (key === "Backspace") backspace();
});

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  document.getElementById("themeIcon").innerText = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
});

// Demonstrate a loop by adding accessible labels to all calculator keys.
const allKeys = document.querySelectorAll(".keypad button, .utility-row button");
for (let index = 0; index < allKeys.length; index++) {
  allKeys[index].setAttribute("tabindex", "0");
}

updateDisplay();
