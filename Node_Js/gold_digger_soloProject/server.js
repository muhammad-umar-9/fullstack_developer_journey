import http, { createServer } from 'node:http';
import fs from 'node:fs';    // for reading files 
import path from 'node:path'; // for handling file paths
import url from 'node:url';  // for parsing urls
import { handleGoldPriceAPI , handleInvestmentAPI } from './handlers/apiHandler.js';
import {handleStaticFiles} from './handlers/staticHandler.js';


const __dirname = path.dirname(url.fileURLToPath(import.meta.url)); // gives us current directory path name


const PORT = 3000;
const server = http.createServer((req , res) => 
    {
    const parsedUrl = url.parse(req.url , true);
    const pathName = parsedUrl.pathname;
    console.log('Requested' , pathName);
    const method = req.method;
    console.log('Method:' , method , 'path:' , pathName);

    if (handleStaticFiles(req, res, pathName, __dirname)) 
    {
    
    }
    else if(pathName == '/api/gold-price')
    {
       handleGoldPriceAPI(req , res);
    }
    else if(pathName == '/api/invest' && method == 'POST')
    {
        handleInvestmentAPI(req , res);    
    }    

        else
            {
                res.statusCode = 404;
                res.end('page not found')
            }
})
server.listen(PORT , () => console.log(`connected on port ${PORT}`))


