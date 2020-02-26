var express = require('express');
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'thenathanists_treasurehunt'
})

con.connect(function(error) {
	var user = "bleh";
	if(!!error) {
		console.log("Error");
	} else {
		console.log("Connected "+user);
	}
})

function register(username,password){
	app.get('/', function(req, resp) {
	con.query("SELECT userID FROM tablelogin WHERE username = '"+username+"';", function(error,rows,fields) {
		// callback
		if(!!error) {
			console.log('Query error');
			// erorr logging
			console.log(error);
		} else {
			console.log('Query success');
			if (rows.length >= 1) {
				console.log('User already registered');
			} else {
				con.query("INSERT INTO tablelogin (`username`,`password`) VALUES ('"+username+"','"+password+"');",function(error,rows,fields) {
					if(!!error){
						console.log('Query erorr');
						console.log(error);
					} else {
						console.log('Account Registered');
						resp.send('Account Registered');
					}
				})
			}
		}
	});
});
}


//app.get('/', function(req, resp) {
//	con.query("SELECT * FROM tablelogin WHERE 1;", function(error,rows,fields) {
//		// callback
//		if(!!error) {
//			console.log('Query error');
//			// erorr logging
//			console.log(error);
//		} else {
//			console.log('Query success');
//			resp.send(rows);
//		}
//	});
//});

app.listen(1337);

register('matej2','pass12');