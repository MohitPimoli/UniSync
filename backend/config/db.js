const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected successfully"))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

module.exports = mongoose;
