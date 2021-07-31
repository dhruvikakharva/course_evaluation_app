//this function handles routing of requests
module.exports = function (app) {
    //load the controller(s)
    var Comments = require('../controllers/Comment.server.controller');
    app.post('/thankyou',Comments.addComment);
    app.get('/displayComments', Comments.commentsByStudent);
};
