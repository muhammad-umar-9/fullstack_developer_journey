import { loadGoldPrice , handlePriceRefresh } from "./utils/priceManager.js";
import { clearHistory  } from "./utils/historyManager.js";
import { handleInvestment } from "./utils/investmentManager.js";

function initializeApp()
{
    loadGoldPrice();
    setupEventListeners();
}

function setupEventListeners()
{
    document.querySelector('form').addEventListener('submit', handleInvestment);
    document.getElementById("refresh-price-btn").addEventListener('click' , handlePriceRefresh);
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
    document.querySelector('dialog button').addEventListener('click', () => 
{
    document.querySelector('dialog').close();
});

initializeApp();

