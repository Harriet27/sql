const db = require('../database');

module.exports = {
    getProduct : (req,res) => {
        let { limit, orderBy, offset } = req.params;
        let sql = `select * from product order by id ${orderBy} limit ${limit} offset ${offset}`;
        db.query(sql, (err,results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send(results);
        })
    },
    searchProduct : (req,res) => {
        let { name, hargaMin, hargaMax } = req.query;
        let sql = `select * from product where nama like '%${name}%'`;
        if (hargaMin) {
            sql += ` and harga > ${hargaMin}`;
        }
        if (hargaMax) {
            sql += ` and harga < ${hargaMax}`;
        }
        db.query(sql, (err,results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send(results);
        })
    },
    addProduct : (req,res) => {
        // let { nama, harga } = req.body;
        // let sql = `insert into product (nama, harga) values ('${nama}', ${harga})`;
        let sql = `insert into product set ?`;
        // db.query(sql, (err,results) => {
        db.query(sql, req.body, (err,results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            // res.status(200).send(results);
            res.status(200).send({
                results,
                status : 'Created',
                message : 'Data successfully created'
            });
        })
    },
    editProduct : (req,res) => {
        let { harga } = req.body;
        let { id } = req.params;
        let sql = `update product set harga = ${harga} where id = ${id}`;
        db.query(sql, (err,results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send({
                results,
                status : 'Updated',
                message : 'Data successfully updated'
            });
        })
    },
    deleteProduct : (req,res) => {
        let { id } = req.params;
        let sql = `delete from product where id = ${id}`;
        db.query(sql, (err,results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send({
                results,
                status : 'Deleted',
                message : 'Data successfully deleted'
            });
        })
    }
}