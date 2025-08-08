// GOld price constant we will make it dynamic later

const CURRENT_GOLD_PRICE = 2345.89;

// Handle GET /api/gold-price

export function handleGoldPriceAPI(req , res) {
    const responseData =
    {
        price : CURRENT_GOLD_PRICE,
        currency : 'GBP' ,
        unit : 'per troy ounce' , 
        timestamp: new Date().toISOString()
    };

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseData));
}

// Handle POST /api/invest 

export function handleInvestmentAPI(req , res) {
    let body = '';

    req.on('data' , (chunk) => {
        body += chunk.toString();
    });

    req.on('end' , () => {
        try 
        {
            const investmentData = JSON.parse(body);
            const amount = parseFloat(investmentData.amount);
            const goldPrice = CURRENT_GOLD_PRICE;

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
