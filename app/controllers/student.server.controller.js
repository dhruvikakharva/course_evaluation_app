var Student = require('mongoose').model('Student');
//
// Create a new 'create' controller method
exports.create = async function (req, res, next) {
    // Create a new instance of the 'Student' Mongoose model
    var student = new Student(req.body); //get data from ejs page and attaches them to the model
    var session = req.session;
    console.log("body: " + req.body.email);

    await Student.findOne({email: student.email}, (err, students) => {
        console.log('Inside find one');
        if (err) {
            return next(err);
        }else{
            
    if(students !== null){
        console.log('Inside not null')
        res.json({ErrorMessage : 'Email is already registered'});
    }else{
        // Use the 'Student' instance's 'save' method to save a new student document
        student.save(function (err) {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Use the 'response' object to redirect
                session.email = student.email;
                res.render('submit_comments',{student : student});
            }
        });
    }
        }

    });
};

exports.authenticate = function(req, res, next) {
	// Get credentials from request body
    const { email, password } = req.body;
    var session = req.session;
    console.log("Email inside signin: " + email)
	//find the user with given email using static method findOne
	Student.findOne({email: email}, (err, student) => {
			if (err) {
				return next(err);
			} else {
                if(student === null){
                    console.log('Student id not registered.');
                    res.json({status:"error", message: "Invalid ID!!!"});
                }else{
                    console.log(student)
                    //compare passwords	
                    if(password === student.password) {
                        session.email = email;
                        res.render('submit_comments',{student : student});
                    } else {
                        res.json({status:"error", message: "Invalid password!!!",
                        data:null});
                    }
                }			
		}
		
	});
};

exports.display = function (req, res, next) {
    // Use the 'Student' static 'find' method to retrieve the list of students
    Student.find({}, (err, students) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('students', {
                title: 'List All Students',
                students: students
            });
        }
    });
};