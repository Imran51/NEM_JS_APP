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
    res.end("Will send All the promotions to you!");
})
.post( (req,res,next) => {
    res.end("Will add the prmotion: " + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403
    res.end("PUT operation is not supported for promotions");
})
.delete((req,res,next) => {
    res.end("Deleting All the available promotions!");
});


router.route('/:promoId')
.get((req,res,next) => {
    res.end('Sending requested promotions: ' + req.params.promoId + ' to you!');
})
.post((req,res,next) => {
    res.statusCode = 403
    res.end("POST feature is not supported for /promotions/:promotionId");
})
.put((req,res,next) => {
    res.write('Updating the promotion: ' + req.params.promoId);
    res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end("Deleting requested promotion: " + req.params.promoId);
});


module.exports = router