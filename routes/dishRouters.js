const express = require('express');
const parser = require('body-parser');

const router = express.Router();

router.use(parser.json());

router.route('/')
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next()
})
.get((req,res,next) => {
    res.end("Sending All the available dishes to you!");
})
.post( (req,res,next) => {
    res.end("Adding new dishes, dish name: " + req.body.name + ' full description: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403
    res.end("This feature is not supported for dishes");
})
.delete((req,res,next) => {
    res.end("Deleting All the available dishes!");
});


router.route('/:dishId')
.get((req,res,next) => {
    res.end('Sending requested dish: ' + req.params.dishId + ' to you!');
})
.post((req,res,next) => {
    res.statusCode = 403
    res.end("This feature is not supported for /dishes/" + req.params.dishId);
})
.put((req,res,next) => {
    res.write('Updating dish for id: ' + req.params.dishId);
    res.end('Will update the dish name: ' + req.body.name + ' and description: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end("Deleting requested dish for id: " + req.params.dishId + 'from the database');
});


module.exports = router