1.
node createUsers.js

2. 
node app.js

3. Postman:
As student:
POST http://localhost:8080/auth/login
{
    "username": "student01",
    "password": "student123"
}

As Admin:
POST http://localhost:8080/auth/login
{
    "username": "admin01",
    "password": "admin123"
}

Student Event Reg
POST http://localhost:8080/registrations
Header: Bearer

{
    "eventId": "67c917290357ade5694b4043"
}