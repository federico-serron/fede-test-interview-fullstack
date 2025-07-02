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
    if user_id is None:
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
    
    if label is None or user_id is None:
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
    
    if label is None and completed is None:
        return jsonify({"error": "Missing required data"}), 400
    
    try:
        task = Task.query.filter_by(user_id=user_id, id=task_id).first()
        
        if task is None:
            return jsonify({"error": "Task not found"}), 404
        
        if label is not None:
            task.label = label
        if completed is not None:
            task.completed = completed
            
        db.session.commit()            
    
        return jsonify({"task": task.serialize()}), 200

    except Exception as e:
        return jsonify({"error": "Your request couldn't be completed"}), 500
    
    
    
@task_bp.route('/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    
    user_id = get_jwt_identity()
    if user_id is None:
        return jsonify({"error": "User not found"}), 404        
    
    try:
        task = Task.query.filter_by(user_id=user_id, id=task_id).first()
        
        if task is None:
            return jsonify({"error": "Task not found"}), 404
        
        db.session.delete(task)
        db.session.commit()
        
        return jsonify({"msg": "Task succesfully deleted"}), 200
        
    except Exception as e:
        return jsonify({"error": "Your request couldn't be completed"}), 500