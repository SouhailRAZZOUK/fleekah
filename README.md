# Fleekah  (Work In Progress)

## Description

Fleekah is somehow a flickr client, made using React/Redux/Webtask(expressjs); the sole purpose for creating this project is making a solution for the SwingDev challenge for the Front-End developer position.

## Solution

A full stack javascript project made as a SPA on a serverless back-end.

### Artifacts

The application is already deployed and running under these links:

*Server*

- Main API (Proxy): [here](https://wt-souhail_razzouk-hotmail_com-0.sandbox.auth0-extend.com/fleekah-back-end/)
- Cron Job (Configured to run on every 1 hour): [here](https://wt-souhail_razzouk-hotmail_com-0.sandbox.auth0-extend.com/fleekah-cron/) 

*Front*

- SPA: [Fleekah](http://fleekah.surge.sh)

### Requirements

A modern browser.

A javascript on server envirenement:

- NodeJS
- NPM

Also you're expected to have `wt-cli` (Webtask CLI) installed on your machine in order to be able to run or deploy the server code under `server-proxy` folder, to do so, please run to sollowing command in a command prompt or terminal with root/admin user role:

```batch

$ sudo npm install wt-cli -g

```

### Installation

After cloning this repository, open a comand prompt or terminal, and `cd` into the repository' folder. In both folders: `front` and `server-proxy` run the following command:

```batch
npm install

```

### Run

After the installation step, you can run the project on your machine by executing the following steps for each envirenment

*Server*

1. Fill the `secrets.txt` file with your convinent Flickr API Key and Also Sentry's proper ones.
1. Open a new commands prompt or terminal and `cd` into the `server-proxy` folder
1. Run the following command in your terminal/command prompt:
    ```batch
    $ wt serve cron.js --hostname localhost --port 4000 --secrets-file secrets.txt
    ```
1. Do a GET request to `http://localhost:4000` or just visit that url in your browser, this step is important in order to hydrate the backend with primary data and it's not necessary after deployment to Webtask.io; but still, the photos will be updated with the latest ones on every visite to this url.
1. Open a new commands prompt or terminal and `cd` into the `server-proxy` folder
1. Run the following command in your terminal/command prompt:
    ```batch
    $ wt serve index.js --hostname localhost --port 4001 --secrets-file secrets.txt
    ```

*Front*

1. Open a new commands prompt or terminal and `cd` into the `front` folder
1. Run the following command in your terminal/command prompt:
    ```batch
    $ npm start
    ```

And Voila! the app is running under the link `http://localhost:3000`.

### Deploy

In this section will not go through how to deploy a react app, as there are enough tutorials all over the web, but instead will go for the back-end (proxy) deployment.

To deploy the back-end code, the following steps are required:

1. Create/Login to a Webtask.io account
1. Follow the steps on the page as to create the first time wt-cli setup
1. `cd` to `server-proxy` folder using a commands prompt or terminal
1. Run the following commands
    - To create a cron job for fetching a 100 photos every 1 hour:
    
    ```batch
    $ wt cron create --schedule "0 * * * *" --bundle --name fleekah-cron --secrets-file secrets.txt ./cron.js
    ```
    Then copy the cron url (if not available in the console/terminal you may have to get it from http://webtask.io/make and select your cron to see the url at the bottom of the page).

    - To create  an expressjs back-end webtask to handle everything else:
    
    ```batch
    $ wt create --bundle --name fleekah-back-end --secrets-file secrets.txt ./index.js --meta FLEEKAH_CRON_PROXY_URL="<copied cron url here>/?oprtation=fetch"
    ```
    Please note that `/?operation=fetch` was appended to the cron url, and this is in roder to not refetch images form flickr API.

Links to your back-end structure will be provieded on the terminal/commands prompt upon every command finish.


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
