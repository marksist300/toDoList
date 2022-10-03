# Todo List
A Full-stack Todo List CRUD app designed so that I could have one consistent and always in sync todo list, which is available across all devices. It's a typical todo list in terms of design, but I added the possibility to follower others, so your todo list includes other people's too (functionality only possible through backend at the moment. This was initially added so that my girlfriend and I could share todos for things around the house, groceries etc., where we both have access to and read/write access to the same list).

**Link to project:** https://todo-list-app-fe.onrender.com

**App running in browser**
https://user-images.githubusercontent.com/88390425/193563045-67818c22-c0c9-4793-804d-60aba3f41bf8.mov


**App running on mobile**
https://user-images.githubusercontent.com/88390425/193563061-6e90a2c4-9342-471e-88a1-4a62f73c649b.mov


## How It's Made:

**Tech used:** NodeJS, Express, React, MongoDB + Mongoose, CSS
The app is orangised according to the MVC paradigm. The backend is built in Nodejs with express to set up the server, the DB is MongoDB, with mongoose used for schemas. The frontend is all react, with CSS used for styling. This was my first app using JWT's for authentication. I used bcrypt for password hashing and all api routes are protected and checked for authentication via JWT bearer token checks.

## Optimisations
This project was developed to help me practice my MERN stack skills as well as creating an app that would be genuinely beneficial for use in my daily life. This app is an MVP, it is functioning but there is a lot of room for optimisations. 
<br/>
Ideally I would like to add:
    <br/>
    -Add ability to follower others (to frontend): at the moment the abiltiy to follow others is only through the backend api
    <br/>
    -Add ability to remove followers: so users can see who follows their lists and can remove those they choose to
    <br/>
    -Add ability to accept or deny follow requests
    <br/>
    -Add ability to search for users on frontend.

## Lessons Learned:
There were many lessons in this project, it involved more use of React context and useReducer as well as developing custom hooks in react, which I'm improving my understanding and skills of. It was more practice implementing a fully organised MVC model for a project. I also had an oprtunity to implement JWT tokens for authentication which was fun and interesting.
