// Get elements
const numberInput = document.getElementById('numberInput');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const leftColumn = document.getElementById('leftColumn');
const rightColumn = document.getElementById('rightColumn');
const leftCount = document.getElementById('leftCount');
const rightCount = document.getElementById('rightCount');
const leftCountCalc = document.getElementById('leftCountCalc');
const rightCountCalc = document.getElementById('rightCountCalc');
const answerInput = document.getElementById('answerInput');
const checkBtn = document.getElementById('checkBtn');
const feedback = document.getElementById('feedback');

// Timer for input reset detection
let inputTimer = null;
const INPUT_RESET_DELAY = 5000; // 5 seconds

// Function to update counts
function updateCounts() {
    const leftSymbols = leftColumn.querySelectorAll('.symbol').length;
    const rightSymbols = rightColumn.querySelectorAll('.symbol').length;
    
    leftCount.textContent = leftSymbols;
    rightCount.textContent = rightSymbols;
    leftCountCalc.textContent = leftSymbols;
    rightCountCalc.textContent = rightSymbols;
    
    // Clear feedback when counts change
    feedback.textContent = '';
    feedback.className = 'feedback';
}

// Function to create a symbol element
function createSymbol() {
    const symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = '☀️'; // Sun emoji for kids
    
    symbol.addEventListener('click', function() {
        // Move symbol from left to right, or right to left
        if (this.parentElement === leftColumn) {
            rightColumn.appendChild(this);
        } else if (this.parentElement === rightColumn) {
            leftColumn.appendChild(this);
        }
        updateCounts();
    });
    
    return symbol;
}

// Function to generate symbols based on input
function generateSymbols() {
    const count = parseInt(numberInput.value) || 0;
    const limitedCount = Math.min(Math.max(count, 0), 20);
    
    // Update input if value was adjusted
    if (count !== limitedCount) {
        numberInput.value = limitedCount;
    }
    
    // Clear both columns
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';
    
    // Create symbols in left column
    for (let i = 0; i < limitedCount; i++) {
        leftColumn.appendChild(createSymbol());
    }
    
    updateCounts();
}

// Function to handle input change with timer
function handleInputChange() {
    // Clear existing timer
    if (inputTimer) {
        clearTimeout(inputTimer);
    }
    
    // Set new timer for reset detection
    inputTimer = setTimeout(() => {
        // Timer expired, this marks the end of typing session
    }, INPUT_RESET_DELAY);
    
    // Generate symbols immediately
    generateSymbols();
}

// Increment and decrement buttons
incrementBtn.addEventListener('click', () => {
    const currentValue = parseInt(numberInput.value) || 0;
    numberInput.value = Math.min(currentValue + 1, 20);
    generateSymbols();
});

decrementBtn.addEventListener('click', () => {
    const currentValue = parseInt(numberInput.value) || 0;
    numberInput.value = Math.max(currentValue - 1, 0);
    generateSymbols();
});

// Input event listener
numberInput.addEventListener('input', handleInputChange);

// Check answer button
checkBtn.addEventListener('click', () => {
    const leftSymbols = leftColumn.querySelectorAll('.symbol').length;
    const rightSymbols = rightColumn.querySelectorAll('.symbol').length;
    const correctAnswer = leftSymbols - rightSymbols;
    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) {
        feedback.textContent = '⚠️ Vul eerst een antwoord in!';
        feedback.className = 'feedback warning';
        return;
    }
    
    if (userAnswer === correctAnswer) {
        feedback.textContent = '🎉 Geweldig! Dat is het juiste antwoord!';
        feedback.className = 'feedback success';
    } else {
        feedback.textContent = `❌ Helaas, probeer het nog eens. Het juiste antwoord is ${correctAnswer}.`;
        feedback.className = 'feedback error';
    }
});

// Allow Enter key to check answer
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkBtn.click();
    }
});

// Initial generation
generateSymbols();
