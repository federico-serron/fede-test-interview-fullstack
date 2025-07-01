from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

auth_bp = Blueprint("auth", __name__)

# Allow CORS requests to this API
CORS(auth_bp)


@auth_bp.route("/hello", methods=["POST", "GET"])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@auth_bp.route("register", methods=["POST"])
def register():
    pass
