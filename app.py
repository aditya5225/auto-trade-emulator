from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def tradePage():
    historyData = []

    return render_template("index.html", historyData=historyData)


if __name__ == '__main__':
    app.run(debug=True)
