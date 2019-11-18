# DNA

## Getting Started

This project holds both the client application and the server application with one node_modules folder handling but cases. First run `npm install` from the root. Run this command anytime you want to install all modules again. After this you will run `npm run start` from the root which will launch the project at `localhost:3001`. This is a script I have defined in package.json .

I am hosting the MongoDB database at mLab (https://mlab.com/)
## File structure
#### `src` - Holds the client application and server connectivity
- #### `client` - Holds client application
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `pages` - Holds pages
    - #### `_app.tsx` - This renders all of the browser routes and different views (base component)
 - #### `index.html` - Base HTML file
#### `package.json` - Defines npm behaviors and packages for the client
- #### `DB` - Holds the server application
    - #### `index.js` - This holds the configuration file for mongoose connectivity
    - #### `controllers` - These hold all of the callback functions that each route will call
    - #### `models` - This holds all of our data models
    - #### `routes` - This holds all of our HTTP to URL path associations for each unique url
#### `server.js` - Contains server side routing
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

## Technologies
React, NodeJS, Express, Mongoose, Webpack, Babel
