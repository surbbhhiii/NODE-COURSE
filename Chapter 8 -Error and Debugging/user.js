const fs = require('fs');

const useRequestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === '/' ) {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
      res.write('<head><title>Complete Coding</title></head>');
      res.write('<body><h1>Enter Your Details</h1></body>');
    res.write ('<form action="/submit-details" method="POST">')
    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name="gender" value="male"><br>');
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" id="female" name="gender" value="female"><br>');
    res.write('<br><input type="submit" value="Submit">')
    res.write('</form>');
    res.write('</form>');
    res.write('</html>');
     return res.end();
  } else if (req.url.toLowerCase() === '/submit-details' && req.method === 'POST') {

    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      const fulldBody = Buffer.concat(body).toString();
      console.log(fulldBody);
      const params = new URLSearchParams(fulldBody);
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFile('user.txt', JSON.stringify(bodyObject), (err) => {
        console.log('Data written successfully');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>welcome to complete coding</h1></body>');
    res.write('</html>');
    res.end();
  }
};

module.exports = useRequestHandler;