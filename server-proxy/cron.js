const Sentry = require("@sentry/node");
const Flickr = require("flickr-sdk");
const utils = require("./utils");

let {
    getDogsPhotos,
    persistDataToStorage,
    persistCallback,
    respondWithData
} = utils;


module.exports = function (ctx, cb) {
    let { secrets, query } = ctx;
    let {
        FLICKR_API_KEY,
        SENTRY_PROTOCOL,
        SENTRY_HOST,
        SENTRY_PUBLIC_KEY,
        SENTRY_PROJECT_ID
    } = secrets;

    let flickr;

    try {
        flickr = new Flickr(FLICKR_API_KEY);

    } catch (error) {
        console.log("flickr instance already available");
    }

    Sentry.init({ dsn: `${SENTRY_PROTOCOL}://${SENTRY_PUBLIC_KEY}@${SENTRY_HOST}/${SENTRY_PROJECT_ID}` });

    let { operation } = query;

    if (operation && operation === "fetch") {
        return respondWithData(ctx, cb);
    }

    getDogsPhotos(flickr)
        .then((response) => {
            let { body } = response
            if (body && body.photos) {
                let callback = persistCallback(cb);
                let photos = body.photos.photo;
                persistDataToStorage(photos, ctx, callback);
                return;
            }
            cb("no photos");
        })
        .then(() => respondWithData(ctx, cb))
        .catch((error) => {
            Sentry.captureException(error);
            cb(error);
        });
}