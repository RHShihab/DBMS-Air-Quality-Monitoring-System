import { getJsonData } from "./index.js";
google.charts.load("current", { packages: ["corechart", "line"] });
google.charts.setOnLoadCallback(drawCurveTypes);

async function drawCurveTypes() {
  // var data = google.visualization.arrayToDataTable(array)
  let jsonData = await getJsonData();
  console.log(JSON.stringify(jsonData));

  var dataSet = [];
  dataSet.push(["time", "pm2.5"]);
  for (var i = 0; i < jsonData.length; i++) {
    // console.log(jsonData[i].time)
    dataSet.push([jsonData[i].time.split("T")[0], jsonData[i].pm25]);
  }

  var data = google.visualization.arrayToDataTable(dataSet);

  var options = {
    hAxis: {
      title: "Time",
      titleTextStyle: {
        color: "#b0bec5",
        fontName: "Roboto",
        fontSize: "18",
        bold: true,
      },
      textStyle: {
        color: "#b0bec5",
        fontName: "Roboto",
        fontSize: "12",
        bold: true,
      },
    },
    vAxis: {
      title: "pm2.5",
      titleTextStyle: {
        color: "#b0bec5",
        fontName: "Roboto",
        fontSize: "18",
        bold: true,
      },
      gridlines: { color: "#37474f", count: 4 },
      baselineColor: "#37474f",
      textStyle: {
        color: "#b0bec5",
        fontName: "Roboto",
        fontSize: "12",
        bold: true,
      },
    },
    series: {
      1: { curveType: "function" },
    },
    legend: {
      position: "top",
      alignment: "center",
      textStyle: { color: "#b0bec5", fontName: "Roboto", fontSize: "12" },
    },
    colors: [
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
    ],
    backgroundColor: "transparent",
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}
