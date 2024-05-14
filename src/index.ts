import { BehaviorSubject } from "rxjs";

// DOM Elements - declaration
let buttonIncrementElement: HTMLButtonElement;
let buttonDecrementElement: HTMLButtonElement;
let divResultElement: HTMLDivElement;


// Create a BehaviorSubject with an initial value of 0
let counter = new BehaviorSubject<number>(0);

// Get references to the DOM elements
divResultElement = document.getElementById("result") as HTMLDivElement;
buttonIncrementElement = document.getElementById("incrementButton") as HTMLButtonElement;
buttonDecrementElement = document.getElementById("decrementButton") as HTMLButtonElement;

// Function to update the result element with the current value
const updateResult = (value: number) => {
    if (divResultElement) {
      divResultElement.textContent = `Current value: ${value}`;
    }
};

// Subscribe to the counter and update the result element on value change
const subs = counter.subscribe({
    next: (data: number) => {
        console.log(`Current value: ${data}`);
        updateResult(data);
    }
});

// Add an event listener to the button to increment the counter value
buttonIncrementElement?.addEventListener("click", () => {
    const currentValue = counter.getValue();
    counter.next(currentValue + 1);
});

// Add an event listener to the button to decrement the counter value
buttonDecrementElement?.addEventListener("click", () => {
    const currentValue = counter.getValue();
    if (currentValue > 0) {
      counter.next(currentValue - 1);
  }
});

// Initialize the result display
updateResult(counter.getValue());
