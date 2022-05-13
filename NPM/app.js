const validator = require('validator');
const chalk = require('chalk');

console.log(validator.isEmail('zuhril@gmail.com'));
console.log(validator.isMobilePhone('0882345678', 'id-ID'));
console.log(validator.isNumeric('1234567'));

console.log(chalk.blue('hello world'));
console.log(chalk.bgRed.white('warna saya'));
console.log(chalk.bold.bgGreen.white('ini bold word'));


const nama = 'Zuhril Fahrizal';
const pesan = chalk`is {bgBlue.white.bold simply dummy text} of the printing and {bgRed.black typesetting industry}. Lorem Ipsum has been the. nama saya : ${nama}`;
console.log(pesan);