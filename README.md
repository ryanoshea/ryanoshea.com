# `ryanoshea.com`

This repo contains a relatively uninteresting Angular 1 app powering my personal website at <https://ryanoshea.com> and a somewhat more interesting Node.js implementation of a secure HTTP/2 server.

## Node.js Backend

The backend server is a side project to maintain a Node.js server with an ideal HTTPS setup.

1. `server.js`: A static file server based on `express.static()` that employs HTTPS best practices.
1. `app.js`: A single-endpoint REST server handling the fetching of my "Portfolio" album on Flickr.

### `server.js`

The Node.js server is based on the [`spdy`](https://www.npmjs.com/package/spdy) npm package for serving over HTTP/2. [`helmet`](https://www.npmjs.com/package/helmet) is used to serve security-related HTTP headers, including:

- `Strict-Transport-Security` (HSTS with preload)
- `Content-Security-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-XSS-Protection`

[ExpressJS](https://expressjs.com/) is used for static page serving for the frontend Angular 1 app. `server.js` is easily adaptable to any other project that involves static page serving over HTTPS.

### `app.js`

`app.js` is a single-endpoint REST handler for the one AJAX call made by the frontend — fetching the contents of a portfolio album on Flickr. It uses  [`flickr-sdk`](https://github.com/flickr/flickr-sdk) to fetch all the necessary details from Flickr's API. All of those requests take a while, so after the first set of requests, the server caches the results until the contents of the Flickr album change.

## Frontend Angular 1 App

The frontend is nothing special. I think it looks nice. There's no build toolchain, so it's all in ES5, and the code quality is best described as … functional. (Man, I miss my lambdas.) But the backend is more fun!
