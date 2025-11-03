const express = require('express');
const cors = require('cors');
const ogs = require('open-graph-scraper');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./yt-db.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});




// OG scraping endpoint
app.get('/api/og-data', async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    try {
        const { result } = await ogs({ url });
        //console.log("OG Result", result);
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

//S
app.get('/api/db', async (req, res) => {

    const { category, channel, videos } = req.query;
    let query_response = {results: []};

    if(category=="All"){

        db.all('SELECT * FROM Category', [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }

            rows.forEach((row) => {
                
                const id = row.category_id;
                const name = row.category_name;
                const description = row.description;
                //console.log("id", id, "name", name, "desc", description);
                query_response.results.push({id: id, name: name, description: description});
            });

            res.json(query_response);
        });
    }
    
});

app.post('/api/db', async (req, res) =>{
    console.log("db post");
    //const { category, channel, videos } = req.body;
    const category = req.body.category;
    console.log(req.body);
    
    if(category !== ''){
        console.log("category insertion", category);
        const desc = '';
        
        db.run('INSERT INTO Category (category_name, description) VALUES (?, ?)', [category, desc], function(err) {
            if (err) {
                console.error('Error inserting data:', err.message);
            } else {
                console.log("A row has been inserted");
            }
        });
    }

    res.json({"result" : 200});
});

app.delete('/api/db', async(req, res) =>{

    console.log("db delete");

    const category = req.body.category;
    
    if(category !== ''){
        db.run('DELETE FROM Category WHERE category_name=?', [category], function(err) {
            if (err) {
                console.error('Error deleting data:', err.message);
            } else {
                console.log("A row has been deleted");
            }
        });
    }

    res.json({"result" : 200});

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});