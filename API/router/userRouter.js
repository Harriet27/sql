const express = require('express');
const router = express.Router();
const { userController } = require('../controller/index');
const {
    getAllUsers,
    getUserById,
    searchByUsername,
    searchByRole,
    login,
    getProduct,
    LoginSql,
    RegisterSql
} = userController;

router.get('/getUsers', getAllUsers);
router.get('/getById/:id', getUserById);
router.get('/search-username', searchByUsername);
router.get('/search-role', searchByRole);
router.get('/login', login);
router.get('/get-product', getProduct);
router.post('/login-sql', LoginSql);
router.post('/register-sql', RegisterSql);

module.exports = router;