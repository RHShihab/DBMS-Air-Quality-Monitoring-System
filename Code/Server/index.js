const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const uploads = require("express-fileupload");

require("dotenv").config();
const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(uploads());

app.get("/", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.post("/selectedDate", (request, response) => {
  console.log(request.body.organizationName);
  const db = dbService.getDbServiceInstance();
  const result = db.getSelectedData();

  result
    .then((data) => response.json({ data: data }))
});

app.get("/getRouteWiseData", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getRouteWiseData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.get("/getAqiCardData", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAqiCardData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.post("/insert", (request, response) => {
  console.log(request.body);

  const { localTime, pmVal, divisionVal, orgVal } = request.body;

  const db = dbService.getDbServiceInstance();

  const result = db.insertData(localTime, pmVal, divisionVal, orgVal);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.post("/uploadweather", (req, res) => {
  if (req.files) {
    console.log(req.files);
    var file = req.files.uploadWeather;
    var filename = file.name;

    console.log(filename);

    file.mv("./uploads/" + filename, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("File Uploaded");
      }
    });

    const db = dbService.getDbServiceInstance();
    db.UploadWeatherCsvDataToMySQL("./uploads/" + filename);

    // fs.createReadStream("./uploads/" + filename)
    //   .pipe(parser({}))
    //   .on("data", (data) => results.push(data))
    //   .on("end", () => {
    //     console.log(results);
    //   });
  }
});

app.post("/uploadsensor", (req, res) => {
  if (req.files) {
    console.log(req.files);
    var file = req.files.uploadSensor;
    var filename = file.name;

    console.log(filename);

    file.mv("./uploads/" + filename, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("File Uploaded");
      }
    });

    const db = dbService.getDbServiceInstance();
    db.UploadSensorCsvDataToMySQL("./uploads/" + filename);

    // fs.createReadStream("./uploads/" + filename)
    //   .pipe(parser({}))
    //   .on("data", (data) => results.push(data))
    //   .on("end", () => {
    //     console.log(results);
    //   });
  }
});

app.listen(process.env.PORT, () =>
  console.log("app is running at http://localhost:" + process.env.PORT)
);
