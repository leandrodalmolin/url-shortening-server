const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const routes = express.Router();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Add new url to DB
routes.post('/shorten', async (req, res) => {
    const urlDetails = await ShortUrl.create({ full: req.body.fullUrl });
    res.status(200).send(urlDetails);
});

// Redirect short to long url
routes.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (shortUrl === null) {
        return res.sendStatus(404);
    }

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
});

module.exports = routes;