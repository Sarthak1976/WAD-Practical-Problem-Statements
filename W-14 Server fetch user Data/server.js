const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    if(req.url === '/api/users' && req.method === 'GET'){
        fs.readFile('users.json','utf-8',(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"Database Error"}));
            }else{
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(data);
            }
        })
    }else{
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end("404 - Route Not Found");
    }
});


server.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
});


