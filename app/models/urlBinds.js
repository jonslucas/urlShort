(()=>{
    "use strict";
    const mongoose = require('mongoose'),
            Schema = mongoose.Schema;

    const urlBinding = new Schema({
        "destURL": String,
        "shortURL": String
    });

    module.exports = mongoose.model('urlBinding', urlBinding);
})();