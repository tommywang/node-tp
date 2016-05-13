var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');

var db = mongoose.connection;

var ejs = require('ejs');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
    
//Create Model
var category = mongoose.Schema({
    name: String,
    createdAt: Date,
    updatedAt: Date
});

var Category = mongoose.model('Category', category);
mongoose.connect('mongodb://localhost/node-tp');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongodb connection success');
});
app.use('/vendors', express.static(__dirname + '/../public/vendors'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static('public'));
app.use(express.static(__dirname + '/../public'));

app.get('/api/categories', function (req, res) {
    Category.find({}, function (err, categories) {
        console.log(categories);
        res.json({
            count: categories.length,
            elements: categories
        });
    });
});


app.get('/login', function(req, res){
    res.render('login');
});

app.post('/api/categories', function (req, res) {
    var category = req.body;
    category.createdAt = category.updatedAt = new Date();
    Category.create(category, function (err, category) {
        if (err) {
            next(err);
        } else {
            console.log(category);
            res.json(category);
        }
    });
});

app.get('/api/categories/:id', function (req, res) {
    res.send('category');
});

app.put('/api/categories/:id', function (req, res) {
    res.send('category');
});

app.delete('/api/categories/:id', function (req, res) {
    res.send('category');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});