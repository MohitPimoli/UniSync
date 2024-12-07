const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const queryRoutes = require('./routes/queryRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const errorHandler = require('./middlewares/errorHandler.js');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/queries', queryRoutes);
app.use('/connections', connectionRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

module.exports = app;
