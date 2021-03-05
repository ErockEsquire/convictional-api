const express = require('express');
const app = express();
const res = require("./db.json");
const { db } = require('./db/db');
const ingest = require('./db/ingest');

app.use('/', require('./routes/routes'))

const port = process.env.PORT || 3000
app.listen(port, () => {console.log(`Listening on port ${port}!`);ingest(res.products, db)})
