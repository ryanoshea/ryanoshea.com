var express = require('express');
app = express();

var flickrAuth = require('./flickrAuth.js');
var Flickr = require('flickrapi');
var flickr = null;
var flickrUserID = "22136543@N06";

app.get('/flickr/most-recent-photo', function (req, res) {
  console.log('GET to /flickr/most-recent-photo. Getting most recent photos ' +
    'from Flickr.');
  flickr.people.getPhotos({
    user_id: flickrUserID,
    per_page: 5
  }, function (err, result) {
    if (err)
      res.status(500).send({err: 1, msg: 'Error fetching recent photos.'});
    else {
      var numPhotos = result.photos.photo.length;
      fetchPhotoDetails(result.photos.photo, new Array(numPhotos), numPhotos, 
                        0, function(responsePhotos) {
        res.send({
          err: false,
          photos: responsePhotos
        });
      });
    }
  });
});

function fetchPhotoDetails (flickrPhotos, responsePhotos, numPhotos, 
                                  i, callback) {
  if (i < numPhotos) {
    flickr.photos.getSizes({
      photo_id: flickrPhotos[i].id
    }, function (err, result) {
      if (err) {
        res.status(500).send({err: 1, msg: 'Error fetching recent photos.'});
        return;
      }
      else {
        var sizes = result.sizes.size;
        var photoUrl = ''; 
        sizes.forEach(function(current) {
          if (current.label == 'Large 2048') {
            newPhoto = {
              pageUrl: 'https://www.flickr.com/photos/' + flickrUserID 
                + '/' + flickrPhotos[i].id,
              url: current.source
            };
            responsePhotos[i] = newPhoto;
          }
        });
        fetchPhotoDetails(flickrPhotos, responsePhotos, numPhotos, ++i, callback);
      }
    });
  }
  else callback(responsePhotos);
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