const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');

app.use('/static',express.static('public'));

app.get('/',(req,res) => {
    res.render('index',data);
});

app.get('/about',(req,res) => {
    res.render('about');
});

app.get('/project/:id',(req,res) => {
    res.render('project');
});

app.listen(3000, () => {
    console.log('App running on port: "3000"');
});