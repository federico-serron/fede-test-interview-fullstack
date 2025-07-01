from flask import Flask, request, jsonify, url_for, Blueprint
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


bcrypt = Bcrypt()
jwt = JWTManager()


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
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")

    if not username or not email or not password:
        return jsonify({"msg": "All the fields are required"}), 400

    try:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return (
                jsonify({"msg": "Email already in use, please try a different one"}),
                400,
            )

        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        new_user = User(username=username, email=email, password=password_hash)

        db.session.add(new_user)
        db.session.commit()

        return jsonify(new_user.serialize()), 201
    except Exception as e:
        return jsonify({"msg": "Your request couldn't be completed"}), 500
