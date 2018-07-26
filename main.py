from flask import Flask, render_template, request
import requests
import json
import logic

app = Flask(__name__)


@app.route("/", methods = ["GET"])
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    # testowa = logic.test()
    # print(testowa)
    return render_template('boards.html')


# @app.route("/test/<data>")
# def test(data):
#     print(data)
    
@app.route("/test", methods = ['POST'])
def test1():
    data1 = request.get_json()
    print(data1)
    return "1"

def main():
    app.run(debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()
