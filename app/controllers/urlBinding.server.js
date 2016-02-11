(()=>{
    "use strict";
    const Binding = require(process.cwd() + '/app/models/urlBinds'),
        validUrl = require('valid-url');

    function urlBinder()  {

        const search = (field, val)=>{
            let o = {};
            o[field] = val;
            console.log('Searching for: ');
            console.log(o);
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
            const dest = req.params.url;
            console.log(validUrl);
            console.log(validUrl.isWebUri);
            console.log(validUrl.isWebUri(dest));
            console.log(validUrl.isWebUri('http://freecodecamp.com'));
            search('destURL', dest )
                .then(( binding)=>{
                    const baseURL = 'http://fcc-shortie.herokuapp.com/';
                    let b = {};
                    if (binding) {
                        // if binding already exists return data.
                        b = binding;
                        b['shortURL'] = baseURL+binding.shortURL;
                        res.json(b);
                    } else {
                        // no binding for that url already and is valid
                        if (validUrl.isWebUri(dest)){
                            b = add(dest);
                            b['shortURL'] = baseURL+b.shortURL;
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
                console.log('inside the then clause');
                console.log(binding);
                if(binding){ res.redirect(binding.destURL); }
                else { res.json(errorRes); }
            }, (err)=>console.log(err));
        };

    }

    module.exports = urlBinder;
})();