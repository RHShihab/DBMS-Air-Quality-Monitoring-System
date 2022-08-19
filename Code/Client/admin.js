var divisionVal;
var pmVal;
var windVal;
var localTime;

const divisionValElem = document.getElementById("divisionBox");
const pmValElem = document.getElementById("pmBox");
const orgValElem = document.getElementById("organizationBox");

// Gets the division data when the value is changed in the text box
// and saves it to divisionVal
divisionValElem.addEventListener("change", function (e) {
  console.log("divisionBox", e.target.value);
  divisionVal = e.target.value;
});

pmValElem.addEventListener("change", function (e) {
  console.log("pmBox", e.target.value);
  pmVal = e.target.value;
});

orgValElem.addEventListener("change", function (e) {
  console.log("organizationBox", e.target.value);
  orgVal = e.target.value;
});

// event handler for the submit button.
// does "something" when the button is clicked
document
  .getElementById("dataSubmitButton")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Getting the local date in MYSQL format aka ISO Format
    var date = new Date();
    localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

    // Fetching the /insert URL and sending data to backend from the frontend form
    fetch("http://localhost:3000/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ localTime, pmVal, divisionVal, orgVal }),
    })
      .then((response) => response.json())
      .then((data) => insertRow(data["data"]));
  });

// function insertRow() {}
