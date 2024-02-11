// server.js
/********************************************************************************
* WEB700 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Kashish Kohli Student ID: 141827238 Date: 10/02/2024
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require('path');
const collegeData = require(path.join(__dirname, 'modules', 'collegeData.js'));

// Initialize collegeData
collegeData.initialize()
    .then(() => {
        // setup http server to listen on HTTP_PORT
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.error("Error initializing collegeData:", err);
    });

// Routes

// GET /students
app.get("/students", (req, res) => {
    collegeData.getAllStudents()
        .then(students => {
            res.json(students);
        })
        .catch(() => {
            res.status(404).json({ message: "no results" });
        });
});

// GET /students?course=value
app.get("/students", (req, res) => {
    const course = req.query.course;
    if (course) {
        collegeData.getStudentsByCourse(course)
            .then(students => {
                res.json(students);
            })
            .catch(() => {
                res.status(404).json({ message: "no results" });
            });
    } else {
        res.status(400).json({ message: "Course parameter missing" });
    }
});

// GET /tas
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(tas => {
            res.json(tas);
        })
        .catch(() => {
            res.status(404).json({ message: "no results" });
        });
});

// GET /courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(courses => {
            res.json(courses);
        })
        .catch(() => {
            res.status(404).json({ message: "no results" });
        });
});

// GET /student/num
app.get("/student/:num", (req, res) => {
    const num = req.params.num;
    collegeData.getStudentByNum(num)
        .then(student => {
            res.json(student);
        })
        .catch(() => {
            res.status(404).json({ message: "no results" });
        });
});

// GET /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// GET /about
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// GET /htmlDemo
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});


// Handle 404
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

