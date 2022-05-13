const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
    loadContact,
    findContact
} = require('./utils/contacts');
const app = express();
const port = 3000;

// pakai ejs
app.set('view engine', 'ejs');

//third party-middleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static('public'));

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
    const contacts = loadContact();
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
    });
});

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404 File not Found</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});