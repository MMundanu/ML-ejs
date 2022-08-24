// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post('/store', productsController.store);


/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put('/update/:id', productsController.update);


/*** DELETE ONE PRODUCT***/
//router.delete('delete/:id', productsController.destroy); 
router.delete("/delete/:id", (req, res) => {
    productsController.destroy(req, res);
});


module.exports = router;
