import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {
  DEVELOPMENT_PORT,
  DEVELOPMENT_MONGO_URI,
  PRODUCTION_PORT,
  PRODUCTION_MONGO_URI,
} from './config';
import LOG from './log';
import routes from './routes';

dotenv.config();
const app = express();
const ENVIRONMENT = process.env.NODE_ENV || 'production';
let PORT;
let mongoUri;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// check the environment
if (ENVIRONMENT && ENVIRONMENT.trim() === 'production') {
  PORT = PRODUCTION_PORT;
  mongoUri = PRODUCTION_MONGO_URI;
  LOG.info(`Production Mongo: ${mongoUri}`);
}

if (ENVIRONMENT && ENVIRONMENT.trim() === 'development') {
  PORT = DEVELOPMENT_PORT;
  mongoUri = DEVELOPMENT_MONGO_URI;
  LOG.info(`Development Mongo: ${mongoUri}`);
}

if (PORT && mongoUri) {
  mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      LOG.info('Database Synced');
    })
    .catch((error) => {
      LOG.error(error.message);
    });

  app.get('/', (req, res) => {
    res.send(`<h3>School Management REST API</h3>`);
  });

  app.listen(PORT, () => {
    LOG.info(`API is up and running on PORT ${PORT}`);
    routes(app);
  });
}
