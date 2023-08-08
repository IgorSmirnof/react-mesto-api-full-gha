require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

// const { PORT = process.env.PORT_APP, DB_URL = process.env.DB_URL_APP } = process.env;
const PORT = 4000;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

const routes = require('./routes');

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://http://igo.nomoreparties.co'], credentials: true, maxAge: 30 }));
app.use(helmet());
app.use(express.json());

app.use(routes);

app.use(errors());
app.use(errorHandler);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('connect with DB mestodb');
  })
  .catch(() => {
    console.log('Error connection with DB mestodb');
  });

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
