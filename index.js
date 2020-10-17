const http = require('http');
const path = require('path');
const fs = require('fs');

const pagesUrlRegex = /^\/((index|about|contact-me)|index.css)$/g;
const serverPort = 8080;

const handleClientRequest = (request, response) => {
  request.url = request.url == '/' ? '/index' : request.url;
  request.url = request.url.search(pagesUrlRegex) == 0 ?
    request.url.substring(1, request.url.length) : '404';
  const pageName = request.url.indexOf('.css') > -1 ? request.url :
    request.url.concat('.html');
  const mimeType = path.extname(pageName) == '.html' ?
    'text/html' : 'text/css';
  response.writeHead(200, { 'Content-Type':mimeType });
  fs.createReadStream(pageName).pipe(response);
}

const server = http.createServer(handleClientRequest);
server.listen(serverPort);
