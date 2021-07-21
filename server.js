import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const mongoUri = 'mongodb://mongo:27017/schooldb';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(mongoUri, { useNewUrlParser: true })
.then(() => {
  console.log('Database Synced');
})
.catch((error) => {
  console.log(error.message);
});

app.get('/', (req, res) => {
  res.send('<b>School Management REST API</p>');
});

app.listen(PORT, () => {
  console.log(`API is up and running on PORT ${PORT}`);
  routes(app);
});