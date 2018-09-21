require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
var FlightStatsAPI = require( 'flightstats' )

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/iron-taxi', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// const index = require('./routes/index');
// app.use('/', index);

// const auth = require('./routes/authentification')
// app.use('/', auth)

var api = new FlightStatsAPI({
  appId: process.env.FLIGHTSTATS_APP_ID,
  apiKey: process.env.FLIGHTSTATS_API_KEY,
  userAgent: 'FlightBot',
})


//----------ALL AIRLINES----------------
/*
app.get('/', (req, res, next) => {
  var options = {
    all: true,
    date: new Date(),
    //see https://github.com/jhermsmeier/node-flightstats for all options
  }
  api.getAirlines(options, (err, flights) => {
   let data = {
     flightsList: flights
   } //other options possible such as api.lookup
   console.log(data);
   res.render("index.hbs", data);
  })
});
*/
//----------FIN ALL AIRLINES----------------

//----------VOL LOOKUP----------------
app.get('/', (req, res, next) => {
  var options = {
    date: new Date(),
    airlineCode: 'AA',
    flightNumber: '200',
    //airport: {String}, // optional
    //direction: {String}, // optional, defaults to `arriving`
    //extendedOptions: {Array}, // optional
    }
    
  api.lookup(options, (err, flights) => {
   let data = {
     flightsList: flights
   } //other options possible such as api.lookup
   console.log(options.date);
   console.log(data.flightsList);
   // Regarde le résultat dans ta console !!!
   // Je pense qu'on peut récupérer tout, genre status L = landed et dans arrival et departure doit y avoir les gates mais j'arrive pas à accéder au niveau inférieur
   res.render("index.hbs", data);
  })
});
//----------VOL LOOKUP----------------

app.get('/reservation', (req, res, next) => {
  res.render('reservation');
});

module.exports = app;

