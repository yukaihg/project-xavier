var fs      = require("fs")
var config  = JSON.parse(fs.readFileSync("config.json"));
var Sequelize = require('sequelize');
var Resource = require(__dirname + '/resource.js').Resource;
var db = new Sequelize(
	config.mysqlDatabase["db-name"],	
	config.mysqlDatabase["user"],
	config.mysqlDatabase["password"],
	
	{
		port: config.mysqlDatabase["port"],
		host: config.mysqlDatabase["host"],		
	}
);


var Star = exports.Star = db.define('Star', {
	user: {type: Sequelize.STRING, allowNull:false},
	resource: {type: Sequelize.STRING, allowNull:false}
});

exports.starResource = function(userUUID, resourceUUID, callback){
	Star.find({where:{user:userUUID, resource: resourceUUID}}).success(function(star){
		if(star){
			callback("You have already starred this resource", null);
		}
		else{
			Star.create({user:userUUID, resource: resourceUUID}).success(function(star){
				callback(null, star);
			}).error(function(error){
				callback(error, null);
			})
		}
	}).error(function(error){
		callback(error, null);
	})
}


exports.unstarResource = function(userUUID, resourceUUID, callback){
	Star.find({where:{user:userUUID, resource: resourceUUID}}).success(function(star){
		if(star){
			star.destroy().success(function(result){
				callback(null, result);				
			}).error(function(error){
					callback(error, null);
			})
		}
		else{
			callback("No star for that resource", null);
		}
	}).error(function(error){
		callback(error, null);
	})
}

exports.getStarredResources = function(userUUID, callback){
	Star.findAll({where: {user:userUUID}}).success(function(resources){
		var resourceUUIDs = null;
		if(resources){
			resourceUUIDs = [];
			for(index in resources){
				resourceUUIDs.push(resources[index].resource);
			}
		}
		if(resourceUUIDs){
			Resource.findAll({where:{uuid:resourceUUIDs}}).success(function(resources){
				callback(null, resources);
			}).error(function(error){
				callback(error, null);
			})
		}
		callback("No starred resources found", null);
	}).error(function(error){
		callback(error, null);
	})
}