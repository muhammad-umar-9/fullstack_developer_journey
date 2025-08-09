let investmentHistory = [];   // Investment history storage


async function loadGoldPrice()
{
    try
    {
        const response =  await fetch('/api/gold-price');
        const data = await response.json();
        document.getElementById('price-display').textContent = data.price;

        // timestamp to show when price was refreshed
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('connection-status').textContent = `Live Price 🟢 (Updated: ${timeString})`;


        // for visual effects
        document.getElementById('price-display').style.backgroundColor = '#ff3b3bff';
        setTimeout(() => {
            document.getElementById('price-display').style.backgroundColor = '';
        }, 1000);
    }
    catch(error)
    {
        console.log('Error loading gold price:', error);
        document.getElementById('connection-status').textContent = 'Connection Error 🔴';
    }
}

document.querySelector('form').addEventListener('submit', handleInvestment);
    

async function handleInvestment(e) {
    e.preventDefault();
    try
    {
        const amount = document.getElementById('investment-amount').value;
        const response = await fetch('/api/invest' , {
            method: 'POST',
            headers:
            {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({amount: amount})

        });
        const data = await response.json();

        saveInvestmentHistory(data);
        document.getElementById('investment-summary').textContent = data.message;
        document.querySelector('dialog').showModal();
    }
    catch(error)
    {
        alert('Investment failed . please try again')
    }
    
    
}

loadGoldPrice();

// Close dialog when OK button is clicked
document.querySelector('dialog button').addEventListener('click', () => 
{
    document.querySelector('dialog').close();
});

document.getElementById("refresh-price-btn").addEventListener('click' , handlePriceRefresh);

async function handlePriceRefresh()
{
    const refreshBtn = document.getElementById('refresh-price-btn');
    //Loading state
    refreshBtn.disabled = true;
    refreshBtn.textContent = '🔄 Refreshing...';

    try 
    { 
        // call loadgoldprice function
        await loadGoldPrice();
    } 
    catch(error)
    {
        console.log('error in refreshing price ' , error);
    }
    finally
    {
        //Reset the button state
        refreshBtn.disabled = false;
        refreshBtn.textContent = '🔄 Refresh Price';
    }
}

function saveInvestmentHistory(investmentData)
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

function displayHistory()
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
function clearHistory() {
    investmentHistory = [];
    displayHistory();
}
// Clear history button event listener
document.getElementById('clear-history-btn').addEventListener('click', clearHistory);