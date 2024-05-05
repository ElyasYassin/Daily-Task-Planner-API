/*
CSC3916 HW4
File: Server.js
Description: Web API scaffolding for Movie API
 */

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authJwtController = require('./auth_jwt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var User = require('./Users');
var Task = require('./Tasks');
require("dotenv").config
const {OpenAI} = require("openai");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

function getJSONObjectForMovieRequirement(req) {
    var json = {
        headers: "No headers",
        key: process.env.UNIQUE_KEY,
        body: "No body"
    };

    if (req.body != null) {
        json.body = req.body;
    }

    if (req.headers != null) {
        json.headers = req.headers;
    }

    return json;
}


router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please include both username and password to signup.'})
    } else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        
        user.save(function(err){
            if (err) {
                if (err.code == 11000)
                    return res.status(401).send({ success: false, message: 'A user with that username already exists.'});
                else
                    return res.json(err);
            }
            res.json({success: true, msg: 'Successfully created new user.'})
        });
    }
});

router.post('/signin', function (req, res) {
    var userNew = new User();
    userNew.username = req.body.username;
    userNew.password = req.body.password;

    User.findOne({ username: userNew.username }).select('name username password').exec(function(err, user) {
        if (err) {
            res.send(err);
        }

        try {
            user.comparePassword(userNew.password, function(isMatch) {
                if (isMatch) {
                    var userToken = { id: user.id, username: user.username };
                    var token = jwt.sign(userToken, process.env.SECRET_KEY);
                    res.json ({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed.'});
                }
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: 'Internal server error.' });
        }
    })
});

router.route('/tasks')
    .get((req, res) => {
        const currentDate = new Date() ; // Get the current date
        currentDate.setDate(currentDate.getDate() - 1);
        const LastDayOfWeek = new Date(); // Get the last day of the week
        LastDayOfWeek.setDate(currentDate.getDate() + 6);

        const conditions = {
            Duedate: {
              $gte: currentDate, // Greater than or equal to the current date
              $lt: LastDayOfWeek // Less than or equal to 6 days after the current date
            }
          };
          
        Task.find(conditions, (err, tasks) => {
            if (err) {
              console.error('Error fetching tasks:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.status(200).json(tasks); // Send the tasks as a JSON response
            }
          })
        })
    .post((req, res) => {
        //Creates tasks
        var task = new Task();

        task.Title = req.body.title;
        task.userID = req.body.userID;
        task.Description = req.body.Description;
        task.Duedate = req.body.Duedate;
        task.Duetime = req.body.Duetime;
        task.TaskCompletion = req.body.TaskCompletion;
        task.Status = req.body.Status;


        console.log(task.Title);
        task.save(function(err){
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists.'});
                else
                    return res.json(err);
            }
            res.json({success: true, msg: 'Successfully created new user.'})
        });
        
    })
    .put(authJwtController.isAuthenticated, (req, res) => {
        //Updates tasks

    })
    .delete(authJwtController.isAuthenticated, (req, res) => {
        //Deletes Tasks

        //res.status(405).send({ message: 'HTTP method not supported.' });
    })
    .all((req, res) => {
        // Any other HTTP Method
        // Returns a message stating that the HTTP method is unsupported.
        res.status(405).send({ message: 'HTTP method not supported.' });
    });

    app.post("/tasks/recommendation" , async (req, res) => {
        message = "Generate 3 daily task recommendations that have to be related to these tasks but different and useful for the user (Return in array format with title and description properties): " + req.body.data
        console.log(message)
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message}]  ,
                max_tokens: 200
            });
            res.status(200).json(response.choices[0].message.content);
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                error: error.response
                    ? error.response.data
                    : "There was an issue on the server"
            })
        }
    });
    



app.use('/', router);
app.listen(process.env.PORT || 5000);
module.exports = app; // for testing only





