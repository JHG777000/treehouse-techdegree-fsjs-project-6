/************************************************
Treehouse Techdegree:
FSJS project 6 - Portfolio for Previous Projects
************************************************/

const express = require('express');
const data = require('./data.json');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.use('/static',express.static('public'));

app.get('/',(req,res) => {
    res.render('index',data);
});

app.get('/about',(req,res) => {
    res.render('about');
});

app.get('/project/:id',(req,res,next) => {
    if ( req.params.id >= data.projects.length 
        || req.params.id < 0 
        || !Number.isInteger(parseInt(req.params.id))) {
        const err =  new Error('No project with that id exists.');
        err.status = 500;
        console.log(err.status + ': No project with that id exists.');
        return next(err);
    }
    res.render('project',{
        project: data.projects[req.params.id]
    });
});

app.use((req,res,next) => {
    const err =  new Error('The page you requested, can not be found.');
    err.status = 404;
    console.log(err.status + ': The page you requested, can not be found.');
    next(err);
});

app.use((err,req,res,next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(port, () => {
    console.log('App running on port: "' + port + '"');
});