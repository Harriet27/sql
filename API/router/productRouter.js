const express = require('express');
const router = express.Router();
const { productController } = require('../controller');
const {
    getProduct,
    searchProduct,
    addProduct,
    editProduct,
    deleteProduct
} = productController;

router.get('/get-product/:orderBy/:limit/:offset', getProduct); // parameter hrs selalu terisi
router.get('/search-product', searchProduct);
router.post('/add-product', addProduct);
router.patch('/edit-product/:id', editProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;