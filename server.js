const http = require('http');
const port = 8000;
const url = require('url');

//const requestHandler = (request, response) => {
//    console.log(request.url);
//    if (request.url === '/') {
//      response.end('Hello Node.js Server!');
//    } else if (request.url === '/about') {
//      response.end('This demonstrates routing with Node.js.');
//    } else {
//      response.end('Default page (URLs other than / and /about !!!)');
//    }
//  };

const requestHandler = (request, response) => {
  console.log(request.url);
  const parsedUrl = url.parse(request.url, true);
  if (parsedUrl.query.name && parsedUrl.query.city) {
  response.end(`Hello, ${parsedUrl.query.name} from ${parsedUrl.query.city}`);
  } else {
    response.end('Please provide name and city parameters')
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
      console.error('Something bad happened');
    } else {
      console.log(`server is listening on ${port}`);
    }
  });