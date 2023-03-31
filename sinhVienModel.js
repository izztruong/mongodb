const mongoose = require('mongoose');

const SinhVienSchema = new mongoose.Schema ({
    name: {
        type: String,
    },
    lop: {
        type: String,
    },
    diemTB: {
        type: Number
    },
    diachi: {
        type: String
    },
    tuoi: {
        type: Number
    }

});

const SinhVienModel = new mongoose.model('sinhvien', SinhVienSchema);

module.exports = SinhVienModel;