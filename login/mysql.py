from flask import Flask, json, jsonify, request, session
from flaskext.mysql import MySQL
import  pymysql
from datetime import  datetime
from flask_cors import CORS
from flask_bcrypt import  Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
import os
from datetime import timedelta
from flask_login import LoginManager
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
login = LoginManager(app)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'sayedali'
# app.config['MYSQL_DATABASE_DB'] = 'sample1'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'



app.config['JWT_SECRET_KEY'] = 'secrett'

mysql = MySQL ()
mysql.init_app (app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.route('/users/register', methods=['POST'])
def registry():
    conn = mysql.connect ()
    # print(conn)
    cursor = conn.cursor (pymysql.cursors.DictCursor)
    # print(cursor)
    first_name = request.get_json()['first_name']
    last_name = request.get_json ()['last_name']
    email = request.get_json ()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password'])
    created = datetime.utcnow()
    # print(first_name)
    query_string = "INSERT into sample1.Users (first_name, last_name, email, password, created) VALUES (%s,%s,%s,%s,%s)"
    val = (first_name,last_name,email,password,created)

    cursor.execute (query_string, val)
    # print (cursor)
    conn.commit()
    result = {
        "first_name" : first_name,
        "last_name" : last_name,
        "email" : email,
        "password" : password.decode("utf-8"),
        "created" : created,
    }
    print(result)
    resp = jsonify(result)
    resp.status_code = 200
    # print(resp)
    # return jsonify({"result": result})
    return resp

@app.route('/users/login', methods=['POST'])
def login():
    conn = mysql.connect ()
    cursor = conn.cursor (pymysql.cursors.DictCursor)
    email = request.get_json ()['email']
    password = request.get_json ()['password']
    result = ""
    query_string = "SELECT * FROM sample1.Users WHERE email = %s"
    cursor.execute (query_string, (email))
    rv = cursor.fetchall ()

    if rv:
        if bcrypt.check_password_hash(rv[0]['password'], password):
            print(email)
            print(rv[0]["email"])
            access_token = create_access_token(identity={'first_name': rv[0]["first_name"], 'last_name': rv[0]["last_name"], 'email': rv[0]["email"]})
            result = jsonify({'token': access_token})
            session.permanent = True
            app.permanent_session_lifetime = timedelta (minutes=1)
        else:
            # print(rv[0]["email"])
            result = jsonify ({"error": "Invalid username and password"})
    else:
        # print(rv[0]["email"])
        result = jsonify({"error": "Invalid email and password"})

    return result

@app.route('/customer_metadata', methods=['POST','GET'])
@cross_origin()
def customer_metadata():
    try:

        conn = mysql.connect ()
        cursor = conn.cursor (pymysql.cursors.DictCursor)
        dc = request.get_json ()['dc']

        result = ""
        query_string = "SELECT * FROM opconfigdb.customer_metadata WHERE hosted_datacenter = %s"
        cursor.execute (query_string, (dc))
        result = cursor.fetchall ()

        return jsonify(result)
        # return jsonify(rows)
    except Exception as e:
        print(e)
    finally:
        conn.close()


if __name__ == "__main__":
    app.secret_key = os.urandom (12)
    app.run (debug=True, host='0.0.0.0', port=6000)