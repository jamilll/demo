from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

users = []

class user:
    def __init__(self, username, password) -> None:
        self.username = username
        self.password = password
    
    def updatePassword(self, newPassword):
        self.password = newPassword
    def toJSON(self):
        return json.dumps(dict(self), ensure_ascii=False)    

    def __str__(self):
        return ("username: " + self.username + "\npassword: " + self.password)
    def __iter__(self):
        yield from {
            'username': self.username,
            'password': self.password
        }.items()

errorMessage = {
    "message": "error",
    "value": ""
}



@app.route("/api/users", methods=["GET", "POST"])
@cross_origin()
def getHomePage():
    if (request.method == "POST"):
        print("new POST request")
        reqData = request.get_json()
        print(reqData)
        newuser = user(reqData["username"], reqData["password"])
        res = {
            "message": "success",
            "data": dict(newuser)
        }
        users.append(newuser)
        return jsonify(res), 200
    if(request.method == "GET"):
        print("new GET request")
        return jsonify(getJSONusers())

    errorMessage["value"] = "unauthorized request"
    return jsonify(errorMessage)


def getJSONusers():
    jsonusers = []
    for u in users:
        jsonusers.append(dict(u))
    return jsonusers    


if __name__ == "__main__":
    app.run(debug=True)