Following Technology Stack has been used to Develop this Project
1. ReactJS for Front End Development
2. MySQL for Database
3. Python Flask for REST API

Following Services haves been used to deploy 
1. AWS MySQL Server 
2. AWS EC2 instance running Flask REST API
3. AWS S3 Blob Storage for Static website Hosting
4. Google Firebase for Authenticating Users

Features of Application Deployed
1. User based To Do Tracker based on Mobile Number Verification
2. User can create new label/ bucket at the time of creation of new to do Item
3. When user wants a new Label user has to type the Label name and Select Create Label Option in the dropdown
4. On Successful creation of Item will be automatically assigned to that label
5. All user Labels will be displayed at left
6. User can update the status /label/title/description of a to do item by clicking pencil icon
7. User can delete a to do item by clicking cross icon positioned on top right of every to do item
8. If no to do item exists in a specific label the label will get deleted 

Steps to Test the Deployed Web Application

1. Hit url http://sagarkonda.todo.wedapp.s3-website.ap-south-1.amazonaws.com/
2. You will be asked for Mobile Number 
    a. If you want to test as pre configured dummy user
        i. Enter Mobile Number as 9999999999
        ii. When asked for OTP enter 123456
        iii. You will be Logged in to Application as that user
    b. In case you want to sign in with your Mobile Number
        i. Enter Mobile Number
        ii. Enter OTP Received
        iii. After Successful OTP verification user will be able to use application
 3. All To do Items will be Visible in ALL Section
 4. If any To do item is assigned a new label then new label will be displayed
 5. New label can be created at the time of creating a to do item


Steps to Run the project Locally
1. Clone the project
2. Navigate to Client Folder open Command Prompt
3. execute npm install this will install all dependencies
4. Naviagate to Server Folder and open Command Prompt
5. create virtual env using command python -m venv
6. execute .\venv\Scripts\activate
7. execute pip install -r requirements.txt
8. Open MySQL Server
9. execute the database.sql file
10. open config.py file and replace the required fields of MySQL Server
    a. host
    b. dnmae
    c. username
    d. password
11. now execute python main.py
12. Now you will be able to run the APP Locally
