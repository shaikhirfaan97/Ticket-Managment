const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

router.post('/', async (req, res) => {
  const { sku, quantity, expiry, sellerId } = req.body;
  const listing = new Listing({ sku, quantity, expiry, sellerId });
  await listing.save();
  res.status(201).json(listing);
});

module.exports = router;
