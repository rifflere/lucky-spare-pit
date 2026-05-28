CREATE TABLE inventory (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  type          TEXT,
  area          TEXT,
  location      TEXT,
  status        TEXT,
  quantity      INTEGER,
  condition     TEXT,
  "itemImage"   TEXT,
  "checkOutBy"  TEXT,
  "lastUpdated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tags          TEXT,
  notes         TEXT
);