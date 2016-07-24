var http = require('http');
var https = require('spdy');
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var fs = require('fs');

// Setup HTTP2/SPDY/HTTP1.1 Server with TLS/SSL

var app = express();
// Get certificate
var key = fs.readFileSync('cert/testserver-key.pem');
var cert = fs.readFileSync('cert/testserver-cert.pem')
var tlsConfig = {
    key: key,
    cert: cert
};
app.use(express.static('../frontend')); // static webserver
app.use(compression()); // enable gzip

// Enable HSTS
var ONE_YEAR = 31536000000;
app.use(helmet.hsts({
  maxAge: ONE_YEAR,
  includeSubdomains: true,
  force: true
}));

// Start HTTPS Server
var httpsServer = https.createServer(tlsConfig, app);
httpsServer.listen(443);