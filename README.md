# smart-brain
 
A simple React fullstack app that allows a user to detect faces in an image.

## Features
* Login
* Register
* Input image
* Profile
* Detect Faces

## Tech used
* CSS Animations
* React
* Node
* Clairify Api
* Express
* PostgresSQL
* Docker
* Serverless
* Tachyons
* Redis

## Installation
1. Clone this repo
2. Run `npm install`
3. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API.
* You can grab Clarifai API key [here](https://www.clarifai.com/)
4. Create a .env file in the server folder with your Postgres database information to connect to local database.
* It should match the process.env variables in the server.js file.
5. Cd server run `docker-compose up --build` to start the docker container
6. Cd client in a new terminal and type `npm start`

* Note because this app is using docker you will not need to install dependencies they will be handled during container build.  But you will need to make sure you have the latest version of docker installed and running as a service *

Type "services.msc" in run popup(windows + R). 
This will show all #services running Select Docker service from list and click on start/stop/restart.  Or run from the docker.exe

### This app was created as part of The Complete Junior to Senior course on Udemy
https://www.udemy.com/course/the-complete-junior-to-senior-web-developer-roadmap/

