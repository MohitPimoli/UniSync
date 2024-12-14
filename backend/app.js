const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const queryRoutes = require('./routes/queryRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const errorHandler = require('./middlewares/errorHandler.js');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5001'];

app.use(
    cors({
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow cookies and authentication headers
    })
);

app.use(express.json());
app.use(helmet());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/queries', queryRoutes);
app.use('/connections', connectionRoutes);
app.use('/get', userRoutes);

app.use(errorHandler);

module.exports = app;
