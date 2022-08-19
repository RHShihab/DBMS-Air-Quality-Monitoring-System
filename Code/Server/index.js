const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/insert", (request, response) => {
  console.log(request.body);

  const { localTime, pmVal, divisionVal, orgVal } = request.body;

  // const { localTime } = request.body;
  // const { pmVal } = request.body;
  // const { divisionVal } = request.body;
  // const { orgVal } = request.body;

  const db = dbService.getDbServiceInstance();

  const result = db.insertData(localTime, pmVal, divisionVal, orgVal);

  result
    .then(data => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.get("/", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () =>
  console.log("app is running at http://localhost:" + process.env.PORT)
);
