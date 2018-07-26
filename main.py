import data_manager
import json
from flask import Flask, render_template, request, session
import requests
import logic

app = Flask(__name__)
app.secret_key = 'dupa'

@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')



@app.route("/test/<data>", methods=['GET', 'POST'])
def test(data):
    print(data)  # this is data passed through link
    
    print(request.get_data())
    print(request.form.to_dict())   # this is data passed through XHRrequest.open()
    dictio = request.form.to_dict()
    name = dictio['name']
    surname = dictio['surname']
    result = name + surname
    jsonrray = json.dumps(dictio)
    print(jsonrray)
    return jsonrray


@app.route("/getBoards", methods=['GET', 'POST'])
def getBoards():
    boardsDict = data_handler.getBoards()
    boardsJson = json.dumps(boardsDict)
    return boardsJson

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
        login_result = logic.get_boards(user_id)
        login_result_jsoned = json.dumps(login_result)
        return login_result_jsoned
    if logic.check_user_login(user_login_and_password) == True and logic.check_user_password(user_login_and_password) == False:
        login_result = "incorrect password"
        return login_result

# @app.route("/test1", methods = ['GET'])
# def test1view():
#     return 'abc'

def main():
    app.debug = True
    app.run(host='0.0.0.0', port=5050)

if __name__ == '__main__':
    main()
