from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from sqlalchemy import func
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


from models import User, db, Message, School

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

# ------------------------------------User----------------------------------------------------
class Users(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        return jsonify(user_list)
    
    

    # def post(self):
    #     data = request.get_json()

    #     name = data.get('Name')
    #     phone = data.get('Phone')
    #     email = data.get('Email')
    #     password = data.get('Password')
    #     role = data.get('Role')
    #     school = data.get('School')

    #     hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    #     new_user = User(name=name, phone=phone, email=email, password=hashed_password, role=role, school=school)
    #     db.session.add(new_user)
    #     db.session.commit()

    #     return jsonify({"message": "User registered successfully"}), 201


@app.route('/users', methods=['POST'])
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
class Login(Resource):
    def post(self):
        data = request.json
        email = data.get('Email')
        password = data.get('Password')
        role = data.get('Role')

        user = User.query.filter_by(email=email, role=role).first()

        if user:
            if bcrypt.checkpw(password.encode('utf-8'), user.password):
                access_token = create_access_token(identity=user.id)
                return {'token': access_token}, 200  # Return a dictionary

        return {'message': 'Invalid credentials'}, 401  # Return a dictionary


class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)

        if user:
            return jsonify(user.to_dict())

        return make_response(jsonify({"error": "User not found"}), 404)
   

    def put(self, id):
        user = User.query.get(id)

        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)

        data = request.get_json()

        if data is None:
            return make_response(jsonify({'error': 'Invalid JSON data'}), 400)

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

        return jsonify(user.to_dict())

    def delete(self, id):
        user = User.query.get(id)

        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)

        db.session.delete(user)
        db.session.commit()

        return jsonify({'message': 'User deleted successfully'})

api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Login, '/login')



# --------------------------------------Chat-----------------------------------------------------
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


# -----------------------------------------School--------------------------------------------------

   
class Schools(Resource):
    
    def get(self):
        schools = School.query.all()
        school_list = []
        
        for school in schools:
            school_dict = {
                'id': school.id,
                'school_name': school.school_name,
                'poster': school.poster,
                'location': school.location,
                'created_at': school.created_at,
            }
            school_list.append(school_dict)
        
        return make_response(jsonify(school_list), 200)
    
    def post(self):
        data = request.get_json()
        new_school = School(
            school_name=data.get('school_name'),
            poster=data.get('poster'),
            location=data.get('location'),
        )
        db.session.add(new_school)
        db.session.commit()
        
        new_school_dict = {
            'id': new_school.id,
            'school_name': new_school.school_name,
            'poster': new_school.poster,
            'location': new_school.location,
            'created_at': new_school.created_at,
        }
        return make_response(jsonify(new_school_dict), 200)

class SchoolById(Resource):
    
    def get(self, id):
        school = School.query.get(id)
        
        if school:
            school_dict = {
                'id': school.id,
                'school_name': school.school_name,
                'poster': school.poster,
                'location': school.location,
                'created_at': school.created_at,
            }
            return make_response(jsonify(school_dict), 200)
        else:
            return make_response(jsonify({"error": "School not found"}), 404)
        
    def put(self, id): 
        school = School.query.get(id)
        
        if school:
            data = request.get_json()
            
            for attr, value in data.items():
                setattr(school, attr, value)
                
            db.session.commit()
            
            school_dict = {
                'id': school.id,
                'school_name': school.school_name,
                'poster': school.poster,
                'location': school.location,
                'created_at': school.created_at,
            }
            return make_response(jsonify(school_dict), 200)
        else:
            return make_response(jsonify({"error": "School not found"}), 404)

    def delete(self, id):
        school = School.query.get(id)
        
        if school:
            db.session.delete(school)
            db.session.commit()
            
            return make_response(jsonify({"message": "School deleted successfully"}), 200)
        else:
            return make_response(jsonify({"error": "School not found"}), 404)

api.add_resource(Schools, '/schools')
api.add_resource(SchoolById, '/schools/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

    


