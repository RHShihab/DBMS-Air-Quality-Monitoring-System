import {getJsonData} from './index.js'
google.charts.load("current", { packages: ["corechart", "line"] });
google.charts.setOnLoadCallback(drawCurveTypes);

// async function getDefaultData() {
//   //Converting JSON(data) to 2D Array(dataset)
//   const res = await fetch("http://localhost:3000/");
//   obj = await res.json();

//   console.log(obj.data);
// }

function drawCurveTypes(jsonData) {
  // var data = google.visualization.arrayToDataTable(array)
  let arr = Object.entries(getJsonData);
  console.log(getJsonData)

  var dataSet = [];
  dataSet.push(["time", "pm2.5"]);
  for (var i = 0; i < arr.length; i++) {
    var data = [];
    data.push(arr[i][1].time);
    data.push(arr[i][1].pm25);

    dataSet.push(data);
  }
  console.log("arr " + dataSet)
  var data = google.visualization.arrayToDataTable(dataSet);

  console.log("amaro porano jaha chay");
  // getDefaultData();

  // var data = new google.visualization.DataTable();
  // data.addColumn('number', 'X');
  // data.addColumn('number', 'Dogs');
  // data.addColumn('number', 'Cats');
  // data.addRows([
  //   [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
  //   [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
  //   [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
  //   [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
  //   [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43]
  // ]);

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
