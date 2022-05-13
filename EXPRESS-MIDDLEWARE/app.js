const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// pakai ejs
app.set('view engine', 'ejs');

//third party-middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// application llevel middleware
app.use((req, res, next) => {
    console.log('Time', Date.now());
    next();
});

// built-in middleware
app.use(express.static('public'));

// app.use((req, res, next) => {
//     console.log('ini middleware ke 2');
//     next();
// });

// root
// route
app.get('/', (req, res) => {
    const mahasiswa = [{
            nama: 'Ahmad Zuhril',
            email: 'zuhril23@gmail.com',
        },
        {
            nama: 'Ariful Furqon',
            email: 'riful22@gmail.com',
        },
        {
            nama: 'Abu Bakar',
            email: 'abubasmalah21@gmail.com',
        }
    ];


    res.render('index', {
        nama: 'Ahmad Zuhril',
        title: 'Halaman Home',
        mahasiswa,
        layout: 'layouts/main-layout',
    });
});

app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layout',
    });
    // next();
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
    });
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404 File not Found</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});