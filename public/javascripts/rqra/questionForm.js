var rqra = new coreApi.Presenter();

function PostQuestion() {
	var questionTitle = document.getElementById("questionField").value;
	var questionBody = document.getElementById("descriptionField").value;
	rqra.createQuestion(questionTitle, questionBody, '', 0, function(data) {
		console.log(data);
		
		if (data && data.errorcode === 0) {
			document.location.href = "/question/" + data.question._id;
		}
	});
}