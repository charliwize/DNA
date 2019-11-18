# DNA

## Getting Started

This project holds both the client application and the server application there will one node modules folder handling but cases. First run `npm install` from the root. After this you will run `npm run start` from the root which will launch the project at https://localhost/3001`. From now on run this command anytime you want to install all modules again. This is a script I have defined in package.json .

## File structure
#### `src` - Holds the client application and server connectivity
- #### `client` - Holds client application
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `pages` - Holds pages
    - #### `_app.tsx` - This is what renders all of our browser routes and different views (base component)
 - #### `index.html` - Base HTML file
    - #### `package.json` - Defines npm behaviors and packages for the client
- #### `package.json` - Defines npm behaviors and packages for the client
    #### `server` - Holds the server application
    - #### `config` - This holds our configuration files, like mongoDB uri
    - #### `controllers` - These hold all of the callback functions that each route will call
    - #### `models` - This holds all of our data models
    - #### `routes` - This holds all of our HTTP to URL path associations for each unique url
    - #### `tests` - This holds all of our server tests that we have defined
    - #### `server.js` - Defines npm behaviors and packages for the client
    #### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
    #### `.gitignore` - Tells git which files to ignore
    #### `README` - This file!
