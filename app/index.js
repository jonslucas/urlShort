(()=>{
    "use strict";
    const express = require('express'),
           routes = require('./routes'),
         mongoose = require('mongoose'),
         mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017',
              app = express();

    mongoose.connect(mongoURI);
    console.log(process.env.MONGOLAB_URI);
    routes(app);

    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

    module.exports = app;

})();