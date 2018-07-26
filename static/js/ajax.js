let sendToServer = {

    sendLoginData: function () {
        var endpoint = '/test1'
        var dataFromLoginForm = domLogin.getLoginForm();
        var convertedDataFromLoginForm = logic.convertToJSON(dataFromLoginForm);
        this.sendToServer(endpoint, convertedDataFromLoginForm);
    },

    sendToServer: function (endpoint, dataToSend) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", endpoint, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataToSend);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);

                if (this.responseText == "incorrect password"){
                    alert("incorrect password");
                } 
                
                else if (this.responseText == "email doesn't exist") {
                    alert("email doesn't exist");
                } 
                
                else {
                    var boards = JSON.parse(this.responseText);
                    domLogin.removeLoginContainer();
                    dom.showBoards(boards);
                }

            }
        }

    },

                
    sendLoginDataRegister : function(){
        var endpoint = '/test2';
        var dataRegisterForm = domRegister.getRegisterForm();
        console.log(dataRegisterForm);
        var convertedDataFromLoginForm = logic.convertToJSON(dataRegisterForm);
        this.sendToServerRegister(endpoint, convertedDataFromLoginForm);
    },

    sendToServerRegister : function(endpoint, dataToSend){
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", endpoint, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataToSend);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("działa");
                }
                

            }

        },
}