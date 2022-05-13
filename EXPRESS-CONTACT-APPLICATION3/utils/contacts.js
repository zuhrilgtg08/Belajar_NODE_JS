const {
    constants
} = require('buffer');
const fs = require('fs');

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

// get data contacts.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

// find contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

// menimpa file contacts.json dengan data baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// bikin function addContact baru ke dalam array
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
};

// cek apakah ada nama yang terduplikat
const cekDuplicate = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
}

// delete contact
const deleteContact = (nama) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
    saveContacts(filteredContacts);
}

// mengubah contacts / update contact
const updateContacts = (contactBaru) => {
    const contacts = loadContact();
    // hilangkan contact lama yang namanya sama dengan oldNama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
    delete contactBaru.oldNama;
    filteredContacts.push(contactBaru);
    saveContacts(filteredContacts);
}

module.exports = {
    loadContact,
    findContact,
    addContact,
    cekDuplicate,
    deleteContact,
    updateContacts
};