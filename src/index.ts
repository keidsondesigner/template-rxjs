import { BehaviorSubject, Observable } from "rxjs";

// Classe CounterService que encapsula o BehaviorSubject
class CounterService {
    private counterSubject = new BehaviorSubject<number>(0);

    // Observable do contador
    counter$: Observable<number> = this.counterSubject.asObservable();

    // Método para incrementar o contador
    increment() {
    const currentValue = this.counterSubject.value;
    this.counterSubject.next(currentValue + 1);
    }

    // Método para decrementar o contador
    decrement() {
    const currentValue = this.counterSubject.value;
        if (currentValue > 0) {
            this.counterSubject.next(currentValue - 1);
        }
    }
}

// DOM Elements - declaration
let buttonIncrementElement: HTMLButtonElement;
let buttonDecrementElement: HTMLButtonElement;
let divResultElement: HTMLDivElement;

// Get references to the DOM elements
divResultElement = document.getElementById("result") as HTMLDivElement;
buttonIncrementElement = document.getElementById("incrementButton") as HTMLButtonElement;
buttonDecrementElement = document.getElementById("decrementButton") as HTMLButtonElement;

// Instanciar o serviço de contador
const counterService = new CounterService();

// Function to update the result element with the current value
const updateResult = (value: number) => {
    if (divResultElement) {
        divResultElement.textContent = `Current value: ${value}`;
    }
};

// Subscribe to the counterObservable and update the result element on value change
const subs = counterService.counter$.subscribe({
    next: (data: number) => {
        console.log(`Current value: ${data}`);
        updateResult(data);
    },
});

// Add event listeners to the buttons to increment the counter value
buttonIncrementElement?.addEventListener("click", () => {
    counterService.increment();
});

// Add event listeners to the buttons to decrement the counter value
buttonDecrementElement?.addEventListener("click", () => {
    counterService.decrement();
});

// Initialize the result display
counterService.counter$.subscribe(updateResult); // Atualiza o resultado inicialmente
