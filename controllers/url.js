const { nanoid } = require("nanoid");
const URL = require('../models/url');

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    const shortID = nanoid(4);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHIstory: []
    });
    return res.render("home",{id:shortID})
   
}


async function handleGetAnylytics(req, res) {
    const shortId = req.params.shortId;  
    console.log("Querying for shortId:", shortId);

    try {
        const result = await URL.findOne({ shortId });

    

        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

    
        return res.json({
            totalClicks: result.visitHIstory.length,
            Anylytics: result.visitHIstory
        });
    } catch (err) {
        
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleRedirect(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHIstory: { timeStamps: Date.now() },
            }
        },
        { new: true } 
    );

    if (!entry) {
        return res.status(404).send('Short URL not found');
    }

    res.redirect(entry.redirectUrl);
}


module.exports = {
    handleGenerateShortUrl,
    handleGetAnylytics,
    handleRedirect
};
