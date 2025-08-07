import http, { createServer } from 'node:http';
import fs from 'node:fs';    // for reading files 
import path from 'node:path'; // for handling file paths
import url from 'node:url';  // for parsing urls


const __dirname = path.dirname(url.fileURLToPath(import.meta.url)); // gives us current directory path name
function serveStaticFile(res , filePath , contentType){
    fs.readFile(filePath , (err , data) => {
    if(err)
    {
        res.statusCode = 500;
        res.end('server error');
        return;
    }
    else
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType)
        res.end(data);
    }
})
}

const PORT = 3000;
const server = http.createServer((req , res) => 
    {
    const parsedUrl = url.parse(req.url , true);
    const pathName = parsedUrl.pathname;
    console.log('Requested' , pathName);
    if (pathName == '/'  || pathName == '/index.html')
    {
        const filePath = path.join(__dirname , 'public' , 'index.html')
        serveStaticFile(res , filePath , 'text/html')
    }
    else if(pathName == '/index.css')
            {
                const filePath = path.join(__dirname , 'public' , 'index.css')
                serveStaticFile(res , filePath , 'text/CSS')
            }
    else if(pathName == '/gold.png')
            {
                const filePath = path.join(__dirname , 'public' , 'gold.png')
                serveStaticFile(res , filePath , 'image/png')
            }
    else if(pathName == '/index.js')
    {
        const filePath = path.join(__dirname , 'public' , 'index.js')
        serveStaticFile(res , filePath , 'application/javascript')
    }
        
    else if(pathName == '/test-api.html') {
    const filePath = path.join(__dirname, 'public', 'test-api.html');
    serveStaticFile(res, filePath, 'text/html');
    }

    else if(pathName == '/api/gold-price')
    {
        const goldPrice = CURRENT_GOLD_PRICE
        const responseData = {
            price: goldPrice,
            currency: "GBP",
            unit:"per troy ounce",
            timeStamp: new Date().toISOString()
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseData));
    }
    else if(pathName == '/api/invest' && method == 'POST')
    {
        let body = '';
        req.on('data' , (chunk)  => {
            body += chunk.toString();
        });

        req.on('end' , () => {
            try 
            {
                const investmentData = JSON.parse(body);
                const amount = parseFloat(investmentData.amount);
                const goldPrice = CURRENT_GOLD_PRICE;

                const ounces = amount / goldPrice;

                const response = {
                    success: true ,
                    investmentAmount : amount ,
                    pricePerOunce : goldPrice ,
                    ouncesOwned : ounces.toFixed(3) ,
                    message : `you bought ${ounces.toFixed(3)} for ${amount}`
                };

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            }
            catch(error)
            {
                res.statusCode = 400;
                res.end('Invalid data');

            }
        })
    }    

        else
            {
                res.statusCode = 404;
                res.end('page not found')
            }
})
server.listen(PORT , () => console.log(`connected on port ${PORT}`))


