const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Listing = require('../models/Listing');
const Reservation = require('../models/Reservation');

router.post('/', async (req, res) => {
  try {
    const { listingId, quantity, buyerId } = req.body;

    const listing = await Listing.findOneAndUpdate(
      {
        _id: listingId,
        expiry: { $gt: new Date() },
        $expr: { $lte: [{ $add: ['$reserved', quantity] }, '$quantity'] }
      },
      { $inc: { reserved: quantity } },
      { new: true }
    );

    if (!listing) return res.status(400).send('Insufficient stock or listing expired');

    const reservation = new Reservation({
      listingId,
      buyerId,
      quantity,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      status: 'active' 
    });

    await reservation.save();
    res.status(201).json(reservation);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/expired', async (req, res) => {
  try {
    const expiredReservations = await Reservation.find({ status: 'expired' });
    res.json(expiredReservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
