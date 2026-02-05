// Get input elements
const circleCountInput = document.getElementById('circleCount');
const circlesContainer = document.getElementById('circlesContainer');

// Function to create circles
function createCircles() {
    const count = parseInt(circleCountInput.value) || 0;
    
    // Clear existing circles
    circlesContainer.innerHTML = '';
    
    // Limit the value
    const totalCircles = Math.min(Math.max(count, 0), 50);
    
    // Update input value if it was adjusted
    circleCountInput.value = totalCircles;
    
    // Create circles
    for (let i = 0; i < totalCircles; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        
        // Add click event listener to toggle fill
        circle.addEventListener('click', function() {
            this.classList.toggle('filled');
        });
        
        circlesContainer.appendChild(circle);
    }
}

// Add event listener for input changes
// When input changes, recreate all circles (which resets filled state)
circleCountInput.addEventListener('input', createCircles);

// Initial creation
createCircles();
