const {
    MongoClient,
    ObjectID
} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'z_contact';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// const ObjectId = require('mongodb').ObjectID;

client.connect((error, client) => {
    if (error) {
        return console.log('Koneksi gagal');
    }
    // console.log('koneksi berhasil');
    // pilih db
    const db = client.db(dbName);

    // menambahkan satu data ke collection contact_mahasiswa
    db.collection('contact_mahasiswa').insertOne({
        nama: 'Rizal Dewa',
        email: 'rizal89@gmail.com'
    }, (error, result) => {
        if (error) {
            return console.log('gagal menambahkan data');
        }
        console.log(result);
    });

    // Menambahkan lebih adari satu data
    db.collection('contact_mahasiswa').insertMany(
        [{
                nama: 'Zukruf Kurnia',
                emial: 'ucup23@yahoo.com'
            },
            {
                nama: 'Afif Firmansyah',
                emial: 'firmansyah89@gmail.com'
            }
        ],
        (error, result) => {
            if (error) {
                return console.log('data gagal dimasukkan');
            }
            console.log(result);
        });

    //menampilkan semua data yang ada di collection contact_mahasiswa
    console.log(db.collection('contact_mahasiswa').find().toArray((error, result) => {
        console.log(result);
    }));

    // menampilkan data berdasrakan kriteria
    console.log(
        db.collection('contact_mahasiswa')
        .find({
            _id: ObjectID('627d174fdf4fb40d88667903')
        })
        .toArray((error, result) => {
            console.log(result);
        })
    );

    console.log(
        db.collection('contact_mahasiswa')
        .find({
            nama: 'Umar Faruq'
        })
        .toArray((error, result) => {
            console.log(result);
        })
    );

    // mengubah data berdasrakan id (ngubah satu data)
    const updatePromise = db.collection('contact_mahasiswa').updateOne({
        _id: ObjectID('627d174fdf4fb40d88667903')
    }, {
        $set: {
            email: 'akbar@yahoo.com'
        },
    });

    updatePromise.then(
            (result) => console.log(result))
        .catch((error) => console.log(error));

    // mengubah data lebih dari satu berdasarkan kriteria
    const updateManyPromise = db.collection('contact_mahasiswa').updateMany({
        // nama: 'Ariful Furqon',
        email: 'ariful28@gmail.com',
    }, {
        $set: {
            // nama: 'Fahrizal',
            email: 'fahrizal33@yahoo.com'
        }
    });

    updateManyPromise.then((result) => console.log(result))
        .catch((error) => console.log(error));

    // Menghapus satu data
    db.collection('contact_mahasiswa').deleteOne({
        _id: ObjectID('627d174fdf4fb40d88667903')
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

    // Menghapus lebih dari satu data
    db.collection('contact_mahasiswa').deleteMany({
        nama: 'Umar Faruq'
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });



});