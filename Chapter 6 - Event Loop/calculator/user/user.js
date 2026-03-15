//const http = require('http');
const fs = require('fs');
const userRequestHandler = (req, res) => {



//const //server = http.createServer((req, res) => {
  console.log(req.url, req.method);



  if (req.url === '/'){
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<head><h1>Enter Your Details</h1></head>');
  res.write('<form action="/submit-details" method="POST">'); 
  res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
  res.write('<lable for="male">Male</lable>')
  res.write('<input type="radio" name" id="male" name="gender" value="male" />')
  
  

  res.write('<lable for="Female">Female</lable>')
  res.write('<input type="radio" name" id="Female" name="gender" value="Female" />')
  res.write('<br><input type="submit" value="Submit">');
    
  res.write('</form>');
  res.write('</body>');
  res.write('</html>');
  return res.end();


  } else if (req.url.toLowerCase() === "/submit-details" && req.method == "POST") {

    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const Params =  new URLSearchParams(fullBody);
      //const bodyObject = {};
      //for (const [key, value] of Params .entries()) {
      // bodyObject[key] = value;
      //}

      const bodyObject = Object.fromEntries(Params);
      console.log(bodyObject);
    fs.writeFileSync('user.txt', JSON.stringify(bodyObject), error => { console.log('Data Written successfully');
      res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
    });

  });

  } else {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<head><h1>Welcome to Complete Coding</h1></head>');
  res.write('</html>');
  res.end();
  }
};

module.exports = userRequestHandler;

//const PORT = 3001;
//server.listen(PORT, () => {
  //console.log(`Server is running on address http://localhost:${PORT}`)
//});
