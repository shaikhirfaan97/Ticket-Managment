const Reservation = require('../models/Reservation');
const Listing = require('../models/Listing');

const expireReservations = async () => {
  try {
    const now = new Date();
    console.log(`[CRON] Running at ${now.toISOString()}`);

    const expired = await Reservation.find({
      status: 'active',
      expiresAt: { $lt: now }
    });

    for (const r of expired) {
      await Listing.updateOne(
        { _id: r.listingId },
        { $inc: { reserved: -r.quantity } }
      );
      r.status = 'expired';
      await r.save();
    }

    if (expired.length > 0) {
      console.log(` ${expired.length} reservation(s) expired at ${now.toISOString()}`);
    }
  } catch (err) {
    console.error('Cron Job Error:', err.message);
  }
};

module.exports = expireReservations;
