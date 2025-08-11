// GOld price constant we will make it dynamic later
import fetch  from "node-fetch";
const CURRENT_GOLD_PRICE = 2345.89;

// Handle GET /api/gold-price

export async function handleGoldPriceAPI(req , res) {
    const url = new URL(req.url , `http://${req.headers.host}`);
    const currency = url.searchParams.get('currency') || 'GBP';
    const responseData =
    {
        
        price : await fetchRealGoldPrice(currency),
        currency : 'currency' ,
        unit : 'per troy ounce' , 
        timestamp: new Date().toISOString()
    };

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseData));
}

// Handle POST /api/invest 

export async function handleInvestmentAPI(req , res) {
    let body = '';

    req.on('data' , (chunk) => {
        body += chunk.toString();
    });

    req.on('end' ,async () => {
        try 
        {
            const investmentData = JSON.parse(body);
            const amount = parseFloat(investmentData.amount);
            const goldPrice = await fetchRealGoldPrice('GBP');

            const ounces = amount / goldPrice;

            const response = 
            {
                success : true,
                investmentAmount : amount,
                pricePerOunce : goldPrice,
                ouncesOwned : ounces.toFixed(3),
                message: `you bought ${ounces.toFixed(3)} ounces for £${amount}`
            };

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));    
        }
        catch(error)
        {
            res.statusCode = 400;
            res.end('invalid data');

        }
    })
}

async function fetchRealGoldPrice(currency = 'GBP'){
    try
    {
        const response = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=a9c14181fe151d81681c0380d2435b0a&base=${currency}&currencies=XAU`);
        const data = await response.json();

        console.log('API Response:' , data)
        const xauPerCurrency = data.rates.XAU; 
        if (!xauPerCurrency || xauPerCurrency <= 0) {
        throw new Error('Invalid XAU rate');
    }
        const priceInCurrency = 1 / xauPerCurrency;
        return parseFloat(priceInCurrency.toFixed(2));
    }
    catch(error)
    {
        console.log("error in fetching real price of gold ", error.message);
        const fallbackPrices = {
            'GBP': 2345.89,
            'USD': 2899.50,
            'EUR': 2677.25
        };
        return fallbackPrices[currency] || fallbackPrices['GBP'];

    }
}
