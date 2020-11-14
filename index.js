const express = require('express');
const http = require('http');
const logger = require('morgan');
const parser = require('body-parser');

const dishRouter = require('./routes/dishRouters');
const promotionRouter = require('./routes/promotionRouter');
const leaderRouter = require('./routes/leaderRouter');
const hostName = 'localhost';
const port = 3000;

const app = express();
app.use(logger('dev'));
app.use(parser.json());

app.use('/dishes',dishRouter);
app.use('/promotions',promotionRouter);
app.use('/leaders',leaderRouter);
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