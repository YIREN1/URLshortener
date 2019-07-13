const express = require('express');

const router = express.Router();

const Url = require('../../model/url');

// POST /api/v1/url/shorten
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('URL Not Found');
    }

  } catch (error) {
    console.error('\u001b[1;31m Server Error', err);
    res.status(500).json('Server Error');
  }
})

module.exports = router;