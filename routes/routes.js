const express = require('express');
const router = express.Router();
const { validateParams } = require('../utils/utils');
const { db } = require('../db/db')
const { products, inventory, images, weights, variants } = db

router.get('/products', (req, res) => {
  if (!req.params) res.status(404).send('products not found');
  res.status(200).send({products: products});
});

router.get('/product/:id', (req, res) => {
  if (!validateParams(req.params.id)) res.status(400).send('Invalid ID Supplied')
  else {
    const product = products.find(p => p.code === req.params.id)
    console.log(products.find(p => p.code === req.params.id))
    if (!product) res.status(404).send('product not found');
    res.status(200).send(product);
  }
});

router.get('/store/inventory', (req, res) => {
  res.status(200).send(inventory);
});

module.exports = router