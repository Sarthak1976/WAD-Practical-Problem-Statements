const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');

    if(req.url === '/api/products',req.method === 'GET'){
        fs.readFile('products.json','utf-8',(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'application/json'}),
                res.end(JSON.stringify({message:"Database Error"}));
            }else{
                res.writeHead(200,{'Content-Type':'application/json'}),
                res.end(data);
            }
        });
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end("Route not found");
    }
});



server.listen(3000,()=>{
    console.log("Server started at http://localhost:3000/api/products");
    
})