const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/z_contact', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



// Menambah satu data
// const contact1 = new Contact({
//     nama: 'Abu Bakar Basmalah',
//     noHp: '081264327541',
//     email: 'abubasmalah31@gmail.com',
// });

// // simpan ke collection
// contact1.save().then((result) => console.log(result));