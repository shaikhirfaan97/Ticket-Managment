## B2B Resale Platform Backend

A backend service that allows sellers to list items and buyers to reserve inventory safely without overselling. Supports cron job to auto-expire reservations.

---

###Features

- Sellers can:
  - Create listings with SKU, quantity, and expiry time.
- Buyers can:
  - Reserve inventory (with 15-min hold).
- System:
  - Prevents overselling using atomic MongoDB operations.
  - Auto-expires stale reservations every minute using `node-cron`.

---

### Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Node-Cron
- REST API (Postman testable)

---

### Setup Instructions

1. **Unzip Folder:**
   ```bash
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - Use a local MongoDB instance or cloud MongoDB URI.
   - Update your connection string in `db.js`.

4. **Start the server:**
   ```bash
   npm start
   ```
   Server runs at `http://localhost:5000`

---

###Folder Structure

```
.
├── models
│   ├── Listing.js
│   └── Reservation.js
├── routes
│   ├── listings.js
│   └── reservations.js
├── jobs
│   └── expireReservations.js
├── db.js
├── index.js
└── README.md
```

---

### sample API Endpoints

####  Create Listing
```http
POST /listings
```
```json
{
  "sku": "SKU001",
  "quantity": 10,
  "expiry": "2025-04-10T10:00:00Z",
  "sellerId": "seller123"
}
```

#### Reserve Item
```http
POST /reserve
```
```json
{
  "listingId": "<LISTING_ID>",
  "quantity": 2,
  "buyerId": "buyer123"
}
```

#### View Expired Reservations
```http
GET /reserve/expired
```

---

### Cron Job

Runs every **1 minute** to:
- Auto-expire reservations past their `expiresAt`
- Release reserved inventory back to listings

Console logs:
```
[CRON] Running at 2025-04-09T05:47:00.670Z
 1 reservation(s) expired at 2025-04-09T05:47:00.670Z
```



