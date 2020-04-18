const db = require('../database');

let data = [
    {
        id : 1,
        username : 'lian',
        password : '123',
        role  : 'user'
    },
    {
        id : 2,
        username : 'admin',
        password : 'admin',
        role : 'admin'
    }
]

module.exports = {
    getAllUsers : (req,res) => {
        res.status(200).send(data);
    },
    getUserById : (req,res) => {
        let byId = data.find((val) => val.id === parseInt(req.params.id));
        console.log(byId);
        if (byId) {
            res.status(200).send(byId);
        } else {
            res.status(404).send('No ID Found');
        }
    },
    searchByUsername : (req,res) => {
        let username = req.query.username;
        let searchUser = data.filter((val) => val.username.includes(username));
        console.log(searchUser)
        if (searchUser.length > 0) {
            res.status(200).send(searchUser);
        } else {
            res.status(404).send('No Username Found');
        }
    },
    login : (req,res) => {
        let { username, password } = req.body;
        let user = data.find((val) => val.username === username & val.password === password);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('Not Found');
        }
    },
    searchByRole : (req,res) => {
        let role = data.filter((val) => val.role === req.query.role);
        if (role) {
            res.status(200).send(role);
        } else {
            res.status(404).send('No Role Found');
        }
    },
    getProduct : (req,res) => {
        let sql = `select * from product`;
        db.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send(results);
        })
    },
    LoginSql : (req,res) => {
        let { username, password } = req.body;
        let sql = `select * from users where username = '${username}' and password ='${password}'`;
        db.query(sql, (err,results) => {
            if (err) {
                res.status(404).send(err.message);
            }
            if (results.length !== 0) {
                res.status(200).send({
                    status : 'Logged In',
                    message : 'Login successful'
                });
            } else {
                res.status(404).send({
                    status : 'Not Found',
                    message : 'User Not Found'
                });
            }
        })
    },
    RegisterSql : (req,res) => {
        // let { username, password } = req.body;
        // let sql = `insert into users (username, password) values ('${username}', '${password}')`;
        // db.query(sql, (err,results) => {
        //     if (err) {
        //         res.status(404).send(err.message);
        //     }
        //     if (results.length !== 0) {
        //         res.status(200).send({
        //             status : 'Registered',
        //             message : 'Register Successfully'
        //         });
        //     } else {
        //         res.status(404).send({
        //             status : 'Register Fail',
        //             message : 'Both input box must be filled!'
        //         });
        //     }
        // })
        let { username } = req.body;
        let sql = `select * from users where username = '${username}'`;
        db.query(sql, (err,get) => {
            if (err) {
                res.status(500).send(err.message);
            }
            if (get.length !== 0) {
                res.status(200).send({
                    status : 'Failed',
                    message : 'Username Already Taken'
                });
            } else {
                let sql = `insert into users set ?`;
                db.query(sql, req.body, (err,insert) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
                    // res.status(200).send(insert);
                    let sql = `select * from users where id = ${insert.insertId}`;
                    db.query(sql, (err,results) => {
                        if (err) {
                            res.status(500).send(err.message);
                        }
                        res.status(200).send(results[0]);
                        
                    })
                })
            }
        })
    }
}