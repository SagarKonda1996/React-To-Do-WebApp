from app import app
from flaskext.mysql import MySQL
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = "admin"
app.config['MYSQL_DATABASE_PASSWORD'] = "Lalitha123"
app.config['MYSQL_DATABASE_DB'] = "assessments"
app.config['MYSQL_DATABASE_HOST'] = "sagarkonda.cax8dj61eqhz.ap-south-1.rds.amazonaws.com"

# app.config['MYSQL_DATABASE_USER'] = "root"
# app.config['MYSQL_DATABASE_PASSWORD'] = "admin"
# app.config['MYSQL_DATABASE_DB'] = "assessments"
# app.config['MYSQL_DATABASE_HOST'] = "127.0.0.1"


mysql.init_app(app)