const express = require('express');
const Sentry = require('@sentry/node');
const Flickr = require("flickr-sdk");
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const cors = require("cors");
const utils = require("./utils");
const http = require("./http");

const {
    filterPhotoById,
    filterPhotosByColors,
    getUserPhotos,
    mapPhotosURLs,
    paginateData,
    extractColors
    // stringToArray
} = utils;
const { getPhotos } = http;
const app = express();

Sentry.init({ dsn: 'https://cf87b8d68d7c43b78f687d4abb5cf410@sentry.io/1315446' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(bodyParser.json());
app.use(cors());

app.get('/photos', function (request, response) {
    let { query, webtaskContext } = request;
    let { page, perPage } = query;
    let { FLEEKAH_CRON_PROXY_URL } = webtaskContext.meta;

    page = parseInt(page);
    perPage = parseInt(perPage);

    getPhotos(FLEEKAH_CRON_PROXY_URL)
        .then((body) => {
            let { photos } = body
            let resultPhotos = photos;
            if (page) {
                perPage = perPage || 10;
                resultPhotos = paginateData(photos, page, perPage);
            }
            response.set("Content-Type", "application/json");
            response.send(resultPhotos);
        });
});

app.get('/photo/:id', function (request, response) {
    let { params, webtaskContext } = request;
    let { id } = params;
    let { FLEEKAH_CRON_PROXY_URL } = webtaskContext.meta;
    getPhotos(FLEEKAH_CRON_PROXY_URL)
        .then((body) => {
            let { photos } = body;
            let filtered = photos.filter(photo => photo);
            return filterPhotoById(filtered, id)
        })
        .then((photo) => {
            response.set("Content-Type", "application/json");
            response.send(photo);
        });
});

app.get("/availableColors", function (request, response) {
    let { webtaskContext } = request;
    let { FLEEKAH_CRON_PROXY_URL } = webtaskContext.meta;

    getPhotos(FLEEKAH_CRON_PROXY_URL)
        .then((body) => {
            let { photos } = body;
            return extractColors(photos);
        })
        .then((availableColors) => {
            response.set("Content-Type", "application/json");
            response.send(availableColors);
        })

})

// app.get("/searchByColors", function (request, response) {

//     let { body, query, webtaskContext } = request;
//     let { vibrant, muted } = body;
//     let { page, perPage } = query;
//     let { FLEEKAH_CRON_PROXY_URL } = webtaskContext.meta;

//     let colors = {
//         vibrant: stringToArray(vibrant),
//         muted: stringToArray(muted)
//     };

//     getPhotos(FLEEKAH_CRON_PROXY_URL)
//         .then((body) => {
//             return filterPhotosByColors(body.photos, colors)
//         }, (error) => {
//             return [];
//         })
//         .then((photos) => {
//             response.set("Content-Type", "application/json");
//             response.send(photos);
//         });

// });

app.post("/searchByColors", function (request, response) {

    let { body, query, webtaskContext } = request;
    let colors = { vibrant, muted } = body;
    let { page, perPage } = query;
    let { FLEEKAH_CRON_PROXY_URL } = webtaskContext.meta;

    page = parseInt(page);
    perPage = parseInt(perPage);

    getPhotos(FLEEKAH_CRON_PROXY_URL)
        .then((body) => filterPhotosByColors(body.photos, colors))
        .then((photos) => {
            let resultPhotos = photos;
            if (page) {
                perPage = perPage || 10;
                resultPhotos = paginateData(photos, page, perPage);
            }
            response.set("Content-Type", "application/json");
            response.send(resultPhotos)
        });

});

app.get("/userPhotos/:id", function (request, response) {
    let { params, query, webtaskContext } = request;
    let { id } = params
    let { page, perPage } = query;
    page = parseInt(page);
    perPage = parseInt(perPage);

    let { FLICKR_API_KEY } = webtaskContext.secrets;

    let flickr;

    try {
        flickr = new Flickr(FLICKR_API_KEY);

    } catch (error) {
        console.log("flickr instance already available");
    }

    getUserPhotos(id, flickr)
        .then((body) => {
            let photos = body.photos.photo;
            return mapPhotosURLs(photos)
        })
        .then((photos) => {
            let resultPhotos = photos;
            if (page) {
                perPage = perPage || 10;
                resultPhotos = paginateData(photos, page, perPage);
            }
            response.set("Content-Type", "application/json");
            response.send(resultPhotos)
        })

})

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});

module.exports = Webtask.fromExpress(app);