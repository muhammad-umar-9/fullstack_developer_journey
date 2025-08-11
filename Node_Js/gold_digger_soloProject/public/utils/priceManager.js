import { getCurrentCurrency , getCurrencySymbol } from "./currencyManager.js";
export async function loadGoldPrice(currency = null)
{
    try
    {
        const selectedCurrency = currency || getCurrentCurrency();
        const response =  await fetch(`/api/gold-price?currency=${selectedCurrency}`);
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


export async function handlePriceRefresh()
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
export async function handleCurrencyChange() {
    const currency = getCurrentCurrency();
    
    // Update UI symbols first
    const { updateCurrencySymbols } = await import('./currencyManager.js');
    updateCurrencySymbols(currency);
    
    // Load new price for selected currency
    await loadGoldPrice(currency);
}
