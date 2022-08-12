var jsonData1 = [
  { time: "2016-12-31T18:00:00.000Z", pm25: 231.5 },
  { time: "2017-01-02T18:00:00.000Z", pm25: 181.9 },
  { time: "2017-01-03T18:00:00.000Z", pm25: 127.7 },
  { time: "2017-01-04T18:00:00.000Z", pm25: 206.8 },
  { time: "2017-01-06T18:00:00.000Z", pm25: 227.1 },
  { time: "2017-01-07T18:00:00.000Z", pm25: 143.4 },
  { time: "2017-01-09T18:00:00.000Z", pm25: 184 },
  { time: "2017-01-10T18:00:00.000Z", pm25: 176.3 },
  { time: "2017-01-12T18:00:00.000Z", pm25: 120.9 },
  { time: "2017-01-13T18:00:00.000Z", pm25: 139.4 },
];

var dataSet = [];
dataSet.push(["time", "pm2.5"]);
// let date = "2017-01-13T18:00:00.000Z".split("T")[0];
// console.log(date);
for (var i = 0; i < jsonData1.length; i++) {
  // console.log(jsonData1[i].time)
  dataSet.push([jsonData1[i].time.split("T")[0], jsonData1[i].pm25]);
}
console.log(dataSet);

// [["title1", "title2"],
// [123, 123]

// ]

// var jsonData2 =
//       { time: "1/1/2017",
//       pm25: 231.5};

let arr = Object.entries(jsonData1);
// console.log(arr);

// console.log(arr[0][1]);
// console.log(arr.length)
var dataSet = [];
dataSet.push(["time", "pm2.5"]);
for (var i = 0; i < arr.length; i++) {
  var data = [];
  data.push(arr[i][1].time);
  data.push(arr[i][1].pm25);

  dataSet.push(data);
}

// console.log(dataSet);
