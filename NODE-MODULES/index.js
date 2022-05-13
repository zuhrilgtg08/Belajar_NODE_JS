// const fs = require('fs'); //core module
// const cetakNama = require('./coba'); //local module
// const moment = require('moment'); //third party module / npm module / node_modules

const coba = require('./coba');
// console.log(coba);
console.log(
    coba.cetakNama('Ahmad Zuhril'),
    coba.PI,
    coba.mahasiswa.cetakMhs(),
    new coba.Orang
);