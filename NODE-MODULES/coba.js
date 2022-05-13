function cetakNama(nama) {
    return `halo nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama: 'Maulana Davin',
    umur: 18,
    cetakMhs() {
        return `halo nama saya ${this.nama}, saya ${this.umur} tahun`;
    },
};

class Orang {
    constructor() {
        console.log('Object orang has been create');
    }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

module.exports = {
    cetakNama: cetakNama,
    PI: PI,
    mahasiswa: mahasiswa,
    Orang: Orang,
};