'use strict';

var http = require('http');
var https = require('spdy');
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var fs = require('fs');

var pageServer = express();
var handler = require('./app.js');
pageServer.use('/api', app);

// Setup HTTP2/SPDY/HTTP1.1 Server with TLS/SSL
// Get certificate
var key = fs.readFileSync('cert/privkey.pem');
var cert = fs.readFileSync('cert/fullchain.pem')
var tlsConfig = {
    key: key,
    cert: cert
};
pageServer.use(express.static('../frontend')); // static webserver
pageServer.use(compression()); // enable gzip

// Enable HSTS
var ONE_YEAR = 31536000000;
pageServer.use(helmet.hsts({
  maxAge: ONE_YEAR,
  includeSubdomains: false,
  force: true
}));

// Runtime

// Start HTTPS Server
var httpsServer = https.createServer(tlsConfig, pageServer).listen(443);
console.log('HTTPS server listening on port 443.');

// HTTP to HTTPS Redirect.
var httpServer = http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);
console.log('HTTP-to-HTTPS redirect server listening on port 80.');

console.log('TLS/SSL certificate set to renew between 3:30am each Monday.');

