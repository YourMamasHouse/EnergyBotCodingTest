import './App.css';
import React, { Component } from "react";
import axios from 'axios';
import Line from './Components/line'
import lightning from './Images/lightning.png'

export default class App extends Component {

  constructor (props)
  {
    super(props);

    this.stationID = "";
    this.currentStation = "";
    this.date = "20170101";
    this.data = null;
    this.list = null; // Individual date data

    // Core elements provided by NOAA (-snowdepth)
    this.PRCP = 0; // Total precipitation (mm/10)
    this.SNOW = 0; // Total snowfall (mm)
    this.TMAX = null; // Highest temperature
    this.TMIN = null; // Lowests temperature

    this.main = (
      <div className="Greeting" key={"search"}>
        <div className="Card">
          <img src={lightning}></img>
          <input onChange={(e) => {this.stationID = e.target.value}} placeholder="Station ID"></input>
          <button onClick={() => this.searchStation()}>Search</button>
        </div>
      </div>
    );
  }

  loadDate() {
    if (this.data !== null)
    {
      var tempData = []
      this.data.forEach((line) => {
        line = line.split(",")
        if (line[1] === this.date)
        {
          tempData.push(line);
        }
      });
      this.list = tempData.map((line) => 
        <div key={this.date + line[2]}>
          <Line data={line}></Line>
        </div>     
      );
      this.searchStation(this.currentStation)
      this.setState({
        station: this.currentStation,
        date: this.date,
        received: true
      });
    }
  }

  // searchStation will retrieve the station id from the API and then display that data to the user
  searchStation(stationID) {
    axios.get("http://localhost:9999/searchstation", {
      params: {
        stationID: this.stationID
      }
    }).then(async (res) => {
      // Display new data if the station is valid
      if (res.data !== "INVALID STATION ID")
      {
        // Reset core values
        this.PRCP = 0;
        this.SNOW = 0;
        this.TMAX = null;
        this.TMIN = null;

        // Reset date specific value list
        if (stationID !== this.currentStation)
        {
          this.list = null;
          this.date = "20170101";
        }

        // Set current station value
        this.currentStation = this.stationID;
        this.data = res.data;

        await this.data.forEach((line) => {
          line = line.split(",");
          // Find all core values for the station
          if (line[2] === "PRCP")
          {
            this.PRCP += parseFloat(line[3])/10;
          }
          else if (line[2] === "SNOW")
          {
            this.SNOW += parseInt(line[3]);
          }
          else if (line[2] === "TMAX")
          {
            if (this.TMAX === null)
            {
              this.TMAX = parseFloat(line[3])/10;
            }
            else if (parseInt(line[3])/10 > this.TMAX)
            {
              this.TMAX = parseInt(line[3])/10
            }
          }
          else if (line[2] === "TMIN")
          {
            if (this.TMIN === null)
            {
              this.TMIN = parseInt(line[3])/10;
            }
            else if (parseInt(line[3])/10 < this.TMIN)
            {
              this.TMIN = parseInt(line[3])/10
            }
          }
        }); 

        // Change the body of the page
        this.main = (
          <div className="App" key={"received" + this.date}>
            <div className="Spacer"></div>
            <div className="Card">
              <input onChange={(e) => {this.stationID = e.target.value}} placeholder="Station ID"></input>
              <button onClick={() => this.searchStation()}>Search New Station</button>
              <h1>Station ID: {this.currentStation}</h1>
              <p>Highest Temperature: {this.TMAX} C</p>
              <p>Lowest Temperature: {this.TMIN} C</p>
              <p>Total precipitation: {this.PRCP.toFixed(2)} mm</p>
              <p>Total Snowfall: {this.SNOW} mm</p>
              <input type="date" defaultValue={this.date.substring(0, 4) + "-" + this.date.substring(4, 6) + "-" + this.date.substring(6, 8)} min="2017-01-01" max="2017-12-31" onChange={(e) => {
                // Change date value
                var tempDate = e.target.value;
                this.date = tempDate.substring(0, 4) + tempDate.substring(5, 7) + tempDate.substring(8, 10);
              }}></input>
              <button onClick={() => {this.loadDate()}}>Search Date</button>
              <div>
                {this.list}
              </div>
            </div>
            <div className="Spacer"></div>
          </div>
        );
        this.setState({received: true})
      }
      else
      {
        window.alert("No station was found with this ID");
      }
    });
  }

  render() {
    return this.main;
  }
}