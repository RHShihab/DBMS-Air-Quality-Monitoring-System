import { routeWiseData } from "./app.js";

let jsonData = await routeWiseData;
// var jsonData1 = JSON.stringify(jsonData);

let pm25 = [25]
let x1 = [22.835237];
let x2 = [89.532228];

console.log(jsonData);

for(var i=0; i<jsonData.length; i++){
    x1.push(jsonData[i].longitude);
    x2.push(jsonData[i].latitude);
    pm25.push(jsonData[i].pm25);
}

console.log( pm25);
console.log( x1);
console.log( x2);

var scl = [
  [0, "rgb(150,0,90)"],
  [0.125, "rgb(0, 0, 200)"],
  [0.25, "rgb(0, 25, 255)"],
  [0.375, "rgb(0, 152, 255)"],
  [0.5, "rgb(44, 255, 150)"],
  [0.625, "rgb(151, 255, 0)"],
  [0.75, "rgb(255, 234, 0)"],
  [0.875, "rgb(255, 111, 0)"],
  [1, "rgb(255, 0, 0)"],
];
var data = [
  {
    type: "scattermapbox",
    text: pm25,
    lon: x2,
    lat: x1,
    marker: {
      color: pm25,
      colorscale: scl,
      cmin: 0.5,
      cmax: 100,
      reversescale: true,
      opacity: 0.5,
      size: 15,
      colorbar: {
        thickness: 10,
        titleside: "right",
        outlinecolor: "rgba(68,68,68,0)",
        ticks: "outside",
        ticklen: 3,
        shoticksuffix: "last",
        ticksuffix: "inches",
        dtick: 10,
      },
    },
    name: "NA Precipitation",
  },
];

var layout = {
  dragmode: "zoom",
  mapbox: {
    style: "open-street-map",
    center: { lat: 22.835237, lon: 89.532228 },
    zoom: 17,
  },
  margin: { r: 0, t: 0, b: 0, l: 0 },
};

Plotly.newPlot("myDiv", data, layout);
