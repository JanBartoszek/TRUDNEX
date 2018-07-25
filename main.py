from flask import Flask, render_template
import logic

app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    testowa = logic.test()
    print(testowa)
    return render_template('boards.html')


@app.route("/test/<data>")
def test(data):
    print(data)
    

def main():
    app.run(debug=True, host='0.0.0.0')

if __name__ == '__main__':
    main()
