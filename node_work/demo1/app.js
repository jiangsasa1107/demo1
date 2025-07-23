//app.js

//1. import the http module
const http = require('http');

//5. connect html page to the server
const path = require('path');

//7. read file stream
const fs = require('fs');

//2. create http server
const server = http.createServer((req, res) => {
    //6. connect path
    const filePath = '../../0721/userInfo.html'; //path.join(__dirname, 'index.html');

    //8. read file
    fs.readFile(filePath, (err, content) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(content);
    })

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello from node.js\n');
});

//3. start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server is running at http://localhost:${PORT}');
});

//4. create a html page

