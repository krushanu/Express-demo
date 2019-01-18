const Joi = require('joi');
const express = require('express');
const startupDebugger = require('debug')('app:startup');
const config = require('config');
const logger = require('./middleware/logger');
const courses = require('./router/courses');
const home = require('./router/home');
const morgan = require('morgan');

// const interface = require('./interface');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') === 'development') {
  app.use(morgan('tiny')); // used to log requests
  startupDebugger('Morgan enabled ..');
}
console.log('Application name: ' + config.get('name'));
console.log('mail server: ' + config.get('mail.host'));

app.use(logger);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
