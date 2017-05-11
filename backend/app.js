let express = require('express');
let compression = require('compression');
let Promise = require('bluebird');
let Flickr = Promise.promisifyAll(require('flickrapi'));

// Set up Express
app = express();
app.use(compression()); // use gzip

// Flickr API constants/keys
let flickrAuth = require('./flickrAuth.js'); // load in API keys
let flickrUserId = '22136543@N06';
let flickrPortfolioAlbumId = '72157680776000625';
let flickr, flickrSync;

console.log('REST handler listening under /api/');

// Initialize Flickr API
Flickr.tokenOnlyAsync(flickrOptions).then(rs => {
  console.log('Successfully fetched Flickr API token.');
  flickrSync = rs;
  // Promisify flickrapi function groups we're using
  flickr = Promise.promisifyAll(flickrSync);
  flickr.photosets = Promise.promisifyAll(flickrSync.photosets);
  flickr.photos = Promise.promisifyAll(flickrSync.photos);
}).catch(e => {
  console.error('Flickr API setup failed.');
  console.error(e);
});


// Returns an array representing details for Flickr photos along with
// a 2048px url, the photo's page url on flickr, the title, and exif data
app.get('/flickr/most-recent-photos', (req, res) => {
  if (!flickr) { // reject if server isn't ready or if request came in during initial setup
    res.status(500).send({err: 1, msg: 'Connection to Flickr API not established.'});
    return;
  }

  // Get IDs of all photos in portfolio album
  flickr.photosets.getPhotosAsync({
    user_id: flickrUserId,
    photoset_id: flickrPortfolioAlbumId
  }).then(rs => {
    let numPhotos = rs.photoset.photo.length; // for safety
    let flickrPhotos = rs.photoset.photo;
    let photoDetails = new Array(numPhotos); // response object
    let apiPromises = [];

    flickrPhotos.forEach((photoInfo, i) => {
      // Initialize object to represent photo's details
      photoDetails[i] = {
        pageUrl: 'https://www.flickr.com/photos/' + flickrUserId + '/' 
                + photoInfo.id
      };

      // Find url for 2048-px size of image
      apiPromises.push(flickr.photos.getSizesAsync({
        photo_id: photoInfo.id
      }).then(rs => {
        let sizes = rs.sizes.size;
        photoDetails[i].url = sizes.filter(x => x.label === 'Large 2048')[0].source;
      }));

      // Get photo's title
      apiPromises.push(flickr.photos.getInfoAsync({
        photo_id: photoInfo.id
      }).then(rs => {
        if (rs.photo.title._content !== '') {
          photoDetails[i].title = rs.photo.title._content;
        } else {
          photoDetails[i].title = 'Untitled';
        }
      }));

      // Get photo's EXIF data
      apiPromises.push(flickr.photos.getExifAsync({
        photo_id: photoInfo.id
      }).then(rs => {
        // Gather needed EXIF fields
        let exif = rs.photo.exif;
        photoDetails[i].exif = {};
        photoDetails[i].exif.camera = rs.photo.camera;
        photoDetails[i].exif.aperture = exif.filter(x => x.tag === 'FNumber' )[0].raw._content;
        photoDetails[i].exif.shutter = exif.filter(x => x.tag === 'ExposureTime' )[0].raw._content;
        photoDetails[i].exif.iso = exif.filter(x => x.tag === 'ISO' )[0].raw._content;
        photoDetails[i].exif.focalLength = exif.filter(x => x.tag === 'FocalLength' )[0].raw._content;
        let flash = exif.filter(x => x.tag === 'Flash' )[0].raw._content;
        if (flash.match(/on/i)) {
          photoDetails[i].exif.flash = 'On';
        } else {
          photoDetails[i].exif.flash = 'Off';
        }
      }));
    });

    // When all requests are done & photoDetails is fully assembled, send response
    Promise.all(apiPromises).then(() => {
      res.send({
        err: false,
        photos: photoDetails
      });
    }).catch(e => {
      res.status(500).send({err: 1, msg: 'Error fetching recent photos.', details: e});
      console.error('Error fetching most recent photos.');
      console.error(e);
    });
  });
});
