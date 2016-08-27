'use strict';

var http = require('http');
var https = require('spdy');
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var fs = require('fs');
var logger = require('morgan');

var pageServer = express();
var handler = require('./app.js');

// Setup HTTP2/SPDY/HTTP1.1 Server with TLS/SSL
// Get certificate
var key = fs.readFileSync('cert/privkey.pem');
var cert = fs.readFileSync('cert/fullchain.pem')
var tlsConfig = {
    key: key,
    cert: cert
};

// Enable HSTS
var ONE_YEAR = 31536000000;
pageServer.use(helmet.hsts({
  maxAge: ONE_YEAR,
  includeSubdomains: false,
  force: true
}));

// Set Content Security Policy header
pageServer.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", 'ryanoshea.com'],
    scriptSrc: ["'self'", "'unsafe-inline'", 'ajax.googleapis.com', 'www.google-analytics.com', 'data:'],
    styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'opensource.keycdn.com'],
    imgSrc: ["'self'", '*.staticflickr.com'],
    fontSrc: ["'self'", 'fonts.gstatic.com', 'opensource.keycdn.com'],
    sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
  },
  reportOnly: false,
  setAllHeaders: false,
  disableAndroid: false,
  browserSniff: true
}));

// Set X-Content-Type-Options header
pageServer.use(helmet.noSniff());

// Set X-XSS-Protection header
pageServer.use(helmet.xssFilter());

pageServer.use(express.static('../frontend')); // static webserver
pageServer.use(logger());
pageServer.use('/api', app);
pageServer.use(compression()); // enable gzip

// 404 Handler
pageServer.use(function (req, res) {
  // Redirect to Angular-routed 404 page
  res.writeHead(301, {'Location': 'https://' + req.headers['host'] + '/#/404'});
  res.end();
});

// Runtime

// Start HTTPS Server
var httpsServer = https.createServer(tlsConfig, pageServer).listen(443);
console.log('HTTPS server listening on port 443.');

// HTTP to HTTPS Redirect.
var httpServer = http.createServer(function (req, res) {
  res.writeHead(301, {'Location': 'https://' + req.headers['host'] + req.url});
  res.end();
}).listen(80);
console.log('HTTP-to-HTTPS redirect server listening on port 80.');

console.log('TLS/SSL certificate set to renew between 3:30am each Monday.');

