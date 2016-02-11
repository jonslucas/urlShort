(()=>{
    "use strict";
    const Binding = require(process.cwd() + '/app/models/urlBinds');
    class urlBinder  {

        _search(field, val){
            let o = {};
            o[field] = val;
            return Binding.findOne(o, 'destURL shortURL');
        },
        findDest(req, res){

        },
        findShort(req, res){
            this._search('shortURL', req.shortURL)
            .then((err, binding)=>{
                res.redirect(binding.destURL);
            })
        }

    }

    module.exports = urlBinder;
})();