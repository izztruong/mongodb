const express = require('express')
const bodyParser= require('body-parser')
const expressHbs = require('express-handlebars');
const app = express();

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', '.hbs');
//app.set('views', './views');

app.engine('.hbs', expressHbs.engine({
    extname: "hbs",
    // defaultLayout: 'page2',
    // layoutsDir: "views/layouts/",
}));
const mongoose = require('mongoose');

const uri = 'mongodb+srv://thaitqph27970:9WYpni3DM6yjxkle@cluster0.gougcmm.mongodb.net/thaitqph27970?retryWrites=true&w=majority';
const SinhVienModel = require('./sinhVienModel');

app.get('/', async (req, res) => {
    await mongoose.connect(uri);
    console.log('Ket noi DB thanh cong');

    let arrSv = await SinhVienModel.find();

    for (let i=0; i< arrSv.length; i++) {
        let sv = arrSv[i];
        console.log(`Sinh vien thu ${i + 1}:`);
        console.log(`tenSV: ${sv.name}, tuoi: ${sv.tuoi}`)
    }
    const newListsp = arrSv.map(item => item.toObject()
           
        )
    res.render('home', {
        layout:'main',
        list: newListsp
    })
})


app.listen(3000);