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
    res.end("Will send All the leaders to you!");
})
.post( (req,res,next) => {
    res.end("Will add the leader: " + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403
    res.end("PUT operation is not supported for leader");
})
.delete((req,res,next) => {
    res.end("Deleting All the available leaders!");
});


router.route('/:leaderId')
.get((req,res,next) => {
    res.end('Will send the details of leader: ' + req.params.leaderId + ' to you!');
})
.post((req,res,next) => {
    res.statusCode = 403
    res.end("POST feature is not supported for /leaders/" + req.params.leaderId);
})
.put((req,res,next) => {
    res.write('Updating the leader: ' + req.params.leaderId);
    res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end("Deleting requested leader: " + req.params.leaderId);
});


module.exports = router