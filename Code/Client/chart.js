import { getJsonData } from "./index.js";

let jsonData = await getJsonData;
console.log(JSON.stringify(jsonData));
// const labels = ["time", "pm25", "March", "April", "May", "June"];

const data = {
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
        xAxisKey: "time",
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
        xAxisKey: "time",
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
        xAxisKey: "time",
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
        xAxisKey: "time",
        yAxisKey: "rainPrecipitation",
      },
    },
  ],
};

const config = {
  type: "line",
  data,
  options: {
    scales: {
      x: {
        ticks: { color: "white", beginAtZero: true, maxTicksLimit: 20 },
        grid: { color: "grey" },
      },
      y: {
        ticks: { color: "white", beginAtZero: true },
        grid: { color: "grey" },
      },
    },
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);
