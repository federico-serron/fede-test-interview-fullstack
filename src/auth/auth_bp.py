from flask import Flask, request, jsonify, url_for, Blueprint
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import timedelta
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.blacklist import BLACKLIST


bcrypt = Bcrypt()



auth_bp = Blueprint("auth", __name__)

# Allow CORS requests to this API
CORS(auth_bp)


@auth_bp.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")

    if not username or not email or not password:
        return jsonify({"error": "All the fields are required"}), 400

    try:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return (
                jsonify({"error": "Email already in use, please try a different one"}),
                400,
            )

        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        new_user = User(username=username, email=email, password=password_hash)

        db.session.add(new_user)
        db.session.commit()

        return jsonify(new_user.serialize()), 201
    except Exception as e:
        return jsonify({"error": "Your request couldn't be completed"}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"error": "All the fields are required"}), 400

    try:

        login_user = User.query.filter_by(email=email).first()
        if not login_user:
            return jsonify({"error": "User not found"}), 404

        password_from_db = login_user.password
        password_is_correct = bcrypt.check_password_hash(password_from_db, password)

        if password_is_correct:
            expires = timedelta(minutes=30)

            user_id = login_user.id
            access_token = create_access_token(identity=str(user_id), expires_delta=expires)

            return jsonify({"token": access_token, "user": login_user.serialize()}), 200

        else:
            return jsonify({"error": "User and/or password incorrect"}), 401

    except Exception as e:
        return jsonify({"error": "Your request couldn't be completed"}), 500
    
    

@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    
    try:
        jti = get_jwt()["jti"]
        BLACKLIST.add(jti)
        return jsonify({"msg": "Logeed out successfully"}), 200
        
    except Exception as e:
        return jsonify({"error": "Your request couldn't be completed"}), 500