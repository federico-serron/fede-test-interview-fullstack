from flask import Flask, request, jsonify, url_for, Blueprint
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import timedelta
from api.models import db, User, Task
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


bcrypt = Bcrypt()



task_bp = Blueprint("tasks", __name__)

# Allow CORS requests to this API
CORS(task_bp)

@task_bp.route('/', methods=['GET'])
@jwt_required()
def get_tasks():
    
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"error": "User not found"}), 404
    
    try:
        query = Task.query.filter(Task.user_id==user_id)
        tasks = query.all()
        
        return jsonify({"tasks": [task.serialize() for task in tasks]}), 200

    except Exception as e:
        return jsonify({"error": "Your request couldn't be completed"}), 500
    
    
@task_bp.route('/', methods=['POST'])
@jwt_required()
def add_task():
    user_id = get_jwt_identity()
    label = request.json.get('label')
    
    if not label or not user_id:
        return jsonify({"error": "All fields are mandatory"}), 400
    
    try:
        
        new_task = Task(label=label, completed=False, user_id=user_id)
        
        db.session.add(new_task)
        db.session.commit()
        
        return jsonify({"task": new_task.serialize()}), 201

    except Exception as e:
        return jsonify({"error": "Your request couldn't be completed"}), 500


@task_bp.route('/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    
    user_id = get_jwt_identity()
    label = request.json.get('label')
    completed = request.json.get('completed')
    
    if not label and completed != 'true' or completed != 'false':
        return jsonify({"error": "Missing required data"}), 400
    
    try:
        task = Task.query.filter_by(user_id=user_id, id=task_id).first()
        
        if not task:
            return jsonify({"error": "Task not found"}), 404
        
        if label:
            task.label = label
        if completed:
            task.completed = completed
            
        db.session.commit()            
    
        return jsonify({"task": task.serialize()}), 200

    except Exception as e:
        return jsonify({"error": "Your request couldn't be completed"}), 500
    
    
    
@task_bp.route('/<int:task_id>', methods=['DELETE'])
def delte_task(task_id):
    return jsonify({"msg": "Mensaje"}), 200