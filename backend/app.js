var express = require('express');
var compression = require('compression');
app = express();
app.use(compression()); // use gzip

var flickrAuth = require('./flickrAuth.js'); // load in API keys
var Flickr = require('flickrapi'); // library
var flickr = null; // flickr API object instance
var flickrUserID = "22136543@N06"; // hardcoded because it won't change

// Returns an array representing my 5 most recent Flickr photos along with
// a 2048px url, the photo's page url on flickr, the title, and exif data
app.get('/flickr/most-recent-photo', function (req, res) {
  
  // Get IDs of 10 most recent photos
  flickr.people.getPhotos({
    user_id: flickrUserID,
    per_page: 10
  }, function (err, result) {
    if (err) {
      res.status(500).send({err: 1, msg: 'Error fetching recent photos.'});
      console.err('Error fetching most recent photos.');
    }
    else {
      var numPhotos = result.photos.photo.length; // for safety

      // Send requests for photo metadata iteratively
      fetchPhotoDetails(result.photos.photo, new Array(numPhotos), numPhotos, 
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
      pageUrl: 'https://www.flickr.com/photos/' + flickrUserID + '/' 
               + flickrPhotos[i].id
    };

    // Send request for image url
    flickr.photos.getSizes({
      photo_id: flickrPhotos[i].id
    }, function (err, result) {
      if (err) {
        res.status(500).send({err: 1, msg: 'Error fetching recent photos.'});
        console.err('Error fetching flickr photos.');
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
            console.err('Error fetching flickr photos.');
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
              var exif = result.photo.exif;
              newPhoto.exif = {};
              exif.forEach(function (current) {
                if (current.tag == 'FNumber')
                  newPhoto.exif.aperture = current.raw['_content'];
                if (current.tag == 'ExposureTime')
                  newPhoto.exif.shutter = current.raw['_content'];
                if (current.tag == 'ISO')
                  newPhoto.exif.iso = current.raw['_content'];
                if (current.tag == 'FocalLength')
                  newPhoto.exif.focalLength = current.raw['_content'];
              });
              
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