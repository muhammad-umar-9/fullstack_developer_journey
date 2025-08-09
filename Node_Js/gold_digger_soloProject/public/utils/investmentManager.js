// Investment calculation functions

import { saveInvestmentHistory } from './historyManager.js';

export async function handleInvestment(e) {
    e.preventDefault();
    
    try {
        const amount = document.getElementById('investment-amount').value;
        const response = await fetch('/api/invest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount })
        });
        
        const data = await response.json();
        
        // Save to history
        saveInvestmentHistory(data);
        
        // Update dialog and show it
        document.getElementById('investment-summary').textContent = data.message;
        document.querySelector('dialog').showModal();
    } catch (error) {
        alert('Investment failed. Please try again');
    }
}
