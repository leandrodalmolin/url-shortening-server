require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

app.post('/shorten', async (req, res) => {
    const urlDetails = await ShortUrl.create({ full: req.body.fullUrl });
    res.status(200).send(urlDetails);
});

app.get('/:shortUrl', async (req, res) => {
   const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

   if (shortUrl === null) {
       return res.sendStatus(404);
   }

   shortUrl.clicks++;
   shortUrl.save();

   res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);