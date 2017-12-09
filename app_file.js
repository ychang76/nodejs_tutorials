var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var fs = require('fs');
var app = express();
app.locals.pretty = true
app.set('views', './views_file');
app.set('view engine', 'pug');
app.get('/upload', function(req, res){
	res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
	res.send('Uploaded: '  + req.file.filename);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/topic/new', function(req, res){
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.render('new', {topics: files});
	});
});
app.get(['/topic', '/topic/:id'], function(req, res){
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		var id = req.params.id;
		if(id){
			fs.readFile('data/' + id, 'utf8', function(err, data){
				if(err){
					console.log(err);
					res.status(500).send('Internal Server Error');
				}
				res.render('view', {topics: files, title: id, description: data});
			});
		} else {
			res.render('view', {topics: files, title: 'Welcome', description: 'Node.js Tutorials'});			
		}
	});
});
// app.get('/topic/:id', function(req, res){
// 	var id = req.params.id;
// 	fs.readdir('data', function(err, files){
// 		if(err){
// 			console.log(err);
// 			res.status(500).send('Internal Server Error');
// 		}
// 		fs.readFile('data/' + id, 'utf8', function(err, data){
// 			if(err){
// 				console.log(err);
// 				res.status(500).send('Internal Server Error');
// 			}
// 			res.render('view', {topics: files, title: id, description: data});
// 		});
// 	});
// });
app.post('/topic', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile('data/' + title, description, function(err){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.redirect('/topic/' + title);
	});
})
app.listen(3000, function(){
	console.log('Connected, 3000 port!');
});