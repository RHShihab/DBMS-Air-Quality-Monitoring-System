import { getpm25Data } from "./app.js";
import { aqiCard_Data } from "./app.js";

// loads AQI card
let aqiCardData = await aqiCard_Data;
// console.log("sup yo");
console.log(aqiCardData);
document.getElementById("aqiCardTitle").innerHTML = "Air Quality of " + aqiCardData[0].location;
document.getElementById("aqiCardPm25").innerHTML = aqiCardData[0].pm25;
document.getElementById("aqiCardrain").innerHTML = "<i class=\"fas fa-cloud-sun-rain\"></i> " + aqiCardData[0].rainPrecipitation + "%";
document.getElementById("aqiCardwind").innerHTML = "<i class=\"fa-solid fa-wind\"></i> " + aqiCardData[0].windSpeed + " km/h";
document.getElementById("aqiCardvisibility").innerHTML = "<i class=\"fa-solid fa-eye-low-vision\"></i> " + aqiCardData[0].visibility;
document.getElementById("aqiCardDate").innerHTML = "Last updated on " + aqiCardData[0].date.split("T")[0];

if(aqiCardData[0].pm25<100) document.querySelector(".air-quality").style.backgroundColor = "rgb(109, 234, 157)"; // low
else if(aqiCardData[0].pm25<201) document.querySelector(".air-quality").style.backgroundColor = "rgb(234, 192, 109)"; // middle
else if(aqiCardData[0].pm25>200) document.querySelector(".air-quality").style.backgroundColor = "rgb(219, 97, 97)"; // middle
// console.log(aqiCardData[0].pm25.toString())

let jsonpm25Data = await getpm25Data;
// console.log(JSON.stringify(jsonData));
// const labels = ["time", "pm25", "March", "April", "May", "June"];
const orgLineData = {
  //   labels: labels,
  datasets: [
    {
      label: "EPA",
      backgroundColor: "rgb(214, 161, 92)",
      borderColor: "rgb(214, 161, 92)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      data: jsonpm25Data,
      tension: 0.5,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "date",
        yAxisKey: "pm251",
      },
    },
    {
      label: "PurpleAir",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      data: jsonpm25Data,
      tension: 0.5,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "date",
        yAxisKey: "pm252",
      },
    },
    {
      label: "IQAir",
      backgroundColor: "rgb(196, 194, 73)",
      borderColor: "rgb(196, 194, 73)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      data: jsonpm25Data,
      tension: 0.5,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "date",
        yAxisKey: "pm253",
      },
    },
  ],
};

const lineConfig = {
  type: "line",
  data: orgLineData,
  options: {
    scales: {
      xAxes: {
        ticks: { color: "black", maxTicksLimit: 20 },
        grid: { color: "grey" },
        stacked: true,
      },
      yAxes: {
        ticks: { color: "black", beginAtZero: true },
        grid: { color: "grey" },
        stacked: false,
      },
    },
  },
};

const lineChart = new Chart(
  document.getElementById("orgLineChart"),
  lineConfig
);

var y0 = [];
var y1 = [];
var y2 = [];
for (var i = 0; i < jsonpm25Data.length; i ++) {
	y0[i] = jsonpm25Data[i].pm251;
	y1[i] = jsonpm25Data[i].pm252;
	y2[i] = jsonpm25Data[i].pm253;
}

var trace1 = {
  y: y0,
  type: 'box',
  name: 'EPA'
};

var trace2 = {
  y: y1,
  type: 'box',
  name: 'PurpleAir'
};

var trace3 = {
  y: y2,
  type: 'box',
  name: 'IQAir'
};

var data = [trace1, trace2, trace3];

Plotly.newPlot('orgboxPlotChart', data);

const orgScatterData = {
  //   labels: labels,
  datasets: [
    {
      label: "EPA vs PurpleAir",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      // data: [
      //   { x: 34, y: 23 },
      //   { x: 54, y: 23 },
      //   { x: 65, y: 12 },
      //   { x: 53, y: 64 },
      //   { x: 13, y: 54 }
      // ],
      data: jsonpm25Data,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "pm252",
        yAxisKey: "pm251",
      },
    },
    {
      label: "EPA vs IQAir",
      backgroundColor: "rgb(214, 161, 92)",
      borderColor: "rgb(214, 161, 92)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      // data: [
      //   { x: 34, y: 23 },
      //   { x: 54, y: 23 },
      //   { x: 65, y: 12 },
      //   { x: 53, y: 64 },
      //   { x: 13, y: 54 }
      // ],
      data: jsonpm25Data,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "pm253",
        yAxisKey: "pm251",
      },
    },
  ],
};

const scatterConfig = {
  type: "scatter",
  data: orgScatterData,
  options: {},
};

const scatterChart = new Chart(
  document.getElementById("orgScatterChart"),
  scatterConfig
);


google.charts.load('current', {
  'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Division', 'AQI'],
    ['BD-A', 156],
    ['BD-B', 72],
    ['BD-C', 83],
    ['BD-D', 51],
    ['BD-E', 63],
    ['BD-F', 94],
    ['BD-G', 95],
    ['BD-H', 69],
  ]);

  var options = {
    region: 'BD',
    displayMode: 'regions',
    resolution: 'provinces',
    datalessRegionColor: 'transparent',
    width: 1000,
    height: 1000
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}