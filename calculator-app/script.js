const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = '';

function updateDisplay() {
  display.value = expression;
}

function calculate() {
  try {
    // Only allow digits, operators, decimal points and spaces
    if (!/^[0-9+\-*/.\s]+$/.test(expression)) {
      throw new Error('Invalid expression');
    }
    const result = Function(`"use strict"; return (${expression})`)();
    if (!isFinite(result)) throw new Error('Math error');
    expression = String(result);
  } catch (err) {
    expression = 'Error';
  }
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const { action, value } = button.dataset;

    if (action === 'clear') {
      expression = '';
    } else if (action === 'delete') {
      expression = expression.slice(0, -1);
    } else if (action === 'equals') {
      calculate();
      return;
    } else if (value !== undefined) {
      if (expression === 'Error') expression = '';
      expression += value;
    }

    updateDisplay();
  });
});

document.addEventListener('keydown', (e) => {
  if (/[0-9+\-*/.]/.test(e.key)) {
    if (expression === 'Error') expression = '';
    expression += e.key;
    updateDisplay();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (e.key === 'Escape') {
    expression = '';
    updateDisplay();
  }
});
