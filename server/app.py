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

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


    # Create a new user object with the hashed password
    new_user = User(name=name, phone=phone, email=email,password=hashed_password, role=role)
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

    user = User.query.filter_by(email=email, role=role).first()  # Check role

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
@app.route('/messages', methods=['GET', 'POST'])
def messages():
    if request.method == 'GET':
        messages = Message.query.order_by('created_at').all()

        response = make_response(
            jsonify([message.to_dict() for message in messages]),
            200,
        )
    
    elif request.method == 'POST':
        data = request.get_json()
        message = Message(
            body=data['body'],
            username=data['username']
        )

        db.session.add(message)
        db.session.commit()

        response = make_response(
            jsonify(message.to_dict()),
            201,
        )

    return response

@app.route('/messages/<int:id>', methods=['PATCH', 'DELETE'])
def messages_by_id(id):
    message = Message.query.filter_by(id=id).first()

    if request.method == 'PATCH':
        data = request.get_json()
        for attr in data:
            setattr(message, attr, data[attr])
            
        db.session.add(message)
        db.session.commit()

        response = make_response(
            jsonify(message.to_dict()),
            200,
        )

    elif request.method == 'DELETE':
        db.session.delete(message)
        db.session.commit()

        response = make_response(
            jsonify({'deleted': True}),
            200,
        )

    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)

    


