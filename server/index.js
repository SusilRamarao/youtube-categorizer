const express = require('express');
const cors = require('cors');
const ogs = require('open-graph-scraper');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// OG scraping endpoint
app.get('/api/og-data', async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    try {
        const { result } = await ogs({ url });
        console.log("OG Result", result);
        res.json({
            title: result.ogTitle || result.twitterTitle || '',
            image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || '',
            description: result.ogDescription || result.twitterDescription || ''
        });
    } catch (error) {
        console.error('Error fetching OG data:', error);
        res.status(500).json({ error: 'Failed to fetch OG data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});