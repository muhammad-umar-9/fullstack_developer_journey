const currencySymbols = {
    'GBP': '£',
    'USD': '$',
    'EUR': '€'
}

// current selected currency
export function getCurrentCurrency(){
    const selector = document.getElementById('currency-select');
    return selector ? selector.value : 'GBP';
}
// currency symbol for a currency 
export function getCurrencySymbol(currency) 
{
    return currencySymbols[currency] || '£';
}

// Updating all currency symbols in the UI
export function updateCurrencySymbols(currency) 
{
    const symbol = getCurrencySymbol(currency);
    
    const priceSymbol = document.getElementById('currency-symbol');
    if (priceSymbol) 
    {
        priceSymbol.textContent = symbol;
    }
    
    const investmentSymbol = document.getElementById('investment-currency');
    if (investmentSymbol) 
    {
        investmentSymbol.textContent = symbol;
    }
}

// Handle currency change event
export function handleCurrencyChange() {
    const currency = getCurrentCurrency();
    updateCurrencySymbols(currency);
    
    // Trigger price refresh with new currency
    // This will be called from priceManager
    return currency;
}