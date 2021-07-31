//this function handles routing of requests
module.exports = function (app) {
    //load the controller(s)
    var Students = require('../controllers/student.server.controller');
    
    //handle the routing of get request to the route
    //by showing the login screen
    app.get('/', function (req, res) {
        //display login page
        res.render('index', { loginMessage: 'Dhruvika Kharva' });

    });
    app.get('/signin',function(req, res){
        res.render('signin',{ loginMessage: 'Please Login' });
    });

    app.get('/signup',function(req, res){
        res.render('signup',{ loginMessage: 'Sign Up Page' });
    });

    app.get('/display',Students.display);

    app.post('/signup',Students.create);
    app.post('/signin',Students.authenticate,);
};