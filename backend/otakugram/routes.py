from flask import json,request,jsonify
from mongoengine.errors import DoesNotExist
from otakugram import app,login_manager
from otakugram.models import Users
from flask_login import current_user,login_user,logout_user
from werkzeug.security import generate_password_hash,check_password_hash

@app.route("/api/check-username/<username>",methods=["GET"])
def checkusername(username):
    try:
        user=Users.objects(username=username).get()
        if user:
            return "username exists",400
    except DoesNotExist:
        return "username does not exist",200


@app.route("/api/register-user",methods=["POST"])
def registeruser():
    user_json=request.get_json()
    useremail=Users.objects(email=user_json["email"]).first()
    userusername=Users.objects(username=user_json["username"]).first()
    if useremail:
        return "Email Already Registered",400
    elif userusername:
        return "Username Already Taken",400
    else:
        user=Users(name=user_json["name"],username=user_json["username"],email=user_json["email"],password=generate_password_hash(user_json["password"]))
        user.save()
        return "Signed Up Successfully",201

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
        print("User logged out.")
    return "User Logged Out.",200


@login_manager.user_loader
def load_user(username):
    u = Users.objects(username=username).first()
    if not u:
        return None
    return u