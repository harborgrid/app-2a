const config = require('./config');         //
const express = require('express');         //
const bodyParser = require('body-parser');  //
const app = express();                      //
const port = process.env.PORT || 1337;      //

// load services
const services = require('./services');

// load routes
const routes = require('./routes');

// load middlewares
const middlewares = require('./middlewares');

// load controllers
const controllers = require('./controllers');

// load models
const models = require('./models');

// load utilities
const utilities = require('./utilities');

// load engines
const engines = require('./engines');   

// load components
const components = require('./components');