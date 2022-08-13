const mysql = require("mysql");
const dotenv = require("dotenv");
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

// const query = "SELECT * FROM userData.empInfo;";
// connection.query(query, (err, res) => {
//   if (err) {
//     throw err;
//   } else {
//     return console.log(res);
//   }
// });

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT time, pm25, avgTemperature, rainPrecipitation, relativeHumidity FROM datasheet.aqm_table LIMIT 50;";
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

  async getSelectedData(startDate, endDate){
    // var startDate = "'2017-01-10'";
    // var endDate = "'2017-02-10'";
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT time, pm25, avgTemperature, rainPrecipitation, relativeHumidity FROM datasheet.aqm_table WHERE time BETWEEN '"
        + startDate + "' AND '" + endDate + "'";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
console.log(process.env.DBPORT);

module.exports = DbService;
