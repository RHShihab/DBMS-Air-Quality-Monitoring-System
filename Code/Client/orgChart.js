import { getJsonData } from "./app.js";
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

let jsonData = await getJsonData;
// console.log(JSON.stringify(jsonData));
// const labels = ["time", "pm25", "March", "April", "May", "June"];
const orgLineData = {
  //   labels: labels,
  datasets: [
    {
      label: "pm2.5",
      backgroundColor: "rgb(214, 161, 92)",
      borderColor: "rgb(214, 161, 92)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      data: jsonData,
      tension: 0.5,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "date",
        yAxisKey: "pm25",
      },
    },
    {
      label: "Average Temperature",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      data: jsonData,
      tension: 0.5,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "date",
        yAxisKey: "avgTemperature",
      },
    },
    {
      label: "Relative Humidity",
      backgroundColor: "rgb(196, 194, 73)",
      borderColor: "rgb(196, 194, 73)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      data: jsonData,
      tension: 0.5,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "date",
        yAxisKey: "relativeHumidity",
      },
    },
    {
      label: "Rain Precipitation",
      backgroundColor: "rgb(30, 133, 201)",
      borderColor: "rgb(30, 133, 201)",
      //   data: [0, 10, 5, 2, 20, 30, 45],
      data: jsonData,
      tension: 0.5,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "date",
        yAxisKey: "rainPrecipitation",
      },
    },
  ],
};

const lineConfig = {
  type: "line",
  data: orgLineData,
  options: {
    scales: {
      x: {
        ticks: { color: "black", beginAtZero: true, maxTicksLimit: 20 },
        grid: { color: "grey" },
      },
      y: {
        ticks: { color: "black", beginAtZero: true },
        grid: { color: "grey" },
      },
    },
  },
};

const lineChart = new Chart(
  document.getElementById("orgLineChart"),
  lineConfig
);

const orgScatterData = {
  //   labels: labels,
  datasets: [
    {
      label: "pm2.5",
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
      data: jsonData,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "relativeHumidity",
        yAxisKey: "pm25",
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

const orgBoxplotData = {
  //   labels: labels,
  datasets: [
    {
      label: "pm2.5",
      outlierColor: "#999999",
      backgroundColor: "rgba(214, 161, 92, 0.2)",
      borderColor: "rgb(214, 161, 92)",
      padding: 0,
      itemRadius: 0,
      data: jsonData,
      parsing: {
        //this sets the x and y axis labels
        xAxisKey: "pm25",
      },
    },
  ],
};

const BoxplotConfig = {
  type: "boxplot",
  data: orgBoxplotData,
  options: {
    responsive: true,
    legend: {
      position: "top",
    },
  },
};

// const BoxplotChart = new Chart(
//   document.getElementById("orgBoxplotChart"),
//   BoxplotConfig
// );
