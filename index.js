const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const fs = require('fs');

app.use(express.json());
var cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
const port = process.env.PORT || 3000

const map_points = require('./mappoints.json')

// API routes

app.get('/map_points', (req, res) => {
    res.status(200).json(map_points)
})

app.post('/map_points', (req, res) => {
    map_points.push(req.body)
    fs.writeFile(`./mappoints.json`, JSON.stringify(map_points, null, 2), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
      });
    res.status(200).json(map_points)
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
