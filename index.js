const express = require('express');
const http = require('http');
const logger = require('morgan');
const parser = require('body-parser');

const hostName = 'localhost';
const port = 3000;

const app = express();
app.use(logger('dev'));
app.use(parser.json());

app.all('/dishes', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next()
});

app.get('/dishes', (req,res,next) => {
    res.end("Sending All the available dishes to you!");
});

app.post('/dishes', (req,res,next) => {
    res.end("Adding new dishes, dish name: " + req.body.name + ' full description: ' + req.body.description);
});

app.put('/dishes', (req,res,next) => {
    res.statusCode = 403
    res.end("This feature is not supported for dishes");
});

app.delete('/dishes', (req,res,next) => {
    res.end("Deleting All the available dishes!");
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Sending requested dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403
    res.end("This feature is not supported for /dishes/" + req.params.dishId);
});

app.put('/dishes/:dishId', (req,res,next) => {
    res.write('Updating dish for id: ' + req.params.dishId);
    res.end('Will update the dish name: ' + req.body.name + ' and description: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req,res,next) => {
    res.end("Deleting requested dish for id: " + req.params.dishId + 'from the database');
});

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Hello, This is Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostName, () => {
    console.log(`Server running at http://${hostName}:${port}`);
});