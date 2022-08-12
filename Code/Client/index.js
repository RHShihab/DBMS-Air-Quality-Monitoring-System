export const getJsonData = async function getDefaultData() {
  const res = await fetch("http://localhost:3000/");
  var obj = await res.json();
  // console.log("here: " + obj.data);
  return obj.data;
  // drawCurveTypes(obj);
};

const startElem = document.getElementById("lineStartDate");
const endElem = document.getElementById("lineEndDate");
// const endElem = document.getElementById('end');
var startDate;
var endDate;

startElem.addEventListener("change", function (e) {
  console.log("start", e.target.value);
  startDate = e.target.value;
});

endElem.addEventListener("change", function (e) {
  console.log("end", e.target.value);
  endDate = e.target.value;
});

document.getElementById("reloadLineChart").onclick = function () {
  getSelectedData(startDate, endDate);
};

async function getSelectedData(startDate, endDate) {
  console.log(startDate + endDate);
  var data = { startDate, endDate };
  console.log(data);

  const res = await fetch("http://localhost:3000/selectedDate", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
