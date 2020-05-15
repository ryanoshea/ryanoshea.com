const express = require('express');
const compression = require('compression');

// Initialize Flickr API
const Flickr = require('flickr-sdk');
const { apiKey: flickrApiKey } = require('./flickrAuth');
const flickr = new Flickr(flickrApiKey);
const FLICKR_USER_ID = '22136543@N06';
const FLICKR_PORTFOLIO_ALBUM_ID = '72157680776000625';

// Set up Express
const App = express();
App.use(
    compression({
        threshold: 100, // compress any response over 100 bytes
    })
);

let photoCache;

/**
 * Returns an array representing details for Flickr photos along with a 2048px url, the photo's page url on flickr, the
 * title, and exif data.
 */
App.get('/flickr/most-recent-photos', (req, res) => {
    let allPhotoDataFetchedSuccessfully = true;

    // Get IDs of all photos in portfolio album
    flickr.photosets
        .getPhotos({
            user_id: FLICKR_USER_ID,
            photoset_id: FLICKR_PORTFOLIO_ALBUM_ID,
        })
        .then(({ body: rs }) => {
            let numPhotos = rs.photoset.photo.length; // for safety
            let flickrPhotos = rs.photoset.photo;

            if (photoCacheIsNotStale(flickrPhotos)) {
                console.log(`Flickr photos: returning ${photoCache.length} cached results...`);
                res.send({
                    err: false,
                    photos: photoCache,
                });
                return;
            }

            let photoDetails = new Array(numPhotos); // response object
            let apiPromises = [];

            flickrPhotos.forEach((photoInfo, i) => {
                // Initialize object to represent photo's details
                photoDetails[i] = {
                    id: photoInfo.id,
                    pageUrl: `https://www.flickr.com/photos/${FLICKR_USER_ID}/${photoInfo.id}`,
                };

                // Find url for 2048-px size of image
                apiPromises.push(
                    flickr.photos
                        .getSizes({
                            photo_id: photoInfo.id,
                        })
                        .then(({ body: rs }) => {
                            let sizes = rs.sizes.size;
                            photoDetails[i].url = sizes.find(x => x.label === 'Large 2048').source;
                        })
                );

                // Get photo's title
                apiPromises.push(
                    flickr.photos
                        .getInfo({
                            photo_id: photoInfo.id,
                        })
                        .then(({ body: rs }) => {
                            if (rs.photo.title._content !== '') {
                                photoDetails[i].title = rs.photo.title._content;
                            } else {
                                photoDetails[i].title = 'Untitled';
                            }
                        })
                );

                // Get photo's EXIF data
                apiPromises.push(
                    flickr.photos
                        .getExif({
                            photo_id: photoInfo.id,
                        })
                        .then(({ body: rs }) => {
                            // Gather needed EXIF fields
                            let exif = rs.photo.exif;
                            const details = photoDetails[i];
                            details.exif = {};
                            if (exif.length > 0) {
                                details.exif.camera = rs.photo.camera;
                                const aperture = exif.find(x => x.tag === 'FNumber');
                                details.exif.aperture = aperture ? aperture.raw._content : null;
                                const shutter = exif.find(x => x.tag === 'ExposureTime');
                                details.exif.shutter = shutter ? shutter.raw._content : null;
                                const iso = exif.find(x => x.tag === 'ISO');
                                details.exif.iso = iso ? iso.raw._content : null;
                                const focalLen = exif.find(x => x.tag === 'FocalLength');
                                details.exif.focalLength = focalLen ? focalLen.raw._content : null;
                                const flashItem = exif.find(x => x.tag === 'Flash');
                                if (flashItem) {
                                    let flash = flashItem.raw._content;
                                    details.exif.flash = flash.match(/on/i) ? 'On' : 'Off';
                                } else {
                                    details.exif.flash = null;
                                }
                            } else {
                                // Sometimes Flickr's API returns no EXIF results for getExif()
                                console.error(`EXIF not returned for photo id = ${photoInfo.id}. Response data:`);
                                console.error(JSON.stringify(rs));
                                allPhotoDataFetchedSuccessfully = false;
                            }
                        })
                );
            });

            // When all requests are done & photoDetails is fully assembled, send response
            Promise.all(apiPromises)
                .then(() => {
                    if (allPhotoDataFetchedSuccessfully) {
                        photoCache = photoDetails;
                    } else {
                        photoCache = null;
                    }
                    console.log(`Flickr photos: returning ${photoDetails.length} new results...`);
                    res.send({
                        err: false,
                        photos: photoDetails,
                    });
                })
                .catch(logFlickrError);
        })
        .catch(logFlickrError);
});
console.log('REST handler listening under /api/');

/**
 * Checks the last set of photos grabbed from the Flickr API and indicates whether the current portfolio album contains
 * the same photos. If so, we return the cached copy to save time & API calls.
 * @param newPortfolioAlbum: Flickr API response for getPhotos() call on portfolio album
 */
const photoCacheIsNotStale = (newPortfolioAlbum) => {
    if (!photoCache || photoCache.length !== newPortfolioAlbum.length) {
        return false;
    }

    return newPortfolioAlbum.every((newPhoto, i) => newPhoto.id === photoCache[i].id);
}

const logFlickrError = e => {
    res.status(500).send({ err: 1, msg: 'Error fetching recent photos.', details: e });
    console.error('Error fetching most recent photos.');
    console.error(e);
}

module.exports = App;
