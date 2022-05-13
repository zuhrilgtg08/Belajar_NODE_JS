const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// create folder data
const path = './data';
if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}

// create file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

// simpan contact
const saveContact = (nama, noHp, email) => {
    const contact = {
        nama,
        noHp,
        email
    };

    const contacts = loadContact();

    // cek ada duplikat tidak
    const duplicate = contacts.find((contact) => contact.nama === nama);
    if (duplicate) {
        console.log(chalk.bgRed.white.bold('contact sudah terdaftar, gunakan nama lain'));
        return false;
    }

    //cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.bgRed.white.bold('Email anda tidak valid'));
            return false;
        }
    }

    // cek noHp
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.bgRed.white.bold('NoHp anda tidak valid'));
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.bgGreen.bold.white('Data anda berhasil masuk'));
};

// show list contact
const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.bgBlue.bold.white('List nama & noHp contact yang sudah terdaftar : '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    });
}

// detail contact
const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.bgRed.bold.white(`${nama} Tidak ditemukan!`));
        return false;
    }

    console.log(chalk.bgBlue.bold.white(contact.nama));
    console.log(chalk.bgGreen.bold.white(contact.noHp));

    if (contact.email) {
        console.log(chalk.bgBlueBright.white(contact.email));
    }
};

// hapus contact berdasarkan nama
const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContact.length) {
        console.log(chalk.bgRed.bold.white(`${nama} Tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));
    console.log(chalk.bgGreen.bold.white(`data contact ${nama} berhasil di hapus`));
};

module.exports = {
    saveContact,
    listContact,
    detailContact,
    deleteContact,
};