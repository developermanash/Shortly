const express = require('express');
const router = express.Router();
const { handleGenerateShortUrl, handleGetAnylytics ,handleRedirect} = require('../controllers/url');

router.post('/', handleGenerateShortUrl);
router.get('/analytics/:shortId', handleGetAnylytics);
router.get('/:shortId', handleRedirect);

module.exports = router;
