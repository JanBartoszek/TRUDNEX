from flask import Flask, render_template, request, session
import requests
import json
import logic

app = Flask(__name__)
app.secret_key = 'dupa'


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    # testowa = logic.test()
    # print(testowa)
    return render_template('boards.html')

    
@app.route("/test1", methods = ['POST'])
def test1():
    user_login_and_password = request.get_json()
    user_id = logic.get_user_id(user_login_and_password)
    if logic.check_user_login(user_login_and_password) == False :
        login_result = "email doesn't exist"
        return login_result
    if logic.check_user_login(user_login_and_password) == True and logic.check_user_password(user_login_and_password) == True:
        session['user:' + str(user_id)] = user_login_and_password['email']
        login_result = "ok"
        return login_result
    if logic.check_user_login(user_login_and_password) == True and logic.check_user_password(user_login_and_password) == False:
        login_result = "incorrect password"
        return login_result

# @app.route("/test1", methods = ['GET'])
# def test1view():
#     return 'abc'

def main():
    app.run(debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()
