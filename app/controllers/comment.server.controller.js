var Student = require('mongoose').model('Student');
var Comment = require('mongoose').model('Comment');

exports.addComment = async function(req, res, next){
    var comment = new Comment(req.body);
    await Student.findOne({email:req.session.email},(err, student) => {
        if(err) { return getErrorMessage(err)}
        comment.student = student;
        //console.log(comment.student);

    });

    await comment.save(function(err, comment){
        if(err){
            return next(err);
        }
        else{
            console.log(comment);
            console.log('Comment Added');
            res.render('thankyou',{email : req.session.email})
        }
    });
}
exports.commentsByStudent = function (req, res, next) {
    var email = req.session.email;
    //find the student then its comments using Promise mechanism of Mongoose
    Student.findOne({ email: email }, (err, student) => {
        if (err) { return getErrorMessage(err); }
        
        req.id = student._id;
        console.log(req.id);
        }).then(function () {
        //find the posts from this author
        Comment.find({
            student: req.id
            }, (err, comments) => {
            if (err) { return getErrorMessage(err); }
            //res.json(comments);
            res.render('comments', {
                comments: comments, email: email, total : comments.length});
        });
    });
};