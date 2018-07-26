let domLogin = {
    createLoginContainer: function(){
        var loginContainer = document.createElement("div");
        loginContainer.setAttribute("id","loginContainer");
        loginContainer.setAttribute("class", "fluid-container");
        document.body.appendChild(loginContainer);

        document.getElementById("loginContainer").innerHTML = '<button id = "loginBtn" onClick = "domLogin.removeLoginContainer(domRegister.createRegisterContainer)">Register</button>'
        +'<p id = "login" class = "paragraph">Log in</p>'
        +'<div class="d-flex justify-content-center">'
        + '<div id = "login-form" class="form-signin">'
            + '<span id="reauth-email" class="reauth-email"></span>'
            + '<input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>'
            + '<input type="password" id="inputPassword" class="form-control" placeholder="Password" required>'
            + '<div id="remember" class="checkbox">'
            //    + '<label>'
            //        + '<input type="checkbox" value="remember-me"> Remember me'
            //    + '</label>'
            + '</div>'
            + '<button  onClick ="sendToServer.sendLoginData()" class="btn btn-lg btn-primary btn-block btn-signin" >Sign in</button>'
        + '</div><!-- /form -->'
        // + '<a href="#" class="forgot-password">'
        //    + 'Forgot the password?'
    + '</div><!-- /card-container -->"'
    
    },

    removeLoginContainer: function(){
        var loginContainer = document.getElementById("loginContainer");
        loginContainer.parentNode.removeChild(loginContainer);
        // callback()
        
    },

    changeDom: function(callback){
        this.removeLoginContainer();
        callback();

    },

    getLoginForm: function(){
   
        var email = document.getElementById("inputEmail").value;
        var password = document.getElementById("inputPassword").value;
        var userEmailAndPassword = { email : email, password : password };
        return userEmailAndPassword;
    },

}
