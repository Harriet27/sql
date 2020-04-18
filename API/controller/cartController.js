const db = require('../database');

module.exports = {
    getCart : (req,res) => {
        let sql = `select 
            u.username, 
            p.nama, 
            p.harga, 
            c.qty, 
            c.qty * p.harga as total
        from cart c
        join product p on p.id = c.productId
        join users u on u.id = c.userId
        where u.id = ${req.params.id}`;
        db.query(sql, (err,results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send(results);
        })
    },
    addCart : (req,res) => {
        let { productId, qty, userId } = req.body;
        let sql = `insert into cart (productId, qty, userId) values ('${productId}', '${qty}', '${userId}')`;
        db.query(sql, (err,results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send({
                results,
                status : 'Data successfully added to cart'
            });
        })
    },
    editCart : (req,res) => {
        let { productId, qty, userId } = req.body;
        let { id } = req.params;
        let sql = `update cart set productId = ${productId}, qty = ${qty}, userId = ${userId} where id = ${id}`;
        db.query(sql, (err,edited) => {
            if (err) {
                res.status(500).send(err.message);
            }
            console.log(edited);
            let sql = `select * from cart where id = ${id}`;
            db.query(sql, (err,results) => {
                if (err) {
                    res.status(500).send(err.message);
                }
                res.status(200).send(results[0]);
            })
        })
    },
    deleteCart : (req,res) => {
        let sql = `delete from cart where id = ${req.params.id}`;
        db.query(sql, (err,results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send({
                status : 'Deleted',
                message : 'Data successfully deleted'
            });
        })
    }
}