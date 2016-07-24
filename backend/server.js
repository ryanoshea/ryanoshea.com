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
    cert: cert,
    ciphers: 
      [
        "ECDHE-RSA-AES256-SHA384",
        "DHE-RSA-AES256-SHA384",
        "ECDHE-RSA-AES256-SHA256",
        "DHE-RSA-AES256-SHA256",
        "ECDHE-RSA-AES128-SHA256",
        "DHE-RSA-AES128-SHA256",
        "HIGH",
        "!aNULL",
        "!eNULL",
        "!EXPORT",
        "!DES",
        "!RC4",
        "!MD5",
        "!PSK",
        "!SRP",
        "!CAMELLIA"
      ].join(':'),
    honorCipherOrder: true
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
app.get('/', function(req,res) {
  res.send('hello');
});

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);

httpsServer = https.createServer(tlsConfig, app);
httpsServer.listen(443);
