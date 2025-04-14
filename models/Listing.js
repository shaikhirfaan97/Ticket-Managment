const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
  reserved: { type: Number, default: 0 },
  expiry: { type: Date, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('Listing', listingSchema);
