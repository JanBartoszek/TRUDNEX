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
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.readyState == "incorrect password"){
                    alert("incorrect password")
                } if else (this.readyState == "email doesn't exist"){
                    alert("email doesn't exist")
                } else {
                    alert(this.responseText)}
                // if (this.responseText == 'ok'){
                // return alert(this.responseText);

                    // domLogin.changeDom(dom.loadBoards);

                }

           }
        }

}