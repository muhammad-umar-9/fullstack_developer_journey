import http, { createServer } from 'node:http';
import fs from 'node:fs';    // for reading files 
import path from 'node:path'; // for handling file paths
import url from 'node:url';  // for parsing urls


const __dirname = path.dirname(url.fileURLToPath(import.meta.url)); // gives us current directory path name


const PORT = 3000;
const server = http.createServer((req , res) => 
    {
    const parsedUrl = url.parse(req.url , true);
    const pathName = parsedUrl.pathname;
    console.log('Requested' , pathName);
    if (pathName == '/'  || pathName == '/index.html')
    {
        const filePath = path.join(__dirname , 'public' , 'index.html')
        console.log('looking for file at:' , filePath)
        fs.readFile(filePath , (err , data) => {
            if(err)
                {
                    console.log('file read error: ' , err.message)
                    res.statusCode = 500; // server error
                    res.end('error loading page');
                    return;
                }
            else
                {
                    res.statusCode = 200  // success
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            });
    }
    else if(pathName == '/index.css')
            {
                const filePath = path.join(__dirname , 'public' , 'index.css')
                fs.readFile(filePath , (err , data) => {
                    if(err)
                    {
                        res.statusCode = 500 ;
                        res.end('server error');
                        return;
                    }
                    else
                    {
                        res.statusCode = 200;
                        res.setHeader('Content-Type' , 'text/css');
                        res.end(data);
                    }
                });
            }
        else if(pathName == '/gold.png')
            {
                const filePath = path.join(__dirname , 'public' , 'gold.png')
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
                        res.setHeader('Content-Type', 'image/png');
                        res.end(data);
                    }
                });
            }
        else
            {
                res.statusCode = 404;
                res.end('page not found')
            }
})
server.listen(PORT , () => console.log(`connected on port ${PORT}`))


