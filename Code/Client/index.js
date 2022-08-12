// function dataDao(){
// fetch("http://localhost:3000/").then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log(data);
// })
// }

// document.addEventListener("DOMContentLoaded", async function getDefaultData() {
//   const res = await fetch("http://localhost:3000/");
//   var obj = await res.json();
//   console.log("obj.data: "  + obj.data);
//   // drawCurveTypes(obj);
// });

export const getJsonData = async function getDefaultData() {
  const res = await fetch("http://localhost:3000/");
  obj = await res.json();
  console.log(obj.data);
  return obj.data;
  // drawCurveTypes(obj);
};

// document.addEventListener("DOMContentLoaded", function () {
//   fetch("http://localhost:3000/")
//     .then((response) => response.json())
//     .then((data) => drawCurveTypes(data));
// });


