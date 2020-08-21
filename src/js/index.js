const element = document.querySelector('[data-calculator-input]');

element.addEventListener('input', () => {
  const result = calculate(element.value);
});
