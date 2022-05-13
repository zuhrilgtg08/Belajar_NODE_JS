// core modules
// file system
const fs = require('fs');

// menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync('data/text.txt', 'hello dunia secara synchronous!');
// } catch (error) {
//     console.log(error);
// }

// menuliskan string ke file asynchronous
// fs.writeFile('data/text.txt', 'hai apa kabar dunia secara asynchronous', (err) => {
//     console.log(err);
// })

// membaca isi file synchronous
// const data = fs.readFileSync('data/text.txt', 'utf-8');
// console.log(data);

// membaca isi file asynchronous
// fs.readFile('data/text.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// readline 
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama Anda : ', (name) => {
    rl.question('Masukkan nomor hp Anda : ', (no) => {
        const contact = {
            name: name,
            no: no,
        };
        const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(fileBuffer);

        contacts.push(contact);
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log('Thank you telah mengiputkan data!');
        rl.close();
    });
});