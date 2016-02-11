(()=>{
    "use strict";

    const urlBinder = require(process.cwd() + '/app/controllers/urlBinding.server'),
             Binder = new urlBinder();
    module.exports = (app)=>{
        app.route('/')
            .get((req, res)=>{
                res.sendFile(process.cwd() + '/public/html/index.html');
            });
        app.route('/:shortURL')
            .get(Binder.findShort);
        app.route('/bind/:url')
            .get(Binder.findDest);
    };
})();