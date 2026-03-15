const http = require('http');
 
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, Red.headers);

  if (req.url === '/'){
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<head><h1>Welcome to Home</h1></head>');
  res.write('</html>');
  res.end();  

  } else if (req.url === '/product') {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<head><h1>Checkout our products</h1></head>');
  res.write('</html>');
  res.end();  

  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<head><h1>Welcome to Complete Coding</h1></head>');
  res.write('</html>');
  res.end();  


  /*process.exit();*/
});

/*server.listen(3001);*/

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`)

});

  