from codecs import register
from collections import defaultdict
from os import name

from . import db,login_manager
from flask_login import UserMixin
import datetime
import uuid

class Users(UserMixin,db.Document):
    name=db.StringField()
    username=db.StringField(primary_key=True)
    #mongo db makes _id as a unique objectId by default but you cant access it
    #as a filter as _id is not a class variable for Users. So I made username as 
    #primary key so that the _id value becomes username and user_loader will give username
    #as a parameter so you can successfully filter your mongoengine objects.
    email=db.EmailField()
    password=db.StringField()
    registered_on=db.DateTimeField(default=datetime.datetime.utcnow)

    def to_json(self):
        return{
            "name":self.name,
            "username":self.username,
            "email":self.email,
            "password":self.password,
            "registered_on":self.registered_on,
        }