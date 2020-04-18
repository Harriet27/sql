const express = require('express');
const router = express.Router();
const { cartController } = require('../controller');
const {
    getCart,
    addCart,
    editCart,
    deleteCart
} = cartController;

router.get('/get-cart/:id', getCart);
router.post('/add-cart/', addCart);
router.patch('/edit-cart/:id', editCart);
router.delete('/delete-cart/:id', deleteCart);

module.exports = router;