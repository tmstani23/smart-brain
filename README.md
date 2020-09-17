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

## Installation
1. Clone this repo
2. Run `npm install`
3. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API.
* You can grab Clarifai API key [here](https://www.clarifai.com/)
4. Create a .env file in the server folder with your Postgres database information to connect to local database.
* It should match the process.env variables in the server.js file.
5. Cd server run `npm start`
6. Cd client run `npm start`

* Make sure you use postgreSQL instead of mySQL for this code base.

Type "services.msc" in run popup(windows + R). 
This will show all #services running Select Postgres service from list and click on start/stop/restart.

### This app was created as part of The Complete Junior to Senior course on Udemy
https://www.udemy.com/course/the-complete-junior-to-senior-web-developer-roadmap/
