document.querySelector(".sendButton").addEventListener("click", sendMessage);

function sendMessage(e){
    e.preventDefault();
    var userName = "shihab_bhai"
    var message = document.querySelector(".messageBox").innerHTML;
    console.log(userName, message);
    createMessage(userName, message);
    document.querySelector(".messageBox").innerHTML = "";
}

function createMessage(userName, message){
    var chatBox = document.querySelector(".chat-box");

    const newMessageGroup = document.createElement("div");
    newMessageGroup.classList.add("message-group");
    
    // const newUserName = document.createElement("div");
    // newUserName.classList.add("d-flex flex-row justify-content-end me-3");
    // newUserName.innerText = userName

    newMessageGroup.innerHTML = "<div class=\"d-flex flex-row justify-content-end me-3\">"
    + userName
    + "</div><div class=\"d-flex flex-row justify-content-end mb-4\"><div class=\"p-3 border sentMessageBox\"><p class=\"small mb-0\">"
    + message+
    "</p></div></div>";

    chatBox.appendChild(newMessageGroup);
}