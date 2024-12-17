const express = require('express');//It is a node js framework
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('script'));

app.get('/',(req,res)=>{
    res.render("index");
});

app.get('/lineAlgorithm', (req, res) => {
    res.render("line");
});

app.get('/circleAlgorithm', (req,res) => {
    res.render("circle");
});


const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port: 127.0.0.1:${port}`);
});