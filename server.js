const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const app = express();

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", ".hbs");
//app.set('views', './views');

app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    // defaultLayout: 'page2',
    // layoutsDir: "views/layouts/",
  })
);
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://thaitqph27970:9WYpni3DM6yjxkle@cluster0.gougcmm.mongodb.net/thaitqph27970?retryWrites=true&w=majority";
const SinhVienModel = require("./sinhVienModel");

app.get("/", async (req, res) => {
  await mongoose.connect(uri);
  console.log("Ket noi DB thanh cong");

  let arrSv = await SinhVienModel.find();

  for (let i = 0; i < arrSv.length; i++) {
    let sv = arrSv[i];
    console.log(`Sinh vien thu ${i + 1}:`);
    console.log(`tenSV: ${sv.name}, tuoi: ${sv.tuoi}`);
  }
  const newListsp = arrSv.map((item) => item.toObject());
  res.render("home", {
    layout: "main",
    list: newListsp,
  });
});

app.post("/", async (req, res) => {
  await mongoose.connect(uri);
  console.log("Ket noi DB thanh cong");
  const sv = req.body;
  console.log(sv.masv);
  if (sv.masv != null) {
    if (sv.isadd == 1) {
      const items = new SinhVienModel(sv);
      try {
        console.log("thêm");
        console.log(items);
        await items.save();
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      try {
        let sv = await SinhVienModel.updateOne(sv.masv, sv);
        console.log(sv);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  }

  let arrSv = await SinhVienModel.find();

  const newListsp = arrSv.map((item) => item.toObject());
  res.render("home", {
    layout: "main",
    list: newListsp,
  });
});

// app.get("/update_sv", async (request, response) => {
//   await mongoose.connect(uri).then(console.log("Ket noi DB thanh cong."));

//   try {
//     var kq = await svModel.updateOne(
//       { name: "Nguyễn Văn A" },
//       { name: "Nguyễn Văn B", tuoi: 25 }
//     );

//     console.log(kq);

//     //await sv.save();
//     response.send(kq);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });
app.get("/xoa/:masv", async (req, res) => {
  await mongoose.connect(uri).then(console.log("Ket noi DB thanh cong."));
  try {
    let kq = await SinhVienModel.findOneAndRemove({ masv: req.params.masv });
    console.log(kq);
  } catch (error) {
    res.status(500).send(error);
  }
  const newListsp = arrSv.map((item) => item.toObject());
  res.render("home", {
    layout: "main",
    list: newListsp,
  });
});
// app.get("/xoa_sv", async (request, response) => {
//   await mongoose.connect(uri).then(console.log("Ket noi DB thanh cong."));

//   try {
//     var kq = await svModel.findOneAndRemove({ name: "Nguyễn Văn A" });

//     console.log(kq);

//     //await sv.save();
//     response.send(kq);
//   } catch (error) {
//     response.status(500).send(error);
//     }

// });

// app.get("/add_sv", async (request, response) => {

//     await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

//     let sv = new svModel({
//         name: 'Nguyễn văn B',
//         tuoi: 22
//     });

//     sv.diachi = 'BG';

//     try {
//         console.log(sv);
//         await sv.save();
//         response.send(sv);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });
// app.post("/add", async (req, res) => {
//   await mongoose.connect(uri).then(console.log("Kết nối thành công"));
//   const sv = new svModel(req.body);
//   try {
//     console.log(sv);
//     await sv.save();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.get("/formAdd", (req, res) => {
  res.render("home", {
    layout: "AddOrEdit",
    title: "Thêm Mới",
    isAdd: 1,
  });
});
app.get("/edit/:masv", async (req, res) => {
  await mongoose.connect(uri).then(console.log("kết nôi thành công"));
  let svedit = await SinhVienModel.find({ masv: req.params.masv });
  let sv = new SinhVienModel(svedit);
  console.log(svedit.masv);
  res.render("home", {
    title: "Edit sinh viên",
    layout: "AddOrEdit",
    sv: svedit,
    isAdd: 0,
  });
});

app.listen(3000);
