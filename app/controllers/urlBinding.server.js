(()=>{
    "use strict";
    const Binding = require(process.cwd() + '/app/models/urlBinds'),
        validUrl = require('valid-url');

    function urlBinder()  {

        const search = (field, val)=>{
            let o = {};
            o[field] = val;
            return Binding.findOne(o, 'destURL shortURL');
        },
             randStr = ()=>{
                 const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                 let out = [],
                       i = 0;
                 for(i; i<5; i++){
                     out.push(s.charAt(Math.floor(Math.random() * 61)));
                 }
                 return out.join('');
             },
                 add = (dURL)=>{
                   const sURL = randStr();
                   const urlBound = new Binding({
                       'destURL':dURL,
                       'shortURL':sURL
                   });
                   urlBound.save((err)=>{
                       if (err) console.log(err);
                   });
                   return urlBound;
               },
            errorRes = {'error': 'No short url found for given input'};
        this.findDest = (req, res)=>{
            // take the url string and omit the first 6 chars -> /bind/
            const dest = req.url.slice(6);
            search('destURL', dest )
                .then(( binding)=>{
                    const baseURL = 'http://fcc-shortie.herokuapp.com/';
                    let b = {};
                    if (binding) {
                        // if binding already exists return data.
                        b['destURL'] = binding.destURL;
                        b['shortURL'] = baseURL+binding.shortURL;
                        res.json(b);
                    } else {
                        // no binding for that url already and is valid
                        if (validUrl.isWebUri(dest)){
                            const bound = add(dest);
                            b['destURL'] = bound.destURL;
                            b['shortURL'] = baseURL+bound.shortURL;
                            res.json(b);
                        } else {
                            //if invalid
                            res.json(errorRes);
                        }

                    }
                }, (err)=>console.log(err));
        };
        this.findShort = (req, res)=>{
            search('shortURL', req.params.shortURL)
            .then((binding)=>{
                if(binding){ res.redirect(binding.destURL); }
                else { res.json(errorRes); }
            }, (err)=>console.log(err));
        };

    }

    module.exports = urlBinder;
})();