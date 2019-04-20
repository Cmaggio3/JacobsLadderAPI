
var mysql   = require("mysql");
var express = require("express");
var md5 = require("MD5");
var connection = require("../database");


 var addNewUser = function(req,res, next){
 	var date = new Date();
    var post  = {
	  UserID:req.body.UserID,
      email:req.body.email,
      password:md5(req.body.password),
	  UserFirstName:req.body.userFirstName,
	  UserLastName:req.body.userLastName,
	  SecurityQuestion:req.body.securityQuestion,
	  SecurityQuestionAnswer:md5(req.body.securityQuestionAnswer),
	  IsAdmin:req.body.isAdmin
      
  };
  console.log(post);
  		var query = "SELECT email FROM ?? WHERE ??=?";

		var table = ["User", "email", post.email];

		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query"});
		}
		else {

		if(rows.length==0){

			var query = "INSERT INTO  ?? SET  ?";
			var table = ["User"];
			query = mysql.format(query,table);
			connection.query(query, post, function(err,rows){
				if(err) {
					res.json({"Error" : true, "Message" : "Error executing MySQL query"});
				} else {
					res.json({"Error" : false, "Message" : "Success"});
				}
			});

		}
		else{
			res.json({"Error" : false, "Message" : "Email Id already registered"});
		}
		}
    });
	}

   module.exports = addNewUser;


