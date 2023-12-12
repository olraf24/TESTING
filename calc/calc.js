// constructor(prevOptext, currOptext) przyjmuje dwa parametry (prevOptext i currOptext), które są używane do przekazania tekstu poprzedniego wyniku i aktualnego wyniku do nowo utworzonego kalkulatora.    Jednakże, przepływ danych w kalkulatorze czy w ogóle w aplikacjach, zazwyczaj jest zarządzany przez metody i funkcje, a niekoniecznie przez konstruktor. Konstruktor służy do jednorazowej konfiguracji obiektu po jego utworzeniu.
// this.prevOptext = prevOptext i this.currOptext = currOptext przypisują przekazane wartości do odpowiednich właściwości obiektu kalkulatora.
// this.clear() wywołuje metodę clear na nowo utworzonym kalkulatorze, aby zainicjować jego stan.

class Calculator {
  constructor(prevoptext, curroptext) {
    this.prevoptext = prevoptext;
    this.curroptext = curroptext;
    this.clear();
  }

  clear() {
    this.prevop = "";
    this.currop = "";
    this.operation = undefined;
  }

  delete() {
    this.currop = this.currop.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currop.includes(".")) return;
    this.currop = this.currop.toString() + number.toString();

  }

  chooseOperation(operation) {
    if (this.currop === '') return
    if (this.prevop !== '') {
      this.compute()
    }
    this.operation = operation
    this.prevop = this.currop
    this.currop = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prevop)
    const current = parseFloat(this.currop)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case ':':
       computation = prev / current
       break
      case '%':
       computation = (prev/100) * current
       break
      default:
        return
    }

    this.currop = computation
    this.operation = undefined
    this.prevop = ''
  }

  getDisplayNumber(number) {
    // const stringNumber = number.toString();
    // alert (stringNumber);
    
    // const integerDigits = parseFloat(stringNumber.split(".")[0]);
    // const decimalDigits = stringNumber.split("."[1]);

    const stringNumber = number.toString();
    const parts = stringNumber.split(".");
    const integerDigits = parseFloat(parts[0]);
    const decimalDigits = parts[1];

    
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0});
    }
    

    // alert (integerDisplay)
    // alert (decimalDigits)

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }

  }

  updateDisplay() {
    this.curroptext.innerText = this.getDisplayNumber(this.currop);
    if (this.operation != null) {
      this.prevoptext.innerText = `${this.getDisplayNumber(this.prevop)} ${this.operation}`;
    } else {
      this.prevoptext.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
// const numberButtons = document.querySelectorAll(".number");
// const numberButtons = document.getElementById("uniq2");

const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]') 
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')

const prevoptext = document.querySelector("[data-prev-op]");
const curroptext = document.querySelector("[data-curr-op]");

const calculator = new Calculator(prevoptext, curroptext);


// numberButtons.addEventListener("click", myfunc);

// function myfunc() {
//   document.getElementById("uniq").innerHTML = "Thdddddddd ";
//   alert(numberButtons);
// }
// Inicjalizacja AudioContext
// let audioContext;

// // Inicjalizacja dźwięku
// const hoverSound = new AudioBufferSourceNode(audioContext);
// // ... załaduj dźwięk do hoverSound


// // Dodanie węzła kompresora
// const compressor = audioContext.createDynamicsCompressor();
// compressor.threshold.value = -24;   // Wartość progowa (threshold) w dB
// compressor.knee.value = 30;         // Szerokość obszaru soft-knee w dB
// compressor.ratio.value = 12;        // Współczynnik kompresji
// compressor.attack.value = 0.003;    // Czas ataku w sekundach
// compressor.release.value = 0.25;    // Czas zwolnienia w sekundach

// // Podłączenie węzła kompresora
// hoverSound.connect(compressor);
// compressor.connect(audioContext.destination);


// // Dodanie obsługi zdarzenia kliknięcia dla startu AudioContext
// document.addEventListener('click', initAudioContext);

function initAudioContext() {
  // Utwórz AudioContext, jeśli jeszcze nie został utworzony
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Rozłącz obsługę zdarzenia po pierwszym kliknięciu, aby nie tworzyć wielu kontekstów
  document.removeEventListener('click', initAudioContext);

  // Odtwórz dźwięk
  playHoverSound();
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
  button.addEventListener('click', playHoverSound);
});

function playHoverSound() {
  // const maxVolume = 0.5;
  hoverSound.currentTime = 0; // Ustaw czas odtwarzania na początku, aby umożliwić natychmiastowe odtworzenie dźwięku
  // if (hoverSound.volume > maxVolume) {
  //   hoverSound.volume = maxVolume;
  // }
  
  hoverSound.play();
}

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
  calculator.chooseOperation (button.innerText) 
  calculator.updateDisplay()

  })
  button.addEventListener('mouseenter', playHoverSound);
})


equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()


})


allClearButton.addEventListener('click', button => {
calculator.clear()
calculator.updateDisplay()
})


deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})


