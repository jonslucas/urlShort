(()=>{
    "use strict";
    const express = require('express'),
           routes = require('./routes'),
              app = express();
    routes(app);

    app.use('/public', express.static(process.cwd() + '/public'));

    module.exports = app;

})();