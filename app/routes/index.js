(()=>{
    "use strict";

    module.exports = (app)=>{
        app.route('/')
            .get((req, res)=>{
                res.sendFile(process.cwd() + '/public/html/index.html');
            })
    };
})();