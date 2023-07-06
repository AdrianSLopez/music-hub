# Song search
Created by [Adrian Salgado Lopez](https://www.linkedin.com/in/adriansalgadocsula/), new grad 2023, with a bachelor's degree in Computer Science.

[LinkedIn](https://www.linkedin.com/in/adriansalgadocsula/) | [Github](https://github.com/AdrianSLopez) | [Portfolio](https://adrianslopez.github.io/)

Song search, as the name implies, allows the user to search for a song. Powered by Spotify API, on search input you will receive a list of song results. On every song result you are able to
view more information, listen to a preview if available, click on the artists and look at their top 10 songs, click on the album name to see all tracks from that album, as well as be able to recommend 
and share the song to other users on the website.

Purpose for this website? Simply out of fun of learning new things and expanding my skill set.

View the website [here](http://songsearch-byadrian.com/) _mobile style coming soon_

## Development
This website was created with MERN stack!
- [MongoDB](https://www.mongodb.com/) to save songs recommended by users
- [Express.js](https://expressjs.com/) for backend
- [React.js](https://react.dev/) for frontend
- [Node.js](https://nodejs.org/en) for JavaScript runtime environment.


## Getting Started :)
Want to run this website on your computer?

Here are the following steps to be able to do so. (Guide was created with Microsoft OS in mind)

### Setup
#### Tools needed
- [ ] Visual Studio Code
- [ ] Git 
- [ ] Node.js & NPM
- [ ] MongoDB free account
- [ ] Spotify developer account
#### Installation
##### Visual Studio Code
- Install VSC [here](https://code.visualstudio.com/download)
- Guide [here](https://www.geeksforgeeks.org/how-to-install-visual-studio-code-on-windows/)
##### Git
- Download Git Standalone [here](https://git-scm.com/download/win)
- Guide [here](https://phoenixnap.com/kb/how-to-install-git-windows)
##### Node.js & NPM
- Download node.js [here](https://nodejs.org/en)
- Guide [here](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/#)
- NPM should come with node.js, to check type `npm -version` in command prompt to see what version of npm is installed, indicating npm is installed.
##### MongoDB
- Create an account by following this [tutorial](https://www.youtube.com/watch?v=R1XCjP8qgAE) less than half of video guide is fine. UI might look different.
##### Spotify Developer account
- Create an account [here](https://developer.spotify.com/)

### Startup
Open a command prompt and clone a the repository at any location with the following command:

    git clone (repo url)

- to get repo url, click on `Code` in repository main repo and copy the url.

Once repo is installed, open the folder with VSC or any IDE of your choice.

Create the `config.json' file in under `hub-application` folder. This file will contain information to connect to mongoDB and use spotify web API.
The file should follow the following format:
```
    {
        "mongoDBUsername":"xxx",
        "mongoPassword":"xxx",
        "mongoDatabaseName":"xxx",
        "spotifyBaseURL":"https://api.spotify.com/v1",
        "clientID":"xxx",
        "clientSecret":"xxx"
    }
```
Client id and secret can be optained in your spotify developer dashboard > app > settings.

Once this is done, open two command prompts. 

In 1 command prompt `cd`, change directory, to `hub-application/` on the other `cd` to `hub-view`.

On both command prompts run the following command to install packages: `npm install`

_NOTE: Everytime changes are made in `spotify-api/` folder you will need to reinstall packages for `hub-application` to see changes take place._

On `hub-application/` command prompt, start server by running the following command: `node server.js`

On `hub-view` command prompt, start front-end by runnning the following command: `npm run start`

Website should be running locally! ENJOY
