const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');

    if(req.url === "/" || req.url === "/index.html"){
        fs.readFile('index.html','utf-8',(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("500 - Internal Server Error")
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        });
        
    }else{
        res.writeHead(402,{'Content-Type':'Text/plain'});
        res.end("404 - Page not Found !");
    }
});



server.listen(3000,()=>{
    console.log("Server started at http://localhost:3000/");
    
})