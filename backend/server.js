var http = require('http');
var https = require('spdy');
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var fs = require('fs');

var key = fs.readFileSync('cert/testserver-key.pem');
var cert = fs.readFileSync('cert/testserver-cert.pem')

var tlsConfig = {
    key: key,
    cert: cert
};

var app = express();
app.use(express.static('../frontend'));
app.use(compression());
var ONE_YEAR = 31536000000;
app.use(helmet.hsts({
  maxAge: ONE_YEAR,
  includeSubdomains: true,
  force: true
}));

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);

httpsServer = https.createServer(tlsConfig, app);
httpsServer.listen(443);
