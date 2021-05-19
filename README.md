# EnergyBotCodingTest
Garrett Hargrove's Coding Assignment for EnergyBot

API contains code for a REST API that will provide all data for a given station from 2017.csv when provided a station id through an http get request. 
It can be started by running the following command while in the API directory and will listen on port 9999.
node index.js

Client contains code for a client that will make http get requests to the provided API and display the data provided. 
It can be run using the following command while in the Client directory.
npm start
