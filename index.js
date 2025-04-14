const express = require('express');
const connectDB = require('./db');
const listingRoutes = require('./routes/listings');
const reservationRoutes = require('./routes/reservations');
const cron = require('node-cron');
const expireReservations = require('./jobs/expireReservations');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/listings', listingRoutes);
app.use('/reserve', reservationRoutes);

cron.schedule('*/1 * * * *', expireReservations);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('❌ Server failed to start:', err.message);
    process.exit(1);
  }
};

startServer();
