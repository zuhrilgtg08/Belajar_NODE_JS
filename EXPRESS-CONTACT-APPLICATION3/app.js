const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
    loadContact,
    findContact,
    addContact,
    cekDuplicate,
    deleteContact,
    updateContacts
} = require('./utils/contacts');
const {
    body,
    validationResult,
    check
} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const port = 3000;

// pakai ejs
app.set('view engine', 'ejs');

//third party-middleware
app.use(expressLayouts);

// built-in middleware
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

// halaman home
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

// halaman about
app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layout',
    });
});

// route ke halaman contact
app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    });
});

// halaman form data-contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form tambah data contact',
        layout: 'layouts/main-layout',
    });
});

// create data contact
app.post('/contact', [
        body('nama').custom((value) => {
            const duplicate = cekDuplicate(value);
            if (duplicate) {
                throw new Error('Nama contact sudah terdaftar!');
            }
            return true;
        }),
        check('email', 'Email yang anda inputkan tidak Valid!').isEmail(),
        check('noHp', 'Nomor hanphone yang Anda masukkan tidak Valid!').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('add-contact', {
                title: 'Form Tambah Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array()
            });
        } else {
            addContact(req.body);
            // send msg flash nya dulu sebelum tampil halamanya
            req.flash('msg', 'Data Contact Berhasil Ditambahkan');
            res.redirect('/contact');
        }
    });

// process delete contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    // jika contact tidak ada
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        deleteContact(req.params.nama);
        req.flash('msg', 'Data Contact Berhasil Dihapus!');
        res.redirect('/contact');
    }
});

// route edit contact & form edit contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('edit-contact', {
        title: 'Form Ubah Data Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

// process update form data contact
app.post('/contact/update', [
        body('nama').custom((value, {req}) => {
            const duplicate = cekDuplicate(value);
            if (value !== req.body.oldNama && duplicate) {
                throw new Error('Nama contact sudah terdaftar!');
            }
            return true;
        }),
        check('email', 'Email yang anda inputkan tidak Valid!').isEmail(),
        check('noHp', 'Nomor hanphone yang Anda masukkan tidak Valid!').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('edit-contact', {
                title: 'Form Ubah Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body,
            });
        } else {
            updateContacts(req.body);
            // send msg flash nya dulu sebelum tampil halamanya
            req.flash('msg', 'Data Contact Berhasil Diupdate!');
            res.redirect('/contact');
        }
    });

// route detail berdasarkan nama
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