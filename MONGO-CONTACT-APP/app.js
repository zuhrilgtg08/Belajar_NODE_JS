const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('./utils/db');
const Contact = require('./model/contact');
const app = express();
const port = 3000;

// setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

// config flash msg
app.use(cookieParser('scret'));
app.use(
    session({
        cookie: {
            maxAge: 6000,
        },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// Halaman Home
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

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layout',
    });
});

// Halaman Contact
app.get('/contact', async (req, res) => {

    // Contact.find().then((contact) => {
    //     res.send(contact);
    // });

    const contacts = await Contact.find();
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    });
});

// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});
































app.listen(port, () => {
    console.log(`Mongo Contact App | listening of http://localhost:${port}`);
});