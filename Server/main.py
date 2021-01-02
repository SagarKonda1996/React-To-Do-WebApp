import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request
from werkzeug.exceptions import HTTPException
import jwt


def getAll(conn,userid):
    try:
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * from todolist where userid=%s",(userid))
        query_result = cursor.fetchall()
        return query_result
    except Exception as e:
        return exception_raised(e)
def createResponse(query_result=[]):
    try:
        response={}
        response['todolist']=query_result
        response['labels']=list(set([item['label'] for item in query_result]))
        response=jsonify(response)
        response.status_code = 200
        return response
    except Exception as e:
        return exception_raised(e)

def decodeToken(token):
    data=jwt.decode(token[len('Bearer '):],options={"verify_signature": False})
    userid=data.get('phone_number','')
    return userid

@app.route('/todo', methods=['POST'])
def add_item():
    cursor=None
    try:
        _json = request.json
        title = _json['title']
        description = _json['description']
        label=_json.get('label','My List')
        token=request.headers.get('Authorization','')
        userid=decodeToken(token)      
        print(userid,title,description,label)  
        if title and description and request.method == 'POST':			
            sqlQuery = "INSERT INTO todolist(userid,title,description,label) VALUES(%s, %s, %s, %s)"
            bindData = (userid,title, description,label)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            query_result = getAll(conn,userid)
            response=createResponse(query_result)
            return response
        else:
            return not_found()
    except Exception as e:
        return exception_raised(e)
    finally:
        if cursor!=None:
            cursor.close() 
            conn.close()
        
@app.route('/todo/<string:label>')
def get(label):
    cursor=None
    try:
        token=request.headers.get('Authorization','')
        userid=decodeToken(token)    
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * from todolist where userid=%s and label=%s",(userid,label))
        query_result = cursor.fetchall()
        response=createResponse(query_result)
        return response
    except Exception as e:
        return exception_raised(e)
    finally:
        if cursor!=None:
            cursor.close() 
            conn.close()
@app.route('/todo')
def get_all():
    cursor=None
    try:
        token=request.headers.get('Authorization','')
        userid=decodeToken(token)    
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * from todolist where userid=%s",(userid))
        query_result = cursor.fetchall()
        response=createResponse(query_result)
        return response
    except Exception as e:
        return exception_raised(e)
    finally:
        if cursor!=None:
            cursor.close() 
            conn.close()		
# @app.route('/emp/<int:id>')
# def emp(id):
# 	try:
# 		conn = mysql.connect()
# 		cursor = conn.cursor(pymysql.cursors.DictCursor)
# 		cursor.execute("SELECT id, name, email, phone, address FROM rest_emp WHERE id =%s", id)
# 		empRow = cursor.fetchone()
# 		respone = jsonify(empRow)
# 		respone.status_code = 200
# 		return respone
# 	except Exception as e:
# 		print(e)
# 	finally:
# 		cursor.close() 
# 		conn.close()

@app.route('/todo/<int:id>', methods=['PUT'])
def update_todo(id):
    cursor=None
    try:
        _json = request.json
        title = _json['title']
        description = _json['description']
        label=_json['label']
        status=_json['status']
        token=request.headers.get('Authorization','')
        userid=decodeToken(token)
        if status!=None and title and description and label and userid and request.method == 'PUT':			
            sqlQuery = "UPDATE todolist SET title=%s,description=%s,label=%s,status=%s WHERE userid=%s and id=%s"
            bindData = (title,description,label,status,userid,id)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            query_result = getAll(conn,userid)
            response=createResponse(query_result)
            return response
        else:
            return not_found()
    except Exception as e:
        return exception_raised(e)
    finally:
        if cursor!=None:
            cursor.close() 
            conn.close()

@app.route('/todo/<int:id>', methods=['DELETE'])
def delete_todo(id):
    cursor=None
    try:
        _json = request.json
        token=request.headers.get('Authorization','')
        userid=decodeToken(token)
        if id and userid and request.method == 'DELETE':			
            sqlQuery = "DELETE from todolist WHERE id=%s and userid=%s"
            bindData = (id,userid)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            query_result = getAll(conn,userid)
            response=createResponse(query_result)
            return response
        else:
            return not_found()
    except Exception as e:
        return exception_raised(e)
    finally:
        if cursor!=None:
            cursor.close() 
            conn.close()

@app.route('/labels/<string:oldlabel>', methods=['PUT'])
def add_label(oldlabel):
    cursor=None
    try:
        _json = request.json
        newlabel = _json['label']
        token=request.headers.get('Authorization','')
        userid=decodeToken(token)
        if newlabel and userid and request.method == 'PUT':			
            sqlQuery = "UPDATE todolist SET label=%s WHERE userid=%s and label=%s"
            bindData = (newlabel,userid,oldlabel)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            query_result = getAll(conn,userid)
            response=createResponse(query_result)
            return response
        else:
            return not_found()
    except Exception as e:
        return exception_raised(e)
    finally:
        if cursor!=None:
            cursor.close() 
            conn.close()



@app.errorhandler(HTTPException)
def exception_raised(exception='',status_code=500):
    message={
        'status':status_code,
        'message': 'Internal server error' + str(exception),
    }
    respone = jsonify(message)
    respone.status_code = status_code
    return respone		
@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone
		
if __name__ == "__main__":
    app.run(debug=True)
