class Calculator {
  constructor(data_current, data_previous) {
    this.current = data_current;
    this.previous = data_previous;
    this.clear();
  }

  clear() {
    this.data_current = "";
    this.data_previous = "";
    this.operation = undefined;

    this.updateDisplay();
  }

  delete() {
    this.data_current = this.data_current.slice(0, -1);
  }

  appendNumber(number) {
    if (number == "." && this.data_current.includes(".")) return;
    this.data_current += number.toString();
  }

  chooseOperation(operation) {
    if (this.data_current == "") {
      this.operation = operation;
      return;
    }
    if (this.data_previous !== "") this.compute();

    this.operation = operation;
    this.data_previous = this.data_current;
    this.data_current = "";
    this.current.innerHTML = "0";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.data_previous || 0);
    const curr = parseFloat(this.data_current || 0);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        return;
    }

    this.data_current = computation;
    this.operation = undefined;
    this.data_previous = "";
  }

  formatNumber(number) {
    const stringNumber = number.toString();
    const left = parseInt(stringNumber.split(".")[0]);
    const rigth = parseInt(stringNumber.split(".")[1]);

    return number;
  }

  updateDisplay() {
    this.current.innerHTML = this.formatNumber(this.data_current || "0");
    this.previous.innerHTML = this.formatNumber(this.data_previous || "0");

    if (this.operation) {
      this.previous.innerHTML += this.operation;
    }
  }
}

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equal = document.querySelector("[data-equal]");
const del = document.querySelector("[data-del]");
const clear = document.querySelector("[data-clear]");
const data_previous = document.querySelector("[data-previous]");
const data_current = document.querySelector("[data-current]");

const calc = new Calculator(data_current, data_previous);

numbers.forEach((num) =>
  num.addEventListener("click", () => {
    calc.appendNumber(num.innerHTML);
    calc.updateDisplay();
  })
);

clear.addEventListener("click", () => calc.clear());

operations.forEach((op) =>
  op.addEventListener("click", () => {
    calc.chooseOperation(op.innerHTML);
    calc.updateDisplay();
  })
);

equal.addEventListener("click", () => {
  calc.compute();
  calc.updateDisplay();
});

del.addEventListener("click", () => {
  calc.delete();
  calc.updateDisplay();
});
