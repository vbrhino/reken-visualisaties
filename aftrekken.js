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
const tipModal = document.getElementById('tipModal');
const tipText = document.getElementById('tipText');
const closeTipBtn = document.getElementById('closeTipBtn');

// Timer for input reset detection
let inputTimer = null;
const INPUT_RESET_DELAY = 5000; // 5 seconds

// Timer for showing tip modal
let tipTimer = null;
const TIP_DELAY = 5000; // 5 seconds

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
    
    // Reset and start tip timer
    resetTipTimer();
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
    
    // Set new timer for reset detection (5 seconds of inactivity)
    // This allows slow typers to complete their input without interruption
    // The timer resets with each keystroke, only marking session end after 5s of no input
    inputTimer = setTimeout(() => {
        // Timer expired - typing session completed (no action needed, just detection)
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

// Function to reset tip timer
function resetTipTimer() {
    // Clear existing tip timer
    if (tipTimer) {
        clearTimeout(tipTimer);
        tipTimer = null;
    }
    
    // Hide tip modal if it's showing
    tipModal.style.display = 'none';
    
    // Check if we should show a tip
    const leftSymbols = leftColumn.querySelectorAll('.symbol').length;
    const rightSymbols = rightColumn.querySelectorAll('.symbol').length;
    
    // Only show tip if:
    // 1. There's at least 1 item in the right column
    // 2. The left column has more than 10 items
    // 3. The result would be less than 10 (crossing the 10 boundary)
    if (rightSymbols >= 1 && leftSymbols > 10 && (leftSymbols - rightSymbols) < 10) {
        // Set new tip timer
        tipTimer = setTimeout(() => {
            showTipModal(leftSymbols, rightSymbols);
        }, TIP_DELAY);
    }
}

// Function to check if bridge method applies
function shouldUseBridgeMethod(total, subtract) {
    const result = total - subtract;
    // Bridge method is useful when:
    // - Starting number is greater than 10
    // - Result is less than 10 (crossing through 10)
    // - We're actually subtracting something
    return total > 10 && result < 10 && result >= 0 && subtract > 0;
}

// Function to generate tip content
function showTipModal(leftSymbols, rightSymbols) {
    if (!shouldUseBridgeMethod(leftSymbols, rightSymbols)) {
        return;
    }
    
    const total = leftSymbols;
    const subtract = rightSymbols;
    const result = total - subtract;
    
    // Calculate bridge method steps
    const stepsToReachTen = total - 10;  // How many to subtract to reach 10
    const remainingStepsFromTen = 10 - result;  // How many more to subtract from 10
    
    let tipContent = `<div class="tip-problem">De som: <strong>${total} - ${subtract}</strong></div>`;
    tipContent += `<p class="tip-intro">Laten we de <strong>brug over de 10</strong> gebruiken! 🌉</p>`;
    tipContent += `<div class="tip-step">
        <span class="step-number">1️⃣</span>
        <span class="step-text">Hoeveel moet je aftrekken om tot <strong>10</strong> te komen?<br>
        <strong>${total} - ${stepsToReachTen} = 10</strong></span>
    </div>`;
    tipContent += `<div class="tip-step">
        <span class="step-number">2️⃣</span>
        <span class="step-text">Hoeveel heb je nog over van wat je moet aftrekken?<br>
        <strong>${subtract} - ${stepsToReachTen} = ${remainingStepsFromTen}</strong> (je hebt nog ${remainingStepsFromTen} over)</span>
    </div>`;
    tipContent += `<div class="tip-step">
        <span class="step-number">3️⃣</span>
        <span class="step-text">Trek die ${remainingStepsFromTen} nu af van 10:<br>
        <strong>10 - ${remainingStepsFromTen} = ${result}</strong></span>
    </div>`;
    tipContent += `<div class="tip-summary">✨ Het antwoord is <strong>${result}</strong>!</div>`;
    
    tipText.innerHTML = tipContent;
    tipModal.style.display = 'flex';
}

// Close tip modal
closeTipBtn.addEventListener('click', () => {
    tipModal.style.display = 'none';
});

// Close modal when clicking outside of it
tipModal.addEventListener('click', (e) => {
    if (e.target === tipModal) {
        tipModal.style.display = 'none';
    }
});

// Initial generation
generateSymbols();
