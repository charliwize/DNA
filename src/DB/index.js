const mongoose = require('mongoose');

mongoose
  .connect('mongodb://dna:Ose!1990@ds053307.mlab.com:53307/dna_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(e => {
    console.log("Error in connection")
  })

const db = mongoose.connection;
module.exports = db;
