
var UserNotification = require('../models/userNotification.js').UserNotification;
var User             = require('../models/user.js').User;
var email            = require('emailjs');
var fs      = require("fs");
var config  = JSON.parse(fs.readFileSync("config.json"));
var server = email.server.connect({
			 user     : config.emailsettings.user
			,password : config.emailsettings.password
			,host     : config.emailsettings.host
			,ssl      : config.emailsettings.ssl
		});
var debug = false;

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return i;
       }
    }
    return -1;
}
var apps = ["accent", "RQRA", "Engage"];
var waitTime = [/*"now", */"day"/*, "week", "month"*/];

function compileEmail( arr ){
	User.find({ where: { UUID: arr[0].user}}).success( function( user ){
		if ( user != null ) {
			console.log( user.email );
			var i = 0;
			var str = "";
			str+=("You have "+arr.length+ " " + arr[0].app + " notification(s)\n==================\n");
			for (; i < arr.length; i++){
				str+=( i+") "+arr[i].description +"\n");
			}
			str+=("\n\n Thanks for using our service,\n\tSFU Mobile team\n\n");
			console.log( str );
		
			if ( !debug ) {
			var message = {
   				text:    str,
   				from:    config.emailsettings.from,
   				to:      user.firstName+ " " +user.lastName+"<"+user.email+">",
   				subject: arr[0].app + " daily notification(s)"
		 	};
		
		 	server.send(message, function(err, message){
		 		console.log(err || message);
		  	});
		  	} else {
		  	
		  	}
		}
		
	});
	
}

function notifications( appType, waitTime ){
	UserNotification.findAll( {where: { app:appType, emailSent: 0, wait:waitTime}}).success( function( notifications){
		if ( notifications ){
			var dataLength = 0;
			var data = new Array();
			var users = new Array();
			var length = notifications.length;
			var i = 0;
			for (; i < length; i++){
				var s = notifications[i].user;
				var index = contains( users, s );
				if ( index === -1 ){
					users.push( s);
					data.push(new Array());
					data[dataLength++].push(notifications[i]);
				} else {
					data[index].push(notifications[i]);	
				}
			}
			for ( i = 0; i < data.length; i++){
				compileEmail( data[i] );
			}
		}
	});
}
var i = 0;
for( i = 0; i < apps.length; i++){
	notifications( apps[i], "day");
}
