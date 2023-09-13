const display = document.getElementById("display");
let currentInput = "";
let currentOperator = "";
let firstOperand = "";
let secondOperand = "";

function updateDisplay() {
  display.textContent = currentInput;
}

function handleNumberClick(number) {
  currentInput += number;
  updateDisplay();
}

function handleOperatorClick(operator) {
  if (currentInput !== "") {
    firstOperand = currentInput;
    currentInput = "";
    currentOperator = operator;
  }
}

function calculate() {
  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);
  switch (currentOperator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1*num2;
    case "/":
      return num1/num2;
    default:
      return;
  }
}

function handleEqualClick() {
  if (currentOperator !== "") {
    secondOperand = currentInput;
    const result = calculate();
    currentInput = result.toString();
    updateDisplay();
    firstOperand = "";
    secondOperand = "";
    currentOperator = "";
  }
}
function clearDisplay() {
  currentInput = "";
  firstOperand = "";
  secondOperand = "";
  currentOperator = "";
  updateDisplay();
}
document.getElementById("clear").addEventListener("click", clearDisplay);
document.getElementById("add").addEventListener("click", () => handleOperatorClick("+"));
document.getElementById("subtract").addEventListener("click", () => handleOperatorClick("-"));
document.getElementById("multiply").addEventListener("click", () => handleOperatorClick("*"));
document.getElementById("divide").addEventListener("click", () => handleOperatorClick("/"));
document.getElementById("equals").addEventListener("click", handleEqualClick);

for (let i = 0; i <= 9; i++) {
  document.getElementById(i.toString()).addEventListener("click", () => handleNumberClick(i.toString()));
}
document.getElementById("decimal").addEventListener("click", () => {
  if (currentInput.indexOf(".") === -1) {
    currentInput += ".";
    updateDisplay();
  }
});
