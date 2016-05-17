var router = require('express').Router();
var Poem = require('../models/poem');

router.route('/poems')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var poem = new Poem();      // create a new instance of the Bear model
        poem.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        poem.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Poem created!' });
        });

    })

    .get(function(req, res) {
        Poem.find(function(err, poems) {
            if (err)
                res.send(err);

            res.json(poems);
        });
    });   


router.route('/poems/:poem_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Poem.findById(req.params.poem_id, function(err, poem) {
            if (err)
                res.send(err);
            res.json(poem);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Poem.findById(req.params.poem_id, function(err, poem) {

            if (err)
                res.send(err);

            poem.name = req.body.name;  // update the bears info

            // save the bear
            poem.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Poem updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Poem.remove({
            _id: req.params.poem_id
        }, function(err, poem) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
        
   

    module.exports = router;