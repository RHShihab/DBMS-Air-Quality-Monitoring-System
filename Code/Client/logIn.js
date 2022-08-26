const userId = document.querySelector("#userID");
const userPass = document.querySelector("#userPassword");

const logInButton = document.querySelector(".loginButton");

logInButton.addEventListener("click", logIn);

function logIn(e){
    e.preventDefault();
    console.log(userId.value);
    if(userId.value=="admin" && userPass.value=="admin"){
        location.href = "admin.html";
    }
    else{

    }
}
document.querySelector(".homeButton").addEventListener("click", goHome);

function goHome(e){
    e.preventDefault();
    location.href = "index.html";
}