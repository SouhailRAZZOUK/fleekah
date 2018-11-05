const fetch = require("node-fetch");

const PHOTOS_CRON_PROXY_URL = "http://localhost:4000/?operation=fetch";

const getPhotos = (proxy) => fetch(proxy || PHOTOS_CRON_PROXY_URL)
    .then(response => response.json());

module.exports = {
    getPhotos
}