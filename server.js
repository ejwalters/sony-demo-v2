const http = require('http');
const express = require('express');
const path = require('path');
const { ppid } = require('process');
const app = express();
app.use(express.json());
app.use(express.static("express"));
const bodyParser = require('body-parser');
var writeKey = "eznOJ1f1AE93h0xn2ErLOTWMhYFPq6gP";
var PersonasSpace = "spa_guwfkaTcfqVerxoetnb6AS";
const axios = require('axios');
var profileApiToken = "OnE2g7YLo4LqQBIKPUo5pcm73Ph7tIvJdAuy6__xZzaMKfMHmb6BSz9hO08hom4b4MpDcVKn3Gi0OKPy4gb4QsHz8_u8e7vwOsjk96yjiJfP5v2yqLqUjLk1bUltCR5G75jv2lLC9DABHccEE-5wl82dvvnSDCGe7P54GFNJ2gFD3vQPAp01nJ1_Dpjb1tQM7-kGOAqx8JxdeasC6o7dHFuIQ_Z5BfLif3b87TVHsmt0vHM0Uhf9XHqzBUavTJCSmu24kDnl_OwOX_O9lO5po8NDBZo=";

app.use(bodyParser.json());


// default URL for website
app.use('/', express.static(path.join(__dirname, 'express/index.html')));

const server = http.createServer(app);
const port = 3000;
const cors = require('cors');
server.listen(port);
console.debug('Server listening on port ' + port);
app.use(cors());

//accepts request from client, calls Segment API to retrieve anon_id traits, sends traits back to client
app.post('/userData', async (req, res) => {
    const anon_id = req.body.anon_id;
    if (anon_id) {
        let new_anon_id = (anon_id.replace(/['"]+/g, ''));
        let api_url = 'https://profiles.segment.com/v1/spaces/' + PersonasSpace + '/collections/users/profiles/anonymous_id:' + new_anon_id + '/traits?limit=200';
        var hash = btoa(profileApiToken + ':');
        const headers = {
            'Authorization': "Basic " + hash,
            'Content-Type': 'application/json',
        };
        try {
            // Process response here
            const response = await axios.get(api_url, { headers });
            res.json(response.data.traits);
        } catch (error) {
            // Handle the error here, or throw it again if needed
            console.error('Error occurred while making the request:', error);
        }
    }
    res.end();
});