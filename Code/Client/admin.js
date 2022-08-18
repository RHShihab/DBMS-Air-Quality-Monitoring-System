var divisionVal;
var pmVal;

const divisionValElem = document.getElementById("divisionBox");
const pmValElem = document.getElementById("pmBox");

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

// event handler for the submit button.
// does "something" when the button is clicked
document.getElementById("dataSubmitButton").addEventListener("click", function(e) {
    e.preventDefault();
    console.log(divisionVal, pmVal); // something
});