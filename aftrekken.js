// Get elements
const numberInput = document.getElementById('numberInput');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const initialDisplay = document.getElementById('initialDisplay');
const removedColumn = document.getElementById('removedColumn');
const remainingColumn = document.getElementById('remainingColumn');
const removedCount = document.getElementById('removedCount');
const remainingCount = document.getElementById('remainingCount');
const initialCountCalc = document.getElementById('initialCountCalc');
const removedCountCalc = document.getElementById('removedCountCalc');
const answerInput = document.getElementById('answerInput');
const checkBtn = document.getElementById('checkBtn');
const feedback = document.getElementById('feedback');
const tipBar = document.getElementById('tipBar');
const tipContent = document.getElementById('tipContent');
const tipHeader = document.getElementById('tipHeader');
const toggleTipBtn = document.getElementById('toggleTipBtn');

// Constants
const MAX_SYMBOLS = 50;
const INPUT_RESET_DELAY = 5000; // Allows slow typers to complete input
const TIP_DELAY = 5000; // Wait before showing educational tips

// Track initial value
let initialValue = 10;

// Timer for input reset detection
let inputTimer = null;

// Timer for showing tip bar
let tipTimer = null;

// Function to update counts
function updateCounts() {
    const removedSymbols = removedColumn.querySelectorAll('.symbol').length;
    const remainingSymbols = remainingColumn.querySelectorAll('.symbol').length;
    
    removedCount.textContent = removedSymbols;
    remainingCount.textContent = remainingSymbols;
    initialCountCalc.textContent = initialValue;
    removedCountCalc.textContent = removedSymbols;
    
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
        // Move symbol from remaining to removed, or removed back to remaining
        if (this.parentElement === remainingColumn) {
            removedColumn.appendChild(this);
        } else if (this.parentElement === removedColumn) {
            remainingColumn.appendChild(this);
        }
        updateCounts();
    });
    
    return symbol;
}

// Function to generate symbols based on input
function generateSymbols() {
    const count = parseInt(numberInput.value) || 0;
    const limitedCount = Math.min(Math.max(count, 0), MAX_SYMBOLS);
    
    // Update input if value was adjusted
    if (count !== limitedCount) {
        numberInput.value = limitedCount;
    }
    
    // Store initial value
    initialValue = limitedCount;
    initialDisplay.textContent = limitedCount;
    
    // Clear both columns
    remainingColumn.innerHTML = '';
    removedColumn.innerHTML = '';
    
    // Create symbols in remaining column
    for (let i = 0; i < limitedCount; i++) {
        remainingColumn.appendChild(createSymbol());
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
    // This allows slow typers to complete their input without interruption
    // The timer resets with each keystroke, only marking session end after delay
    inputTimer = setTimeout(() => {
        // Timer expired - typing session completed (no action needed, just detection)
    }, INPUT_RESET_DELAY);
    
    // Generate symbols immediately
    generateSymbols();
}

// Increment and decrement buttons
incrementBtn.addEventListener('click', () => {
    const currentValue = parseInt(numberInput.value) || 0;
    numberInput.value = Math.min(currentValue + 1, MAX_SYMBOLS);
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
    const removedSymbols = removedColumn.querySelectorAll('.symbol').length;
    const correctAnswer = initialValue - removedSymbols;
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
    
    // Hide tip bar if it's showing
    tipBar.style.display = 'none';
    tipContent.classList.add('tip-content-collapsed');
    tipContent.classList.remove('tip-content-expanded');
    toggleTipBtn.textContent = '▼';
    
    // Check if we should show a tip
    const removedSymbols = removedColumn.querySelectorAll('.symbol').length;
    
    // Only show tip if:
    // 1. There's at least 1 item in the removed column
    // 2. The initial value is greater than 10
    // 3. The result would be less than 10 (crossing the 10 boundary)
    if (removedSymbols >= 1 && initialValue > 10 && (initialValue - removedSymbols) < 10) {
        // Set new tip timer
        tipTimer = setTimeout(() => {
            showTipBar(initialValue, removedSymbols);
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
function showTipBar(total, subtract) {
    if (!shouldUseBridgeMethod(total, subtract)) {
        return;
    }
    
    const result = total - subtract;
    
    // Calculate bridge method steps
    const stepsToReachTen = total - 10;  // How many to subtract to reach 10
    const remainingStepsFromTen = 10 - result;  // How many more to subtract from 10
    
    let tipHtml = `<div class="tip-problem">De som: <strong>${total} - ${subtract}</strong></div>`;
    tipHtml += `<p class="tip-intro">Laten we de <strong>brug over de 10</strong> gebruiken! 🌉</p>`;
    tipHtml += `<div class="tip-step">
        <span class="step-number">1️⃣</span>
        <span class="step-text">Hoeveel moet je aftrekken om tot <strong>10</strong> te komen?<br>
        <strong>${total} - ${stepsToReachTen} = 10</strong></span>
    </div>`;
    tipHtml += `<div class="tip-step">
        <span class="step-number">2️⃣</span>
        <span class="step-text">Hoeveel heb je nog over van wat je moet aftrekken?<br>
        <strong>${subtract} - ${stepsToReachTen} = ${remainingStepsFromTen}</strong> (je hebt nog ${remainingStepsFromTen} over)</span>
    </div>`;
    tipHtml += `<div class="tip-step">
        <span class="step-number">3️⃣</span>
        <span class="step-text">Trek die ${remainingStepsFromTen} nu af van 10:<br>
        <strong>10 - ${remainingStepsFromTen} = ${result}</strong></span>
    </div>`;
    tipHtml += `<div class="tip-summary">✨ Het antwoord is <strong>${result}</strong>!</div>`;
    
    tipContent.innerHTML = tipHtml;
    tipBar.style.display = 'block';
}

// Toggle tip bar expanded/collapsed
tipHeader.addEventListener('click', () => {
    if (tipContent.classList.contains('tip-content-collapsed')) {
        tipContent.classList.remove('tip-content-collapsed');
        tipContent.classList.add('tip-content-expanded');
        toggleTipBtn.textContent = '▲';
    } else {
        tipContent.classList.add('tip-content-collapsed');
        tipContent.classList.remove('tip-content-expanded');
        toggleTipBtn.textContent = '▼';
    }
});

// Initial generation
generateSymbols();
