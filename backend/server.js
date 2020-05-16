const http = require('http');
const https = require('spdy');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const fs = require('fs');
const logger = require('morgan');
const App = require('./app');

// Pull TLS cert from disk
const key = fs.readFileSync('cert/privkey.pem');
const cert = fs.readFileSync('cert/fullchain.pem');
const tlsConfig = {
    key: key,
    cert: cert,
};

const localhostCorsMiddleware = (req, res, next) => {
    // Allow requests from local React dev server
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};

const createServer = () => {
    const pageServer = express();

    // Enable gzip
    pageServer.use(
        compression({
            threshold: 100, // compress any response over 100 bytes
        })
    );

    // Setup HTTP2/SPDY/HTTP1.1 Server with TLS/SSL

    // Enable HSTS with long expiry
    const ONE_YEAR = 31536000000;
    pageServer.use(
        helmet.hsts({
            maxAge: ONE_YEAR,
            includeSubDomains: false,
            force: true,
            preload: true,
        })
    );

    // Set Content Security Policy headers
    pageServer.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'none'"],
                connectSrc: ['ryanoshea.com', '*.ryanoshea.com', 'localhost'],
                scriptSrc: [
                    'ryanoshea.com',
                    '*.ryanoshea.com',
                    'localhost',
                    'www.google-analytics.com',
                    'use.fontawesome.com',
                    'ajax.googleapis.com',
                    "'sha256-oY1ddOyqyapI/8WdWPxfu4D5+SEPylUFMWng2aAlnQA='",
                    "'sha256-DdEaN+Pq6QjzsX3DogWAWpNCzeWCw437H8jqNv9mP+8='",
                    // Google Analytics inline hashes
                    "'sha256-1x5xSsObH83rcuF5NpFRGALUyVEUZSA0C6LlueRxfek='",
                    "'sha256-vW/bBWjiMca9xcF6xcWp5hHtiQofRu6SLormz9EsHE8='",
                ],
                styleSrc: [
                    'ryanoshea.com',
                    '*.ryanoshea.com',
                    'localhost',
                    'fonts.googleapis.com',
                    'use.fontawesome.com',
                    'ajax.googleapis.com',
                ],
                imgSrc: [
                    'ryanoshea.com',
                    '*.ryanoshea.com',
                    'localhost',
                    '*.staticflickr.com',
                    'www.google-analytics.com',
                    'stats.g.doubleclick.net',
                ],
                fontSrc: ['ryanoshea.com', '*.ryanoshea.com', 'localhost', 'fonts.gstatic.com', 'use.fontawesome.com'],
                objectSrc: ['ryanoshea.com', '*.ryanoshea.com', 'localhost'],
                frameAncestors: ["'none'"],
                baseUri: ["'none'"],
                formAction: ["'none'"],
            },
            reportOnly: false,
            setAllHeaders: false,
            disableAndroid: false,
            browserSniff: true,
        })
    );

    // Strip CSP from object storage requests (e.g. resume).
    // Strict CSP policies like disallowing unsafe-inline styles break Chrome's JS-based PDF reader
    pageServer.use((req, res, next) => {
        if (req.url.startsWith('/contact')) {
            res.removeHeader('Content-Security-Policy');
        }
        next();
    });

    pageServer.use(localhostCorsMiddleware);

    // Set X-Content-Type-Options header
    pageServer.use(helmet.noSniff());

    // Set X-XSS-Protection header
    pageServer.use(helmet.xssFilter());

    // Set X-Frame-Options to allow only iframes only on same origin
    pageServer.use(helmet.frameguard());

    // Strip paths from referrer
    pageServer.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

    // Logging
    pageServer.use(logger('combined'));

    // Routes
    pageServer.use(express.static('../frontend/build'));
    pageServer.use('/api', App);

    // 404 Handler
    pageServer.use((req, res) => {
        // Redirect to Angular-routed 404 page
        res.writeHead(301, { Location: 'https://' + req.headers.host + '/#/404' });
        res.end();
    });

    return pageServer;
};

// Runtime

// Start HTTPS Server
const pageServer = createServer();
https.createServer(tlsConfig, pageServer).listen(443);
console.log('HTTPS server listening on port 443.');

// HTTP to HTTPS Redirect.
http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
    res.end();
}).listen(80);
console.log('HTTP-to-HTTPS redirect server listening on port 80.');

console.log('TLS/SSL certificate set to renew between 3:30am each Monday.');
