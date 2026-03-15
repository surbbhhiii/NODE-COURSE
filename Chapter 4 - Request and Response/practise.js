const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.url === '/home') {
    res.write('<h1>welcome to Home Page</h1>');
    return res.end();
  } else if (req.url === '/men') {
     res.write('<h1>welcome to Men </h1>');
    return res.end();
  } else if (req.url === '/women') {
     res.write('<h1>welcome to Women </h1>');
    return res.end();
  } else if (req.url === '/kids') {
     res.write('<h1>welcome to Kids </h1>');
    return res.end();
  } else if (req.url === '/cart') {
     res.write('<h1>welcome to Cart </h1>');
    return res.end();
  }


  res.write(
<html lang="en">
<head>
  <title>Myntra</title>
</head>
<body>
  <head>
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/men">Men</a></li>
        <li><a href="/women">women</a></li>
        <li><a href="/kids">Kids</a></li>
        <li><a href="/cart">Cart</a></li>
        </ul>
    </nav>
  </head>
 </body>
    </html>
  );
  res.end();

});

server.listen(3001, () => {
console.log('Server is running on address http://localhost:3001');

});