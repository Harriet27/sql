const express = require('express');
const app = express();
const port = 2000;
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser());

let data = [
    {
        id : 1,
        nama : 'apel',
        harga : 10000
    },
    {
        id : 2,
        nama : 'jeruk',
        harga : 20000
    },
    {
        id : 1,
        nama : 'mangga',
        harga : 30000
    }
]

app.get('/testing', (req,res) => {
    let newData = data;
    if (req.query.nama) {
        newData = newData.filter((val) => val.nama.includes(req.query.nama.toLowerCase()));
    }
    if (req.query.hargaMin) {
        newData = newData.filter((val) => val.harga >= req.query.hargaMin);
    }
    if (req.query.hargaMax) {
        newData = newData.filter((val) => val.harga <= req.query.hargaMax);
    }
    res.status(200).send(newData);
});

app.get('/params/:id', (req,res) => {
    console.log(typeof(req.params.id));
    let dataId = data.find((val) => val.id === parseInt(req.params.id));
    res.status(200).send(dataId);
});

app.post('/add-product', (req,res) => {
    console.log(req.body);
    data.push(req.body);
    console.log(data);
    res.status(200).send(data);
});

app.post('/try', (req,res) => {
    let { nama, usia, pekerjaan } = req.body;
    try {
        fs.writeFileSync('invoice.txt', `Nama saya ${nama}\nUsia saya ${usia} tahun\nPekerjaan saya sebagai ${pekerjaan}`);
        let data = fs.readFileSync('invoice.txt', 'utf8');
        res.status(200).send(data);
    } catch(err) {
        fs.unlinkSync('invoice.txt');
        res.status(500).send(err.message);
    }
})

const {
    userRouter,
    productRouter,
    cartRouter
} = require('./router');
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

app.listen(port, () => console.log(`API active at port ${port}`));