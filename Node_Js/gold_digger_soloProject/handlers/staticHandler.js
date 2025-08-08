import fs from 'node:fs'
import path from 'node:path'

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

export function handleStaticFiles(req, res, pathname, __dirname) {
    const staticRoutes = {
        '/': { 
            file: 'index.html', 
            type: 'text/html' 
        },
        '/index.html': { 
            file: 'index.html', 
            type: 'text/html' 
        },
        '/index.css': { 
            file: 'index.css', 
            type: 'text/css' 
        },
        '/index.js': { 
            file: 'index.js', 
            type: 'application/javascript'
         },
        '/gold.png': {
             file: 'gold.png', 
             type: 'image/png'
             },
        '/test-api.html': { 
            file: 'test-api.html',
             type: 'text/html' 
            }
    };
    const route = staticRoutes[pathname];
    if (route) {
        const filePath = path.join(__dirname, 'public', route.file);
        serveStaticFile(res, filePath, route.type);
        return true; // Handled
    }
    return false; // Not a static file
}
