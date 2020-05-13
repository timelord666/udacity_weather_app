// Setup empty JS object to act as endpoint for all routes
projectData = [];
const port = 8000;

const bodyParser = require('body-parser');
const cors = require('cors');

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get('/recent', (req, res) => {
    res.send(projectData[projectData.length - 1]);
})

app.post('/save', (req, res) => {
    let data = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };


    projectData.push(data);

    
    res.send('worked');
})

// Setup Server

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})