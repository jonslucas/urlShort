(()=>{
    "use strict";
    const app = require(process.cwd() + '/app');

    const port = process.env.PORT || 3000;
    app.listen(port, ()=>{
        console.log('App listening on port: '+port);
    });

})();