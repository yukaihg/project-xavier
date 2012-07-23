var ES = require('../controller/queryES.js');
var Course = require('../models/course.js');
var async = require('async');
var User = require('../models/user.js');
var Star = require('../models/star.js');
var UserProfile = require('../models/userProfile.js');



//take a week number, return a range of date
var weekHelper = exports.weekHelper = function(weekNumber){
	Date.prototype.yyyymmdd = function() {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
		var dd  = this.getDate().toString();
		return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' +(dd[1]?dd:"0"+dd[0]); // padding
	};



	var semesterStart = new Date('2012-05-07T07:00:00.000Z');   //this is UTC time
	var firstWeekEnd = new Date(semesterStart.getTime() + (6 - semesterStart.getDay())*24*60*60*1000); //notice sunday is the first day of week here
	var startDate = new Date();
	var endDate = new Date();
	var oneWeek = 7*24*60*60*1000;
	if (weekNumber === 1){
		return {start:semesterStart.yyyymmdd(),end:firstWeekEnd.yyyymmdd()};
	}
	else{
		var weekStart = new Date( firstWeekEnd.getTime()+ (weekNumber-2)* oneWeek);
		var weekEnd  =  new Date( firstWeekEnd.getTime()+ (weekNumber-1)* oneWeek);
		return {start:weekStart.yyyymmdd(), end:weekEnd.yyyymmdd()};


	}
}

//this function add the needed second level deatials into json object, use it from REST level code.
var resourceHelper = exports.resourceHelper = function(currentUser,resources,callback){

	var parsedResult;
	async.series({
		findCourseInfo:function (callback) {
			async.forEach(resources, function (resource, callback) {
				Course.selectCourse({'uuid':resource.course}, function (error, course) {
					if (course) {
						resource.course = course;
					}
					callback();
				})

			}, function (err) {
				callback(err)
			})

		},

		findUserInfo:function (callback) {
			async.forEach(resources, function (resource, callback) {

					User.selectUser({"uuid":resource.user}, function (error, user) {
						if (user) {
							resource.user = user;
						}
						callback();
					});
				},
				function (err) {

					callback(err)
				})


		},
		// notice we cannot directly attach to json a totalcomments because it's a squalize object
		// so we need to stringfy first then parse....so hacky...
		findUserProfile: function(callback){
			parsedResult = JSON.parse(JSON.stringify(resources));
			async.forEach(parsedResult, function (resource, callback) {

					UserProfile.getUserProfile(resource.user.uuid, function (error, profile) {
						if (profile) {
							resource.user.avatar = profile.profilePicture;
						}
						callback();
					});
				},
				function (err) {

					callback(err)
				})
		},

//		findSectionId:function (callback) {
//			parsedResult = JSON.parse(JSON.stringify(resources));
//			async.forEach(parsedResult , function (resource, callback) {
//
//					SectionMaterial.findSectionIdByMaterialId({"material":resource.uuid}, function (err, result) {
//						if (result) {
//							resource.section = result.section;
//						}
//						callback(err);
//					});
//				},
//				function (err) {
//
//					callback(err)
//				})
//
//		},
//
//		findSectionInfo:function (callback){
//			async.forEach(parsedResult , function (resource, callback) {
//
//					Section.findSectionById({"uuid":resource.section}, function (err, result) {
//						if (result) {
//
//							resource.section = result;
//						}
//						callback(err);
//					});
//				},
//				function (err) {
//					callback(err)
//				})
//
//		},



		findTotalComments:function (callback) {


			async.forEach(parsedResult, function (resource, callback) {
					ES.getCommentCount(2, resource.uuid, function (err, result) {

						resource.totalComments = result;


						callback();
					})
				}
				, function (err) {
					callback(err)
				})
		}
		,
		findIsStarred:function (callback) {


			async.forEach(parsedResult, function (resource, callback) {
					Star.isResourceStarred({user:currentUser, resource:resource.uuid},function(err,result){
						if  (result){
							resource.starred = true
						}
						else{

							resource.starred = false;
						}

						callback(err);



					})

				}
				, function (err) {
					callback(err)
				})
		}


	}, function(err){


		callback(null, parsedResult);

	}) ;


}