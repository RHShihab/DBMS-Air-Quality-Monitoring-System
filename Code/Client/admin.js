var divisionVal;
var pmVal;
var windVal;
var localTime;

const divisionValElem = document.getElementById("divisionBox");
const pmValElem = document.getElementById("pmBox");
const orgValElem = document.getElementById("organizationBox");
const uploadCsvElem = document.getElementById("uploadFileButton");
const dateElem = document.getElementById("datePicker");

// event handler for the submit button.
// does "something" when the button is clicked
document
  .getElementById("dataSubmitButton")
  .addEventListener("click", function (e) {
    e.preventDefault();

    var divisionVal = divisionValElem.value;
    var pmVal = pmValElem.value;
    var orgVal = orgValElem.value;
    // Getting the local date in MYSQL format aka ISO Format
    if (dateElem.value != null) {
      localTime = dateElem.value;
    } else {
      var date = new Date();
      localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
    }

    // Fetching the /insert URL and sending data to backend from the frontend form
    fetch("http://localhost:3000/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ localTime, pmVal, divisionVal, orgVal }),
    }).then((response) => response.json());
    alert("Data is updated!");
    // location.href = "admin.html";
  });

  document
  .getElementById("seeMessage")
  .addEventListener("click", function (e) {
    e.preventDefault();
    location.href = "groupChat.html";
  });