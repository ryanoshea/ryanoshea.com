var express = require('express');
var compression = require('compression');
app = express();
app.use(compression()); // use gzip

var flickrAuth = require('./flickrAuth.js'); // load in API keys
var Flickr = require('flickrapi'); // library
var flickr = null; // flickr API object instance
var flickrUserId = "22136543@N06"; // hardcoded because it won't change
var flickrPortfolioAlbumId = '72157680776000625';

// Returns an array representing my 5 most recent Flickr photos along with
// a 2048px url, the photo's page url on flickr, the title, and exif data
app.get('/flickr/most-recent-photos', function (req, res) {
  
  // Get IDs of 10 most recent photos
  flickr.photosets.getPhotos({
    user_id: flickrUserId,
    photoset_id: flickrPortfolioAlbumId
  }, function (err, result) {
    if (err) {
      res.status(500).send({err: 1, msg: 'Error fetching recent photos.'});
      console.error('Error fetching most recent photos.');
    }
    else {
      var numPhotos = result.photoset.photo.length; // for safety

      // Send requests for photo metadata iteratively
      fetchPhotoDetails(result.photoset.photo, new Array(numPhotos), numPhotos, 
                        0, res, function(responsePhotos) {
        res.send({
          err: false,
          photos: responsePhotos
        });
      });
    }
  });
});

// Reads a photo id from 'flickrPhotos', sends requests for its metadata,
// outputs that into the 'responsePhotos' buffer, and repeats for 'numPhotos'
// before returning the buffer to the callback
var fetchPhotoDetails = function (flickrPhotos, responsePhotos, numPhotos, 
                                  i, res, callback) {
  if (i < numPhotos) {

    var newPhoto = {
      pageUrl: 'https://www.flickr.com/photos/' + flickrUserId + '/' 
               + flickrPhotos[i].id
    };

    // Send request for image url
    flickr.photos.getSizes({
      photo_id: flickrPhotos[i].id
    }, function (err, result) {
      if (err) {
        res.status(500).send({err: 1, msg: 'Error fetching recent photos.'});
        console.error('Error fetching flickr photos.');
        return;
      }
      else {
        var sizes = result.sizes.size;
        var photoUrl = ''; 

        // Find the proper size
        sizes.forEach(function(current) {
          if (current.label == 'Large 2048')
            newPhoto.url = current.source;
        });

        // Send request for photo title
        flickr.photos.getInfo({
          photo_id: flickrPhotos[i].id
        }, function (err, result) {
          if (err) {
            res.status(500).send({err: 1, msg: 'Error fetching recent photos.'});
            console.error('Error fetching flickr photos.');
            return;
          }
          else {
            if (result.photo.title['_content'] != '')
              newPhoto.title = result.photo.title['_content'];
            else
              newPhoto.title = 'Untitled';

            flickr.photos.getExif({
              photo_id: flickrPhotos[i].id
            }, function (err, result) {
              // Gather needed EXIF fields
              var exif = result.photo.exif;
              newPhoto.exif = {};
              newPhoto.exif.camera = result.photo.camera;
              newPhoto.exif.aperture = exif.find(x => { return x.tag === 'FNumber'; }).raw._content;
              newPhoto.exif.shutter = exif.find(x => { return x.tag === 'ExposureTime'; }).raw._content;
              newPhoto.exif.iso = exif.find(x => { return x.tag === 'ISO'; }).raw._content;
              newPhoto.exif.focalLength = exif.find(x => { return x.tag === 'FocalLength'; }).raw._content;
              var flash = exif.find(x => { return x.tag === 'Flash'; }).raw._content;
              if (flash.match(/on/i))
                newPhoto.exif.flash = 'On';
              else
                newPhoto.exif.flash = 'Off';
              
              responsePhotos[i] = newPhoto;
              fetchPhotoDetails(flickrPhotos, responsePhotos, numPhotos, ++i, res, callback);
            });
          }
        });
      }
    });
  }
  else {
    // Iteration is over, return the filled buffer to the callback function 
    // to be returned
    callback(responsePhotos);
  }
};

// Runtime
console.log('REST handler listening under /api/');
Flickr.tokenOnly(flickrOptions, function(error, flickrObj) {
  if (error) {
    console.error('Flickr API setup failed.');
    process.exit();
  }
  console.log('Successfully fetched Flickr API token.');
  flickr = flickrObj;
});
