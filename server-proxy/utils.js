const Vibrant = require("node-vibrant");

const FLICKR_SEARCH_EXTRAS = ["description", "url_m", "url_o", "geo", "owner_name", "tags"];
const FLICKR_SEARCH_TEXT = "dogs";
const FLICKR_SEARCH_OPTIONS = {
    text: FLICKR_SEARCH_TEXT,
    extras: FLICKR_SEARCH_EXTRAS,
    safe_search: 3
};


const getDogsPhotos = (flickr) => flickr.photos.search(FLICKR_SEARCH_OPTIONS)

const getUserPhotos = (id, flickr) => flickr.people.getPhotos({ user_id: id, extras: FLICKR_SEARCH_EXTRAS })
    .then((response) => response.body)

const getPhotoFromOrigin = (id) => flickr

const mapPhotosURLs = (photos) => {
    for (let photo of photos) {
        photo.url = photo.url_o;
        photo.thumbnail = photo.url_m;
        delete photo.url_o;
        delete photo.url_m;
    }
    return photos;
}

const mapPhotosData = (photos) => {
    let mapedPhotos = mapPhotosURLs(photos);
    return mapPhotosColors(mapedPhotos);
}

const persistDataToStorage = (photosData, context, callback) => {
    return mapPhotosData(photosData)
        .then((photos) => {
            context.storage.set({ photos }, { force: 1 }, callback);
        });
};
const persistCallback = (wtCallback) => function (error) {
    if (error) return wtCallback(error);
    // wtCallback(null, {});
};

const getDataFromStorage = (context, callback) => {
    context.storage.get(callback);
}
const getCallback = (wtCallback) => function (error, data) {
    if (error) return wtCallback(error);
    return wtCallback(null, data);
}

const respondWithData = (context, wtCallback) => {
    let callback = getCallback(wtCallback);
    return getDataFromStorage(context, callback);
}

const fillPhotoColor = (photo) => {

    return photo && photo.thumbnail ? Vibrant
        .from(photo.thumbnail)
        .getPalette()
        .then((palette) => {
            if (palette) {
                photo.colors = palette;
            } else {
                photo.colors = null;
            }
            return photo;
        }) : null;
};

const mapPhotosColors = (photos) => {
    let promises = [];

    for (let photo of photos) {
        if (photo.url) {
            promises.push(fillPhotoColor(photo))
        } else {
            photo.color = null;
            promises.push(photo)
        }
    }

    return Promise.all(promises);
}

const filterPhotoById = (photos, id) => {
    let matchedPhoto = photos.filter(photo => photo.id === id)[0];
    return matchedPhoto;
}

const stringToArray = (string) => {
    let itemsString = string.substr(1).slice(0, -1);
    let items = itemsString.split(',');
    let array = items.map(item => parseFloat(item));
    return array;
}

const colorsAreEqual = (color1, color2) => {
    if (color1.length !== color2.length) return false;
    return color1.every((value, index) => parseFloat(color2[index]) === parseFloat(value));

}

const paginateData = (data, page, perPage) => {
    --page; // 1 based pagination to 0 based indexing system;
    let currentStartIndex = page * perPage;
    let currectEndIndex = (page + 1) * perPage;
    return data ? data.slice(currentStartIndex, currectEndIndex) : [];
}

const filterPhotosByColors = (photos, colors) => {
    let matchedPhotos = photos;
    if (colors.vibrant) {
        matchedPhotos = matchedPhotos.filter((photo) => {
            if (photo && photo.colors) {
                let vibrant = photo.colors.Vibrant ? photo.colors.Vibrant._rgb : [];
                return colorsAreEqual(colors.vibrant, vibrant);
            }
            return false;
        })
    }
    if (colors.muted) {
        matchedPhotos = matchedPhotos.filter((photo) => {
            if (photo && photo.colors) {
                let muted = photo.colors.Muted ? photo.colors.Muted._rgb : [];
                return colorsAreEqual(colors.muted, muted)
            }
            return false;
        })
    }
    return matchedPhotos;
}

const extractColors = (photos) => {
    let availableColors = {
        vibrants: [],
        muted: []
    };

    if (photos && Array.isArray(photos)) {
        for (let photo of photos) {
            if (photo && photo.colors) {
                let { Vibrant, Muted } = photo.colors;
                Vibrant &&
                    !availableColors.vibrants.includes(Vibrant._rgb) &&
                    availableColors.vibrants.push(Vibrant._rgb);
                Muted &&
                    !availableColors.muted.includes(Muted._rgb) &&
                    availableColors.muted.push(Muted._rgb);
            }
        }
    }

    return availableColors
}

module.exports = {
    getDogsPhotos,
    getUserPhotos,
    mapPhotosURLs,
    persistDataToStorage,
    persistCallback,
    getDataFromStorage,
    getCallback,
    respondWithData,
    filterPhotoById,
    filterPhotosByColors,
    stringToArray,
    paginateData,
    extractColors
}