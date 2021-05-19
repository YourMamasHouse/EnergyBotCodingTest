const express = require('express');
const eventstream = require('event-stream');
const fs = require('fs');
const cors = require('cors');
const app = express();


const weatherData = []
const port = 9999

// searchStation finds the data for the provided stationID
function searchStation(stationID) {
    var response = "INVALID STATION ID"
    // If the station exists, change the response to the data stored for that station
    if (weatherData[stationID] !== undefined && stationID !== "")
    {
        response = weatherData[stationID];
    }
    return response;
}

// Parse csv file to readable array
var stream = fs.createReadStream('2017.csv')
.pipe(eventstream.split())
.pipe(eventstream.mapSync(async function(line) {
    // Process line
    if (!line.length < 20)
    {
        stream.pause();
        // Store the line in the respective station array
        var stationID = line.substring(0, 11)
        if (weatherData[stationID] === undefined)
        {
            weatherData[stationID] = []
        }
        weatherData[stationID].push(line);
        stream.resume();
    }
})
.on('error', function(error) {
    console.log("Error " + error);
})
.on('end', function() {

    // Once the csv is parsed, set up listener
    app.use(cors())

    app.get('/searchstation', function (req, res) {
        // Check that query exists
        if (req.query !== undefined)
        {
            // Respond to valid queries
            res.send(searchStation(req.query.stationID, req.query.date));
        }
        else 
        {
            res.send("INVALID STATION ID")
        }
    });

    app.listen(port, () => {
        console.log("Listening on port " + port)
    });

})
);