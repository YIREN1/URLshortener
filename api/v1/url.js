const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../../model/url');
const router = express.Router();

// POST /api/v1/url/shorten
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if(!validUrl.isUri(baseUrl) && baseUrl !== '0.0.0.0:8080') {
    console.error(baseUrl);
    return res.status(401).json('invalid base url');
  }

  const urlCode = shortid.generate();

  if(!validUrl.isUri(longUrl)) {
    console.error(longUrl);
    return res.status(401).json('invalid long url');
  } else {
    try {
      let url = await Url.findOne({ longUrl });

      if(url) {
        console.log('url exists');
        res.json(url);
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.error('\u001b[1;31m Server Error', err);
      res.status(500).json('Server Error');
    }
  }
})

module.exports = router;