from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from sqlalchemy import func
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from models import User, db, Message

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shuleni.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['JWT_SECRET_KEY'] = '123456'

migrate = Migrate(app, db)
db.init_app(app)
jwt = JWTManager(app)

cors = CORS(app)

api = Api(app)


# Registration
# Create a resource for User
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()  # Assuming the client sends JSON data

    # Extract data from the request
    name = data.get('Name')
    phone = data.get('Phone')
    email = data.get('Email')
    password = data.get('Password')
    role = data.get('Role')
    school= data.get('School')  

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


    # Create a new user object with the hashed password
    new_user = User(name=name, phone=phone, email=email,password=hashed_password, role=role, school=school)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201  

# login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('Email')
    password = data.get('Password')
    role = data.get('Role')

    user = User.query.filter_by(email=email, role=role).first() 

    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user.password):
            access_token = create_access_token(identity=user.id)
            return jsonify({'token': access_token}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# Protect a route with JWT authentication
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    current_user_id = get_jwt_identity()
    return jsonify({'message': f'Protected route accessed by user {current_user_id}'}), 200


# logout
@app.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    return jsonify({"message": "Logged out successfully"}), 200




# chat
class Messages(Resource):
    def get(self):
        messages = Message.query.order_by('created_at').all()
        return make_response(jsonify([message.to_dict() for message in messages]), 200)

    def post(self):
        data = request.get_json()
        message = Message(
            body=data['body'],
            username=data['username']
        )

        db.session.add(message)
        db.session.commit()

        return make_response(jsonify(message.to_dict()), 201)


class MessagesById(Resource):
    def patch(self, id):
        message = Message.query.filter_by(id=id).first()

        data = request.get_json()
        for attr, value in data.items():
            setattr(message, attr, value)

        db.session.add(message)
        db.session.commit()

        return make_response(jsonify(message.to_dict()), 200)

    def delete(self, id):
        message = Message.query.filter_by(id=id).first()

        db.session.delete(message)
        db.session.commit()

        return make_response(jsonify({'deleted': True}), 200)

api.add_resource(Messages, '/messages')
api.add_resource(MessagesById, '/messages/<int:id>')



#users
@app.route("/users", methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

# Route to create a new Student record
@app.route("/add-users", methods=['POST'])
def create_user():
    data = request.get_json()  # Assuming the client sends JSON data

    # Extract data from the request
    name = data.get('Name')
    phone = data.get('Phone')
    email = data.get('Email')
    password = data.get('Password')
    role = data.get('Role')
    school = data.get('School')  


    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


    # Create a new user object with the hashed password
    new_user = User(name=name, phone=phone, email=email,password=hashed_password, role=role, school=school)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201  

 
@app.route("/users/<int:id>", methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get(id)

    if not user:
        return make_response(jsonify({'error': 'User not found'}), 404)

    if 'name' in data:
        user.name = data['name']
    if 'phone' in data:
        user.phone = data['phone']
    if 'email' in data:
        user.email = data['email']
    if 'role' in data:
        user.role = data['role']
    if 'school' in data:  
        user.school = data['school']

    db.session.commit()

    return make_response(jsonify({'id': user.id, 'name': user.name,'phone': user.phone, 'email': user.email, 'role': user.role, 'school': user.school}), 200)

# Route to delete an existing Student record by ID
@app.route("/users/<int:id>", methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return make_response(jsonify({'error': 'User not found'}), 404)

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'})



if __name__ == '__main__':
    app.run(port=5555, debug=True)

    


