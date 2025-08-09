 
 let investmentHistory = [];
export function saveInvestmentHistory(investmentData)
{
    const historyItem = {
        id: Date.now(), // Simple unique ID
        amount: investmentData.investmentAmount,
        price: investmentData.pricePerOunce,
        ounces: investmentData.ouncesOwned,
        timestamp: new Date().toLocaleString()
    };
    investmentHistory.unshift(historyItem); 
    displayHistory();
}

export function displayHistory()
{
    const historyList = document.getElementById('history-list');
    
    if (investmentHistory.length === 0) {
        historyList.innerHTML = '<p class="no-history">No investments yet. Make your first investment!</p>';
        return;
    }
    
    const historyHTML = investmentHistory.map(item => `
        <div class="history-item">
            <p><strong>£${item.amount}</strong> → <strong>${item.ounces} oz</strong></p>
            <p>Price: £${item.price}/oz | ${item.timestamp}</p>
        </div>
    `).join('');
    
    historyList.innerHTML = historyHTML;
}

// Clear history function
export function clearHistory() {
    investmentHistory = [];
    displayHistory();
}