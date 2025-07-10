// Character sets for password generation
const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

// DOM elements
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// Update length display
lengthSlider.addEventListener('input', function() {
    lengthValue.textContent = this.value;
});

// Generate password function
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let availableChars = '';
    
    // Build character set based on selected options
    if (uppercaseCheck.checked) availableChars += characterSets.uppercase;
    if (lowercaseCheck.checked) availableChars += characterSets.lowercase;
    if (numbersCheck.checked) availableChars += characterSets.numbers;
    if (symbolsCheck.checked) availableChars += characterSets.symbols;
    
    // Check if at least one character type is selected
    if (availableChars === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }
    
    // Display password
    passwordOutput.value = password;
    
    // Update password strength
    updatePasswordStrength(password);
}

// Password strength calculator
function updatePasswordStrength(password) {
    let score = 0;
    let strength = '';
    
    // Length scoring
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character variety scoring
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    // Determine strength level
    if (score <= 2) {
        strength = 'Weak';
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = '#ff4757';
    } else if (score <= 4) {
        strength = 'Fair';
        strengthBar.style.width = '50%';
        strengthBar.style.backgroundColor = '#ffa502';
    } else if (score <= 6) {
        strength = 'Good';
        strengthBar.style.width = '75%';
        strengthBar.style.backgroundColor = '#3742fa';
    } else {
        strength = 'Strong';
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = '#2ed573';
    }
    
    strengthText.textContent = strength;
}

// Copy to clipboard function
async function copyToClipboard() {
    const password = passwordOutput.value;
    
    if (!password) {
        alert('No password to copy! Please generate a password first.');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(password);
        
        // Visual feedback
        copyBtn.style.backgroundColor = '#2ed573';
        copyBtn.style.color = 'white';
        setTimeout(() => {
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
        }, 1000);
        
        // Show success message
        showNotification('Password copied to clipboard!');
    } catch (err) {
        // Fallback for older browsers
        passwordOutput.select();
        document.execCommand('copy');
        showNotification('Password copied to clipboard!');
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Generate initial password
generatePassword();

// Update strength when options change
[uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck].forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (passwordOutput.value) {
            generatePassword();
        }
    });
});

// Update password when length changes
lengthSlider.addEventListener('input', () => {
    if (passwordOutput.value) {
        generatePassword();
    }
});

// Enter key to generate password
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        generatePassword();
    }
});haracters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];




