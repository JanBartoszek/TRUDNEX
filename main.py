from flask import Flask, render_template, request
import logic

app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    testowa = logic.test()
    print(testowa)
    return render_template('boards.html')


@app.route("/test/<data>", methods=['GET', 'POST'])
def test(data):
    print(data)
    
    print(request.get_data())
    print(request.form.to_dict())
    dictio = request.form.to_dict()
    name = dictio['name']
    surname = dictio['surname']
    return name, surname


def main():
    app.debug = True
    app.run(host='0.0.0.0', port=5050)

if __name__ == '__main__':
    main()
