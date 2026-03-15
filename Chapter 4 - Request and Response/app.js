const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);



  if (req.url === '/'){
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<head><h1>Welcome to Home</h1></head>');
  res.write('</html>');
  return res.end();


  } else if (req.url === '/products') {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<head><h1>Checkout our products</h1></head>');
  res.write('</html>');
  return res.end();


  } 
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<head><h1>Welcome to Complete Coding</h1></head>');
  res.write('</html>');
  res.end();
  
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`)
});
