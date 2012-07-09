//TODO: map result to Question model

var queryES = require('../../../controller/queryES.js');
var question = require('../../../models/question.js');
var comment = require('../../../models/comment.js');

//NOTE**
//for types, 0 = presenter, 1 = accent

//////////////////////////////////////////////////////////////////////////////////////////////////
// Questions 
//////////////////////////////////////////////////////////////////////////////////////////////////


//*****************GET a question***********************
//@params: questionID, type, callback
/*
queryES.getQuestion('aJfznhseQuOicWWAjx7F00', 1, function(result){
	console.log(result);
});
*/

//*****************GET all question*********************

//@params: type, callback
/*
queryES.getAllQuestion(0, function(result){
	console.log(JSON.stringify(result));
})
*/
//*****************GET all question by user uuid********
/*
NOTE:
For testing purposes we are using username INSTEAD of user uuid,
so that results are meaningful
*/

//@params: userID, type, callback
/*
queryES.getAllQuestionByUserID('jbo1', 0, function(result){
	//You should get 2 sets of result
	//console.log('Found: ' + result.total);
	//console.log(JSON.stringify(result.hits));

	console.log(result);
})
*/

//*****************SEARCH all based on project type*****
var searchString = 'fuk dwntwn';

//@params: search string, type, callback
/*
queryES.searchAll(searchString, 0, function(result){
	console.log('Found: ' + result);
	console.log(JSON.stringify(result));
})
*/


//*****************ADD a question***********************
//Question model takes in uuid, user, title, body, category, timestamp
var question = new question('someUserUUID', 'This is the question i asked', 'dddd','life');

//@params: question model, type, callback
/*
queryES.addQuestion(question, 0, function(){	
	console.log("Question added, check ES");
});
*/

//*****************FOLLOW a question***********************
//Question model takes in (questionID, userID, type, category)

//@params: question model, type, callback
/*
queryES.addFollower('pJfzndwdadddQuOicWWAjx7F00', 'dddddddd', 0, function(result){
	console.log("Follower added, check ES");
	console.log(result);
});
*/

//*****************UPDATE a question**********************
//@params: questionID, questionBody, type, callback
/*
queryES.updateQuestion('f3228370-8726-4893-bbc2-100db9308dc1', 'ddddd', 'some descriddd', 0, function(result){
	console.log("Question updated, check ES: " + result._id);
});
*/

//*****************DELETE a question***********************
//@params: questionID, type, callback
/*
queryES.deleteQuestion('someuidlololol', 0, function(result){
	console.log("Question deleted");
})
*/

//****************UPDATE question status*******************
//@params: questionID
/*
 queryES.updateStatus('pJfzndwdadddQuOicWWAjx7F00', 0, function(result){
 	console.log(result)
 })
*/

//////////////////////////////////////////////////////////////////////////////////////////////////
// Comments 
//////////////////////////////////////////////////////////////////////////////////////////////////

//*****************GET a comment***********************
//@params: commentID, type, callback
/*
queryES.getComment('aJfzggggguOicWWAjx7F05', 1, function(result){
	console.log(result);
});
*/

//*****************GET a comment by target_uuid***********************
//@params: target_uuid, appType, callback
/*
queryES.getCommentByTarget_uuid('pJfznhheQuOicWWAjx7F00', 0, function(result){
	console.log('Found: ' + result.total);
	console.log(JSON.stringify(result.hits));
});
*/

//*****************GET all question*********************

//@params: type, callback
/*
 queryES.getAllComment(0, function(result){
 console.log(JSON.stringify(result));
 })
 */

//*****************GET all comments by user uuid********

//@params: userID, type, callback
/*
queryES.getAllCommentByUserID('mcs3', 1, function(result){
	//You should get 2 sets of result
	console.log('Found: ' + result.total);
	console.log(JSON.stringify(result.hits));
})
*/

//*****************ADD a comment***********************
//Comment model takes in (target_uuid, user, objectType, title, body, timestamp)

var comment = new comment('0226148e-1d4d-4e4d-a54c-9a14486d41bf', 'snsd6', 'presenter', 'About dancing', 'Dancing time...', '2012-05-07');

//@params: comment model, type, callback
/*
queryES.addComment(comment, 0, function(){
	console.log("Comment added, check ES");
});
*/

//*****************UPDATE a comment**********************
//@params: commentID, commentTitle, commentBody, appType, callback
/*
queryES.updateComment('8b67e304-af4b-4d57-a325-0e8b4e7e9237', 'dreamworks', 'shrek', 0, function(result){
	console.log("Comment updated, check ES");
	console.log(result);
});
*/

//*****************DELETE a comment***********************
//@params: commentID, type, callback
/*
queryES.deleteComment('universal', 0, function(result){
	console.log("Comment deleted");
	console.log(result);
})
*/

//*****************Append a commentID to a question***********************
//
// Ignore appendCommentID and deleteCommentID for now.
// This needs to be discussed together.
//
//@params: questionID, commentID, type, callback
/*
queryES.appendCommentID("","", type, function(result) {
	console.log("CommentID appended to the Question");
	console.log(result);
});
*/

//*****************Delete a commentID from a question***********************
//@params: questionID, commentID, callback
/*
queryES.deleteCommentID("","", function(result) {
	console.log("CommentID deleted from the Question");
	console.log(result);
});
*/

//*****************Update comment's vote***********************
//@params: commentID, direction, type, callback
/*
queryES.updateVote('zzz123', 1, 0, function(result) {
	console.log("Comment vote updated");
	console.log(result);
});
*/

//*****************Update comment's isAnswered***********************
//@params: commentID, appType, callback
/*
queryES.updateIsAnswered('qJfznhheQuOicWWAjx7F05', 0, function(result) {
	console.log("Comment isAnswered updated");
	console.log(result);
});
*/
