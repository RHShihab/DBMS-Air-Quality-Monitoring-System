var jsonData1 = {"data":[{"time":"1/1/2017","pm25":231.5},
{"time":"1/3/2017","pm25":181.9},
{"time":"1/4/2017","pm25":127.7},
{"time":"1/5/2017","pm25":206.8},
{"time":"1/7/2017","pm25":227.1},
{"time":"1/8/2017","pm25":143.4},
{"time":"1/10/2017","pm25":184},
{"time":"1/11/2017","pm25":176.3},
{"time":"1/13/2017","pm25":120.9},
{"time":"1/14/2017","pm25":139.4}]};

var jsonData2 =
      { time: "1/1/2017",
      pm25: 231.5};

let arr = Object.entries(jsonData1.data);

// console.log(arr[0][1]);
// console.log(arr.length)
var dataSet=[];
dataSet.push(["time", "pm2.5"])
for(var i=0; i<arr.length ; i++){
    var data = [];
    data.push(arr[i][1].time)
    data.push(arr[i][1].pm25)
    
    dataSet.push(data);
}

console.log(dataSet);
