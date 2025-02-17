const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;

    // Display location data on the web server
    console.log(`Received location data: Latitude: ${latitude}, Longitude: ${longitude}`);
    
    res.status(200).send('Location data received');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
