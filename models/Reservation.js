const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['active', 'expired', 'completed'], default: 'active' },
  reservedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
