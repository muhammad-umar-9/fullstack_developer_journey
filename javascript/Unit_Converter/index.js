
// Conversion ratios
const conversions = {
    length: {
        metersToFeet: 3.281,
        feetToMeters: 1 / 3.281
    },
    volume: {
        litersToGallons: 0.264,
        gallonsToLiters: 1 / 0.264
    },
    weight: {
        kilogramsToPounds: 2.204,
        poundsToKilograms: 1 / 2.204
    }
};

// Unit labels for display
const unitLabels = {
    meters: 'meters',
    feet: 'feet',
    liters: 'liters',
    gallons: 'gallons',
    kilograms: 'kilograms',
    pounds: 'pounds'
};

// DOM elements
const inputValue = document.getElementById('inputValue');
const resultDisplay = document.getElementById('result');
const convertButtons = document.querySelectorAll('.convert-btn');

// Function to perform conversion
function convert(value, fromUnit, toUnit, type) {
    let result;
    
    switch(type) {
        case 'length':
            if (fromUnit === 'meters' && toUnit === 'feet') {
                result = value * conversions.length.metersToFeet;
            } else if (fromUnit === 'feet' && toUnit === 'meters') {
                result = value * conversions.length.feetToMeters;
            }
            break;
            
        case 'volume':
            if (fromUnit === 'liters' && toUnit === 'gallons') {
                result = value * conversions.volume.litersToGallons;
            } else if (fromUnit === 'gallons' && toUnit === 'liters') {
                result = value * conversions.volume.gallonsToLiters;
            }
            break;
            
        case 'weight':
            if (fromUnit === 'kilograms' && toUnit === 'pounds') {
                result = value * conversions.weight.kilogramsToPounds;
            } else if (fromUnit === 'pounds' && toUnit === 'kilograms') {
                result = value * conversions.weight.poundsToKilograms;
            }
            break;
    }
    
    return result;
}

// Function to display result
function displayResult(inputVal, fromUnit, toUnit, convertedValue) {
    const fromLabel = unitLabels[fromUnit];
    const toLabel = unitLabels[toUnit];
    
    resultDisplay.innerHTML = `
        <p><strong>${inputVal} ${fromLabel}</strong></p>
        <p>=</p>
        <p><strong>${convertedValue.toFixed(3)} ${toLabel}</strong></p>
    `;
    resultDisplay.classList.remove('error');
}

// Function to display error
function displayError(message) {
    resultDisplay.innerHTML = `<p>${message}</p>`;
    resultDisplay.classList.add('error');
}

// Event listeners for conversion buttons
convertButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = parseFloat(inputValue.value);
        
        // Validate input
        if (isNaN(value) || value === '') {
            displayError('Please enter a valid number');
            return;
        }
        
        if (value < 0) {
            displayError('Please enter a positive number');
            return;
        }
        
        // Get conversion parameters
        const type = button.dataset.type;
        const fromUnit = button.dataset.from;
        const toUnit = button.dataset.to;
        
        // Perform conversion
        const result = convert(value, fromUnit, toUnit, type);
        
        // Display result
        displayResult(value, fromUnit, toUnit, result);
    });
});

// Enter key support
inputValue.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        // Trigger the first conversion button if no specific one is selected
        if (convertButtons.length > 0) {
            convertButtons[0].click();
        }
    }
});

// Clear result when input is cleared
inputValue.addEventListener('input', () => {
    if (inputValue.value === '') {
        resultDisplay.innerHTML = '<p>Enter a value and select a conversion</p>';
        resultDisplay.classList.remove('error');
    }
});

// Initialize with welcome message
document.addEventListener('DOMContentLoaded', () => {
    console.log('Unit Converter loaded successfully!');
});
