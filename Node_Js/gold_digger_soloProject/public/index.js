import { loadGoldPrice , handlePriceRefresh , handleCurrencyChange} from "./utils/priceManager.js";
import { clearHistory  } from "./utils/historyManager.js";
import { handleInvestment } from "./utils/investmentManager.js";
import { updateCurrencySymbols, getCurrentCurrency } from './utils/currencyManager.js';

function initializeApp()
{
    updateCurrencySymbols(getCurrentCurrency());
    loadGoldPrice();
    setupEventListeners();
}

function setupEventListeners()
{
    document.querySelector('form').addEventListener('submit', handleInvestment);
    document.getElementById("refresh-price-btn").addEventListener('click' , handlePriceRefresh);
    document.getElementById('currency-select').addEventListener('change', handleCurrencyChange);
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
    document.querySelector('dialog button').addEventListener('click', () => 
{
    document.querySelector('dialog').close();
});

initializeApp();


