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
          "SELECT date, pm25 FROM (SELECT * FROM mydb.weather_station_data_table ORDER BY date DESC LIMIT 50) AS latestData ORDER BY date;";
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

  async getRouteWiseData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM mydb.mobile_sensor_data_table;";
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

  async getAqiCardData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT ws.location, pm25, rainPrecipitation, windSpeed, visibility, date FROM weather_station_data_table wsData, "+
        "weather_station_table ws, "+
        "data_source_table ds "+
        "WHERE wsData.dsID = ds.dsID AND ws.wsDsID = ds.dsID AND ws.location = 'dhaka' "+
        "ORDER BY date DESC LIMIT 1;";
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
}

console.log(process.env.DBPORT);

module.exports = DbService;
