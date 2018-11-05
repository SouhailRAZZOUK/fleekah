# Fleekah  (Work In Progress)

## Description

Fleekah is somehow a flickr client, made using React/Redux/Webtask(expressjs); the sole purpose for creating this project is making a solution for the SwingDev challenge for the Front-End developer position.

## Solution

A full stack javascript project made as a SPA on a serverless back-end.

### Road Map

*Main tasks:*
* [x] get first 100 photos of dogs
    * [x] with captions - author, date, description
* [x] add infinite scroll
* [x] implement visible error handling from both engineering and user perspectives. 
* [x] use loading indicators

*Extras:*
* [x] add ability to see author’s other pictures
* [x] show map of dogs photos using geolocation
* [ ] allow to search for photos of dogs
* [ ] add offline functionality and ability to add app to Homescreen
* [-] filter based on parameters: date, color (?), licence, and more
    - [x] Color
    - [ ] Date
    - [ ] Licence

### Back-end (Proxy-ish)

Under the `server-proxy` folder.

*Stack:* Webtask using the ExpressJS template, with modules for flickr, colors extraction and error reporting (Sentry).

Fetch 100 photos from flickr API service every 1 hour, and extract colors from every photo possible, re-maps urls, paginate results on-demande, and submits data upon request for the following routes:

- `(GET) /photos`: All fetched photos from flickr API, can have a `page` and `perPage` url query params, for paginating the data, where `page` is the requested page number starting from 1, ane  `perPage` is the number of items wnated per page which defaults to 10, if `page` is not provided, all the images are returned and `perPage` is ignored.

- `(GET) /userPhotos/[userId]`: All user photos, and can have the `page` and `perPage` params as the previous route. With `userId` is the flickr user id that the API should return his photos.

- `(GET) /photo/[photoId]`: Details for the photo with the flickr photo id `photoId`, this route has no url query params.

- `(POST) /searchByColor`: Search results by colors, returned based on `POST` body params as follows: 

```javascript

{
    vibrant: [vibrant_color],
    muted: [muted_color]
}

```
where both properties are an array of 3 items defining an RGB color notation as `[r, g, b]` items can be string or number (float or integer), while `vibrant` is the color that should be the vibrant color in the searched photos, and `muted` is the muted color of the searched  photos.

### Front-End

Under the `front` folder.

*Stack:* React, Redux, with modules for material design components, community built react components, mapping, and error reporting (Sentry).

Fetch requests from the back-end and renders them to the client, respectivly to the desired view.

- `Home`: Lazy loading photos from the server proxy, 10 photos every time scrolled to page bottom.

- `Map`: Lacalizing all 100 photos on a map with popup for every image.

- `Image Details`: Photo details for selected photo from Home or Search By Color pages.

- `Search By Color`: Search form to look for photos with a vibrant and muted colors as slected from  the form.

- `User Photos`: Load 100 photos for desired user.