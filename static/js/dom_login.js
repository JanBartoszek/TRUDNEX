let domLogin = {
    createLoginContainer: function(){
        var loginContainer = document.createElement("div");
        loginContainer.setAttribute("id","loginContainer");
        loginContainer.setAttribute("class", "fluid-container");
        document.body.appendChild(loginContainer);

        document.getElementById("loginContainer").innerHTML = '<button id = "loginBtn" onClick = "domLogin.removeLoginContainer(domRegister.createRegisterContainer)">Register</button>'
        +'<p id = "login" class = "paragraph">Log in</p>'
        +'<div class="d-flex justify-content-center">'
        // +'<!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->' 
        // + '<img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />'
        + '<p id="profile-name" class="profile-name-card"></p>'
        + '<form id = "sign" class="form-signin">'
            + '<span id="reauth-email" class="reauth-email"></span>'
            + '<input type="email" id="inputEmail" class="form-control" placeholder="Email address" >'
            + '<input type="password" id="inputPassword" class="form-control" placeholder="Password" >'
        //     + '<div id="remember" class="checkbox">'
        //        + '<label>'
        //            + '<input type="checkbox" value="remember-me"> Remember me'
        //        + '</label>'
        //     + '</div>'
            + '<button  onClick ="ajaxTest.ajaxPostForm()" class="btn btn-lg btn-primary btn-block btn-signin">Sign in</button>'
        + '</form><!-- /form -->'
        // + '<a href="#" class="forgot-password">'
        //    + 'Forgot the password?'
        // + '</a>'
    + '</div><!-- /card-container -->"'
    
    },

    removeLoginContainer: function(callback){
        var loginContainer = document.getElementById("loginContainer");
        loginContainer.parentNode.removeChild(loginContainer);
        callback()
        
    },

    changeDom: function(callback){
        this.removeLoginContainer();
        callback();

    }
}








let ajaxTest = {

    getLogin: function(){
        var formContent = document.getElementById("sign");
        var email = formContent.elements["inputEmail"].value;
        var user = { email : email };
        return user;
    },

    convertToJSON : function(){
        var convertedUser = JSON.stringify(this.getLogin());
        return convertedUser;
    },

    ajaxPostForm: function(){
        var convertedUser = this.convertToJSON();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              alert("działa");
            }
              else {
                  alert ("nie działa");
           }
        };
        xhttp.open("POST", "/", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(convertedUser);
        alert(xhttp)


        }

    }