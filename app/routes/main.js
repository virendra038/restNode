var router = require('express').Router();



router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/msg', function(req, res) {
    res.json({ message: 'hooray! welcome to our first api!' });   
});

module.exports = router;