from flask import json,request,jsonify
from mongoengine.errors import DoesNotExist
from otakugram import app,login_manager
from otakugram.models import Users
from flask_login import current_user,login_user,logout_user
from werkzeug.security import generate_password_hash,check_password_hash

@app.route("/api/get-users",methods=["GET"])
def getusers():
    if current_user.is_authenticated:
        return current_user.username,200
    users=Users.objects()
    users_json={"users":[]}
    for user in users:
        users_json["users"].append(user.to_json())
    return jsonify(users_json)


@app.route("/api/register-user",methods=["POST"])
def registeruser():
    user_json=request.get_json()
    user=Users(name=user_json["name"],username=user_json["username"],email=user_json["email"],password=generate_password_hash(user_json["password"]))
    user.save()
    return "User Added",201

@app.route("/api/login-user",methods=["POST"])
def loginuser():
    user_json=request.get_json()
    if current_user.is_authenticated:
        return "Already logged in.",400
    try:
        user=Users.objects(username=user_json["username"]).get()
        if check_password_hash(user['password'],user_json["password"]):
            login_user(user)
            return "User logged in.",200
        else:
            return "username/password combination incorrect",400
    except DoesNotExist:
        return "User does not exist.",400
        
@app.route("/api/logout-user",methods=["GET"])
def logoutuser():
    if current_user.is_authenticated:
        logout_user()
    return "User Logged Out.",200


@login_manager.user_loader
def load_user(username):
    u = Users.objects(username=username).first()
    if not u:
        return None
    return u