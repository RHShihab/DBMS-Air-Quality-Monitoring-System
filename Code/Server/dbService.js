const mysql = require("mysql");
const dotenv = require("dotenv");
const fs = require("fs");
const csv = require("fast-csv");

let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT time, pm25, avgTemperature, rainPrecipitation, relativeHumidity, division FROM (SELECT * FROM datasheet.aqm_table ORDER BY time DESC LIMIT 50) AS latestData ORDER BY time;";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertData(localTime, pmVal, divisionVal, orgVal) {
    try {
      // const localDate = new Date();

      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO aqm_table (time, pm25, division, organization) VALUES (?, ?, ?, ?);";

        connection.query(
          query,
          [localTime, pmVal, divisionVal, orgVal],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.response);
          }
        );
      });
      // console.log(response);
      return {
        localTime: localTime,
        pmVal: pmVal,
        divisionVal: divisionVal,
        orgVal: orgVal,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async UploadCsvDataToMySQL(filePath) {
    console.log("This is filepath: " + filePath);

    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
      .parse()
      .on("data", function (data) {
        csvData.push(data);
      })
      .on("end", function () {
        // Remove Header ROW
        csvData.shift();

        let query =
          "INSERT INTO aqm_table (time, pm25, division, organization) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });

        // delete file after saving to MySQL database
        fs.unlinkSync(filePath);
      });

    stream.pipe(csvStream);
  }
}
console.log(process.env.DBPORT);

module.exports = DbService;
