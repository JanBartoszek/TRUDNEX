from flask import Flask, render_template, request
import data_handler

app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    testowa = data_handler.test()    # this was just to test db connection
    print(testowa)
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
    print(result)
    return result


def main():
    app.debug = True
    app.run(host='0.0.0.0', port=5050)

if __name__ == '__main__':
    main()
