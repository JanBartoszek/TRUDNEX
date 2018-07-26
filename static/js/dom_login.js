let domLogin = {
    createLoginContainer: function(){
        var loginContainer = document.createElement("div");
        loginContainer.setAttribute("id","loginContainer");
        loginContainer.setAttribute("class", "fluid-container");
        document.body.appendChild(loginContainer);

        document.getElementById("loginContainer").innerHTML = '<div class="card card-container">' +
        '<!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->' 
        + '<img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />'
        + '<p id="profile-name" class="profile-name-card"></p>'
        + '<div id = "login-form" class="form-signin">'
            + '<span id="reauth-email" class="reauth-email"></span>'
            + '<input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>'
            + '<input type="password" id="inputPassword" class="form-control" placeholder="Password" required>'
            + '<div id="remember" class="checkbox">'
               + '<label>'
                   + '<input type="checkbox" value="remember-me"> Remember me'
               + '</label>'
            + '</div>'
            + '<button  onClick ="sendToServer.sendLoginData()" class="btn btn-lg btn-primary btn-block btn-signin">Sign in</button>'
        + '</div><!-- /form -->'
        + '<a href="#" class="forgot-password">'
           + 'Forgot the password?'
        + '</a>'
    + '</div><!-- /card-container -->"'
    
    },

    removeLoginContainer: function(){
        var loginContainer = document.getElementById("loginContainer");
        loginContainer.parentNode.removeChild(loginContainer);
        
    },

    changeDom: function(callback){
        this.removeLoginContainer();
        callback();

    },

    getLoginForm: function(){
        var formContent = document.getElementById("login-form");
        var email = document.getElementById("inputEmail").value;
        var password = document.getElementById('inputPassword').value; 
        var userEmailAndPassword = { email : email, password : password };
        return userEmailAndPassword;
    },

}
