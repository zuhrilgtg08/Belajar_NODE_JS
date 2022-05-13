const yargs = require('yargs');

const {
    saveContact,
    listContact,
    detailContact,
    deleteContact,
} = require('./contacts');

// tambah data contact
yargs.command({
    command: 'add',
    describe: 'Add contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },

        noHp: {
            describe: 'NoHp',
            demandOption: true,
            type: 'string',
        },

        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        saveContact(argv.nama, argv.noHp, argv.email);
    },
}).demandCommand();

// show list daftar nama & noHp contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & noHp contact yang terdaftar',
    handler() {
        listContact()
    }
});

// show details contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact yang sudah terdaftar',
    builder: {
        nama: {
            describe: 'input nama contact yang sudah terdaftar',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.nama);
    }
});

// delete contact yang sudah terdaftar
yargs.command({
    command: 'delete',
    describe: 'Menghapus contact yang sudah terdaftar berdasarkan nama',
    builder: {
        nama: {
            describe: 'input nama contact yang sudah terdaftar',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        deleteContact(argv.nama);
    },
});

yargs.parse();


// const contact = {
//     nama: argv.nama,
//     noHp: argv.noHp,
//     email: argv.email,
// };
// console.log(contact);

// const contacts = require('./contacts');

// const main = async () => {
//     const nama = await contacts.writeQuestions('Masukkan nama anda : ');
//     const noHp = await contacts.writeQuestions('Masukkan noHp anda : ');
//     const email = await contacts.writeQuestions('Masukkan email anda : ');

//     contacts.saveContact(nama, noHp, email);
// };

// main();

// get argumen dari command line
// const command = process.argv[2];
// if(command === 'add'){

// }else if(command === 'remove'){

// }else if(command === 'list'){

// }

// const writeQuestions = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama);
//         });
//     });
// };

// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// const pertanyaan2 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('Masukkan noHp anda : ', (noHp) => {
//             resolve(noHp);
//         });
//     });
// };


// rl.question('Masukkan nama anda : ', (name) => {
//     rl.question('Masukkan nomor Hp anda : ', (noHp) => {
//         const contact = {
//             name,
//             noHp
//         };

//         const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
//         const contacts = JSON.parse(fileBuffer);

//         contacts.push(contact);
//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//         console.log('Data anda berhasil masuk');
//         rl.close();
//     });
// });