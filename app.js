const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/users');
const cardsRouter = require('./routes/cards');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '638bca6fa706424020ec9a5d',
  };

  next();
});

app.use('/users', router);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'not found' });
});

mongoose.connect(
  'mongodb://127.0.0.1/mestodb',
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`app listening onn port ${PORT}`);
    });
  },
);
