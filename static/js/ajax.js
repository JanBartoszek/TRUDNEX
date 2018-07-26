let sendToServer = {

    sendToServer : function (endpoint, dataToSend, callback) {
        var xhttp = new XMLHttpRequest();
        var response_object;
        xhttp.open("POST", endpoint, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataToSend);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.readyState == this.responseText) {
                    alert("incorrect password");
                } else if (this.readyState == "email doesn't exist") {
                    alert("email doesn't exist");
                } else {                 
                    alert(this.responseText);
                    response_object = JSON.parse(this.responseText);
                }
            }
        }
        callback(response_object)
    },
    
    
    sendLoginData : function(){
        var endpoint = '/test1'
        var dataFromLoginForm = domLogin.getLoginForm();
        var convertedDataFromLoginForm = logic.convertToJSON(dataFromLoginForm);
        this.sendToServer(endpoint, convertedDataFromLoginForm, dom.showBoards);
    },
    
    this_is_function_to_print_out_XHR_responce_text : function (response_object) {

    },
}