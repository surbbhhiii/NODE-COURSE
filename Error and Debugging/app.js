const http = require('http');
const testingSyntax = require('./syntax');
const runtime = require('./runtime');
const logical = require('./logical');


const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  //testingSyntax();
  //runtime();
  logical();
});

const port = 3002;
server.listen(port, () => {
  console.log(`Server running on  address http://localhost:${port}`);
});
