let domLogin = {
    createLoginContainer: function(){
        var loginContainer = document.createElement("div");
        loginContainer.setAttribute("id","loginContainer");
        loginContainer.setAttribute("class", "fluid-container");
        document.body.appendChild(loginContainer);

<<<<<<< HEAD
        document.getElementById("loginContainer").innerHTML = '<div class="card card-container">' +
        '<!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->' 
        + '<img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />'
        + '<p id="profile-name" class="profile-name-card"></p>'
=======
        document.getElementById("loginContainer").innerHTML = '<button id = "loginBtn" onClick = "domLogin.removeLoginContainer(domRegister.createRegisterContainer)">Register</button>'
        +'<p id = "login" class = "paragraph">Log in</p>'
        +'<div class="d-flex justify-content-center">'
>>>>>>> Css
        + '<div id = "login-form" class="form-signin">'
            + '<span id="reauth-email" class="reauth-email"></span>'
            + '<input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>'
            + '<input type="password" id="inputPassword" class="form-control" placeholder="Password" required>'
            + '<div id="remember" class="checkbox">'
            //    + '<label>'
            //        + '<input type="checkbox" value="remember-me"> Remember me'
            //    + '</label>'
            + '</div>'
<<<<<<< HEAD
            + '<button  onClick ="sendToServer.sendLoginData()" class="btn btn-lg btn-primary btn-block btn-signin">Sign in</button>'
        + '</div><!-- /form -->'
        + '<a href="#" class="forgot-password">'
           + 'Forgot the password?'
        + '</a>'
=======
            + '<button  onClick ="sendToServer.sendLoginData()" class="btn btn-lg btn-primary btn-block btn-signin" >Sign in</button>'
        + '</div><!-- /form -->'
        // + '<a href="#" class="forgot-password">'
        //    + 'Forgot the password?'
>>>>>>> Css
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

    },

    getLoginForm: function(){
<<<<<<< HEAD
        var formContent = document.getElementById("login-form");
        var email = document.getElementById("inputEmail").value;
        var password = document.getElementById('inputPassword').value; 
=======
   
        var email = document.getElementById("inputEmail").value;
       console.log(email);
        var password = document.getElementById("inputPassword").value;
>>>>>>> Css
        var userEmailAndPassword = { email : email, password : password };
        return userEmailAndPassword;
    },

}
