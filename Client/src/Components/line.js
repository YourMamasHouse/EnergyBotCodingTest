import { Component } from "react";

export default class Line extends Component {

    constructor(props)
    {
        super(props);
        this.data = props.data
    }

    render() {
        var line = null;
        if (this.data[2] === "PRCP")
        {
            if (parseFloat(this.data[3]) !== 0) // Only display if not 0
            {
                line = (
                    <div>
                        <p>Precipitation: {parseFloat(this.data[3])/10} mm</p>
                    </div>
                );
            }
        }
        else if (this.data[2] === "TMAX")
        {
            line = (
                <div>
                    <p>High Temperature: {parseFloat(this.data[3]/10)} C</p>
                </div>
            )
        }
        else if (this.data[2] === "TMIN")
        {
            line = (
                <div>
                    <p>Low Temperature: {parseFloat(this.data[3]/10)} C</p>
                </div>
            )
        }
        else if (this.data[2] === "TAVG")
        {
            line = (
                <div>
                    <p>Average Temperature: {parseFloat(this.data[3]/10)} C</p>
                </div>
            )
        }
        else if (this.data[2] === "SNOW")
        {
            if (parseFloat(this.data[3]) !== 0) // Only display if not 0
            {
                line = (
                    <div>
                        <p>Snowfall: {this.data[3]} mm</p>
                    </div>
                );
            }
        }
        else if (this.data[2] === "SNWD")
        {
            if (parseFloat(this.data[3]) !== 0) // Only display if not 0
            {
                line = (
                    <div>
                        <p>Snow Depth: {this.data[3]} mm</p>
                    </div>
                );
            }
        }
        else if (this.data[2] === "TSUN")
        {
            line = (
                <div>
                    <p>Minutes of Sunshine: {this.data[3]}</p>
                </div>
            )
        }
        else if (this.data[2].substring(0, 2) === "WT")
        {
            var type = "";
            console.log(this.data[2].substring(2,4))
            switch (this.data[2].substring(2, 4))
            {
                case "01":
                    type = "Fog";
                    break;
                case "02":
                    type = "Heavy Fog";
                    break;
                case "03":
                    type = "Thunder";
                    break;
                case "04":
                    type = "Ice";
                    break;
                case "05": 
                    type = "Hail";
                    break;
                case "06": 
                    type = "Glaze";
                    break;
                case "07":
                    type = "Dust";
                    break;
                case "08":
                    type = "Smoke";
                    break;
                case "09":
                    type = "Blowing Snow";
                    break;
                case "10":
                    type = "Tornado";
                    break;
                case "11": 
                    type = "High Winds";
                    break;
                case "12":
                    type = "Blowing Spray";
                    break;
                case "13":
                    type = "Mist";
                    break;
                case "14":
                    type = "Drizzle";
                    break;
                case "15":
                    type = "Freezing Drizzle";
                    break;
                case "16":
                    type = "Rain";
                    break;
                case "17":
                    type = "Freezing Rain";
                    break;
                case "18":
                    type = "Snow";
                    break;
                case "19":
                    type = "Unknown Source of Precipitation";
                    break;
                case "21":
                    type = "Ground Fog";
                    break;
                case "22":
                    type = "Ice Fog";
                    break;
            }
            line = (
                <div>
                    <p>Weather Type: {type}</p>
                </div>
            )
        }
        // All other types will likely not interest users, so they will be left as null

        return line;
    }
}
