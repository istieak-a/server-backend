const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { JSDOM } = require('jsdom');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/fetch-data', async (req, res) => {
    const { nid, dob } = req.query;
    const key = 'allteam'; // Since the key is constant, you can set it directly

    // Construct the URL
    const url = `https://apisell24.shop/brother_team_api.php?nid=${encodeURIComponent(nid)}&dob=${encodeURIComponent(dob)}&key=${key}`;

    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        
        // Use JSDOM to parse and modify the HTML content
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;
        
        // Fix relative URLs for images and other resources
        const base = document.createElement('base');
        base.href = 'https://apisell24.shop/';
        document.head.appendChild(base);

        res.send(dom.serialize());
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});