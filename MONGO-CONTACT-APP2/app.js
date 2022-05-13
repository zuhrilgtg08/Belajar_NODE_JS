const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
    body,
    validationResult,
    check
} = require('express-validator');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('./utils/db');
const Contact = require('./model/contact');
const app = express();
const port = 3000;

// setup method-override
app.use(methodOverride('_method'));

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
    const contacts = await Contact.find();
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    });
});

// tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form tambah data contact',
        layout: 'layouts/main-layout',
    });
});

// process create data contact
app.post('/contact', [
        body('nama').custom(async (value) => {
            const duplicate = await Contact.findOne({
                nama: value
            });
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
            Contact.insertMany(req.body, (error, result) => {
                req.flash('msg', 'Data Contact Berhasil Ditambahkan');
                res.redirect('/contact');
            });
        }
    });

// process delete contact
app.delete('/contact', (req, res) => {
    Contact.deleteOne({nama: req.body.nama}).then((result) => {
        req.flash('msg', 'Data Contact Berhasil Dihapus!');
        res.redirect('/contact');
    });
});

// Halaman form edit data contact
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
    res.render('edit-contact', {
        title: 'Form Ubah Data Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

// process edit data contact
app.put('/contact', [
        body('nama').custom(async (value, {req}) => {
            const duplicate = await Contact.findOne({nama: value});
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
            Contact.updateOne({_id: req.body._id},
                {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        noHp: req.body.noHp,
                    },
                }).then((result) => {
                    req.flash('msg', 'Data Contact Berhasil Diupdate!');
                    res.redirect('/contact');
                });
        }
    });

// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({
        nama: req.params.nama
    });
    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.listen(port, () => {
    console.log(`Mongo Contact App | listening of http://localhost:${port}`);
});

// history
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({nama: req.params.nama});

//     // jika contact tidak ada
//     if (!contact) {
//         res.status(404);
//         res.send('<h1>404</h1>');
//     } else {
//         Contact.deleteOne({_id: contact._id}).then((result)=> {
//             req.flash('msg', 'Data Contact Berhasil Dihapus!');
//             res.redirect('/contact');
//         });
//     }
// });