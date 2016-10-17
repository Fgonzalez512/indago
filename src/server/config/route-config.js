(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const auth = require('../routes/auth');
    const index = require('../routes/index');
    const users = require('../routes/users');
    const places = require('../routes/places');
    const trips = require('../routes/trips');
    const search = require('../routes/search');
    
    // *** register routes *** //
    app.use('/', auth);
    app.use('/', index);
    app.use('/users', users);
    app.use('/places', places);
    app.use('/trips', trips);
    app.use('/search', search);

  };

})(module.exports);
