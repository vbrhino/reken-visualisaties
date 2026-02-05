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

// Helper function to check if bridge method is applicable
function isBridgeMethodApplicable(total, remaining, filled) {
    // Bridge method is useful when:
    // - Starting number is greater than 10
    // - Result is less than 10 (crossing through 10)
    // - Result is non-negative
    // - We're actually subtracting something
    return total > 10 && remaining < 10 && remaining >= 0 && filled > 0;
}

// Function to check if we should show bridge explanation for subtraction
function checkForBridgeScenario(total, filled) {
    // Check if this looks like a subtraction problem where we cross through 10
    // For example: 16 - 7, where total=16 and we want to subtract 7
    const remaining = total - filled;
    
    if (isBridgeMethodApplicable(total, remaining, filled)) {
        showBridgeExplanation(total, filled);
    } else {
        bridgeSection.style.display = 'none';
    }
}

// Function to show "over de brug" explanation
function showBridgeExplanation(total, subtract) {
    const result = total - subtract;
    
    bridgeSection.style.display = 'block';
    
    // Calculate the steps for the bridge method
    const stepsToReachTen = total - 10;  // How many to subtract to reach 10
    const remainingStepsFromTen = 10 - result;  // How many more to subtract from 10
    
    let explanation = `<p><strong>Rekensom: ${total} - ${subtract} = ${result}</strong></p>`;
    explanation += `<div class="bridge-step">Stap 1: ${total} - ${stepsToReachTen} = 10 (eerst naar 10)</div>`;
    explanation += `<div class="bridge-step">Stap 2: 10 - ${remainingStepsFromTen} = ${result} (dan verder)</div>`;
    explanation += `<p>We hebben in totaal ${stepsToReachTen} + ${remainingStepsFromTen} = ${subtract} afgetrokken!</p>`;
    
    bridgeExplanation.innerHTML = explanation;
}

// Add event listeners
totalCirclesInput.addEventListener('input', createCircles);
filledCirclesInput.addEventListener('input', createCircles);

// Initial creation
createCircles();
