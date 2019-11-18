const express = require('express');
const app = express();
const path = require('path');
const port = 3001
const middleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser')
const cors = require('cors')

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
const subscriptionRoutes = require('./src/DB/routes/subscriptions');
const userRoutes = require('./src/DB/routes/users');


const db = require('./src/DB')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '/')))
app.use(
	middleware(compiler, {
		hot: false,
		noInfo: true,
		publicPath: '/',
	})
);

db.on('error', console.error.bind(console, 'Error in connection'))

app.use(require("webpack-hot-middleware")(compiler));

app.get('/subscription', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
});

app.get('/details', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
});

app.use('/api/subscriptions', jsonParser, subscriptionRoutes);
app.use('/api/users', jsonParser, userRoutes);

app.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}
  console.log(`server is listening on ${port}`)
})


