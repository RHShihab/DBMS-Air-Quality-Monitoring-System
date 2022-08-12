const userId = document.querySelector("#userID");
const userPass = document.querySelector("#userPassword");

const logInButton = document.querySelector(".loginButton");

logInButton.addEventListener("click", logIn);

function logIn(e){
    e.preventDefault();
    console.log(userId.value);
    if(userId.value=="shihab" && userPass.value=="joss"){
        location.href = "admin.html";
    }
    else{

    }
}