var coreApi = {}
coreApi._construct = function()
{

	function Accent()
	{

	}

	function Engage()
	{

	}

	function Presenter()
	{

		this.createQuestion = function( questionTitle, questionBody,callback){
			console.log("API - createQuestion");

			var body = {};
			var question = {};
			question.id = '3946000';
			question.body = questionBody;
			question.category = 'sss';
			question.status = 'unanswered';
			question.title = questionTitle;
			question.timestamp = '2008-10-21';
			question.followup = [];
			body.question = question;



			$.ajax({
				//url : '/api/user/'+user_id+'/questions',
				url : '/api/question',
				type: 'POST',
				dataType: 'json',
				contentType: "application/json",
				data : JSON.stringify(body),
				success: function(data){
					callback(data);

				}

			})

		}

		this.getAllQuestions = function(callback){
			console.log("API - getAllQuestions");
			$.ajax({
				url: '/api/questions',
				type: 'GET',
				success: function(data) {
					callback(data);
				}
			});
		}

		this.getQuestionById = function(id,callback){
			console.log("API - getQuestionById");
			$.ajax({
				url: '/api/question/'+id,
				type: 'GET',
				success: function(data) {
					callback(data);
				}
			});
		}

		this.updateQuestionById = function(id, questionTitle, questionBody ,callback){
			console.log("API - updateQuestionById");
			var body= {};
			body.questionTitle = questionTitle;
			body.questionBody = questionBody;
			$.ajax({
				url: '/api/question/'+id,
				type: 'PUT',
				dataType: 'json',
				contentType: "application/json",
				data : JSON.stringify(body),
				success: function(data) {
					callback(data);
				}
			});
		}



		this.deleteQuestionById = function(id,callback){
			console.log("API - deleteQuestionById");
			$.ajax({
				url: '/api/question/'+id,
				type: 'DELETE',
				success: function(data) {
					callback(data);
				}
			});
		}


		this.getQuestionsByUserId = function(user_id,callback){
			console.log("API - getQuestionsByUserId");
			$.ajax({
				url: '/api/user/'+user_id+'/questions',
				type: 'GET',
				success: function(data) {
					callback(data);
				}
			});
		}

		this.searchQuestion = function(query, callback){
			console.log("API - searchQuestion");
			var body = {};
			body.query = query;
			$.ajax({
				url : '/api/search/',
				type: 'POST',
				dataType: 'json',
				contentType: "application/json",
				data : JSON.stringify(body),
				success: function(data) {
					callback(data);
				}


			})


		}

	}




	this.Accent = Accent;
	this.Engage = Engage;
	this.Presenter = Presenter;
}

coreApi._construct();

//
//var xx = new coreApi.Presenter();
////xx.getQuestionById('pJfzndwdadddQuOicWWAjx7F00',function(data){
////
////	console.log(data);
////
////});
//
//xx.updateQuestionById('pJfzndwdadddQuOicWWAjx7F00', "i have no clue!!!" ,function(data){
//
//	console.log(data);
//
//});