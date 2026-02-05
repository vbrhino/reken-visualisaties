// Get input elements
const totalCirclesInput = document.getElementById('totalCircles');
const filledCirclesInput = document.getElementById('filledCircles');
const circlesContainer = document.getElementById('circlesContainer');
const bridgeSection = document.getElementById('bridgeSection');
const bridgeExplanation = document.getElementById('bridgeExplanation');

// Function to create circles
function createCircles() {
    const total = parseInt(totalCirclesInput.value) || 0;
    const filled = parseInt(filledCirclesInput.value) || 0;
    
    // Clear existing circles
    circlesContainer.innerHTML = '';
    
    // Limit the values
    const totalCircles = Math.min(Math.max(total, 0), 50);
    const filledCircles = Math.min(Math.max(filled, 0), totalCircles);
    
    // Update input values if they were adjusted
    totalCirclesInput.value = totalCircles;
    filledCirclesInput.value = filledCircles;
    
    // Create circles
    for (let i = 0; i < totalCircles; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        
        // Fill from the right: if i >= (total - filled), then fill
        if (i >= (totalCircles - filledCircles)) {
            circle.classList.add('filled');
        }
        
        circlesContainer.appendChild(circle);
    }
    
    // Check if we should show the "bridge" explanation
    checkForBridgeScenario(totalCircles, filledCircles);
}

// Function to check if we should show bridge explanation for subtraction
function checkForBridgeScenario(total, filled) {
    // Check if this looks like a subtraction problem where we cross through 10
    // For example: 16 - 7, where total=16 and we want to subtract 7
    const remaining = total - filled;
    
    // Only show bridge section if it's a subtraction that crosses 10
    if (total > 10 && remaining < 10 && remaining >= 0 && filled > 0) {
        showBridgeExplanation(total, filled);
    } else {
        bridgeSection.style.display = 'none';
    }
}

// Function to show "over de brug" explanation
function showBridgeExplanation(total, subtract) {
    const result = total - subtract;
    
    bridgeSection.style.display = 'block';
    
    // Calculate the steps
    const toTen = total - 10;
    const fromTen = 10 - result;
    
    let explanation = `<p><strong>Rekensom: ${total} - ${subtract} = ${result}</strong></p>`;
    explanation += `<div class="bridge-step">Stap 1: ${total} - ${toTen} = 10 (eerst naar 10)</div>`;
    explanation += `<div class="bridge-step">Stap 2: 10 - ${fromTen} = ${result} (dan verder)</div>`;
    explanation += `<p>We hebben in totaal ${toTen} + ${fromTen} = ${subtract} afgetrokken!</p>`;
    
    bridgeExplanation.innerHTML = explanation;
}

// Add event listeners
totalCirclesInput.addEventListener('input', createCircles);
filledCirclesInput.addEventListener('input', createCircles);

// Initial creation
createCircles();
