let sendToServer = {

    sendLoginData : function(){
        var endpoint = '/test1'
        var dataFromLoginForm = domLogin.getLoginForm();
        var convertedDataFromLoginForm = logic.convertToJSON(dataFromLoginForm);
        this.sendToServer(endpoint, convertedDataFromLoginForm);
    },

    sendToServer : function(endpoint, dataToSend){
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", endpoint, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataToSend);
    }

}