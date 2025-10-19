const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const back = document.getElementById("back");
const themeToggle = document.getElementById("theme-toggle");
const historyList = document.getElementById("history-list");

// Button Clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "=") {
      calculate();
    } else if (value === "C") {
      display.value = "";
    } else if (value === "⌫") {
      display.value = display.value.slice(0, -1);
    } else if (value !== "🌙" && value !== "☀") {
      display.value += value;
    }
  });
});

// Calculate Function
function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    if (!isFinite(result)) throw Error("Invalid");
    display.value = result;

    addToHistory(expression + " = " + result);
  } catch {
    display.value = "Error";
  }
}

// History Function
function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
}

// Keyboard Input
document.addEventListener("keydown", e => {
  if (/[0-9+\-*/().]/.test(e.key)) {
    display.value += e.key;
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (e.key === "Escape") {
    display.value = "";
  }
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "🌙";
});