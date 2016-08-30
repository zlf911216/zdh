var express = require('express')
var upload = require('./requestHandlers')
var path = require('path')
var fs = require('fs')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var databases = require('./databases')
var TestModel = databases.TestModel
var app = express()


app.set('views', './views')
app.set('view engine', 'jade')
app.use('/jt', express.static('public'))
app.use(cookieParser());
app.use(require('body-parser').urlencoded({
	extended: true
}))


var server = app.listen(3000, '127.0.0.1', function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
})



function confirmation(req, res, url, next) {
	TestModel.findOne({
		'userId': req.cookies.userId
	}, function(err, re) {
		console.log(re)
		if (re == null || re.password != req.cookies.password) {
			res.redirect("/" + url);
		} else {
			next(req, res)
		}
	})
}

function goHome(req, res, url, home) {
	TestModel.findOne({
		'userId': req.cookies.userId
	}, function(err, re) {
		console.log(re)
		if (re == null || re.password != req.cookies.password) {
			res.render(url, {});
		} else {
			res.redirect("/" + home);
		}
	})

}

app.get('/index', function(req, res) {
	TestModel.findOne({
		'userId': req.cookies.UserId
	}, function(err, re) {
		if (re == null || re.password != req.cookies.password) {
			res.render('login');
		} else {
			var imglist = re.userImg
			res.render('index', {
				Img: imglist
			});
		}
	});
})

app.get('/blog', function(req, res) {
	res.render('myblog', {});
})

app.get('/login', function(req, res) {
	TestModel.findOne({
		'userId': req.cookies.UserId
	}, function(err, re) {
		if (re == null || re.password != req.cookies.password) {
			res.render('login');
		} else {
			var imglist = re.userImg
			res.render('index', {
				Img: imglist
			});
		}
	});
})

app.post('/loginin', function(req, res) {
	var ID = req.body.userid
	var pass = req.body.password
	var userID = new TestModel({
		userId: ID,
		password: pass,
	});
	userID.save(function(err) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		})
		if (err) {
			res.end("false");
			console.log('save failed');
		}
		res.end("true");
	});
})

app.get('/registered', function(req, res) {
	TestModel.findOne({
		'userId': req.body.userid
	}, function(err, re) {
		if (re == null || re.password != req.body.password) {
			res.render('registered');
		} else {
			var imglist = re.userImg
			res.render('index', {
				Img: imglist
			});
		}
	});
})

app.post('/index/upload', function(req, res) {
	upload.upload(res, req);
})
app.post('/getin', function(req, res) {
	console.log()
	TestModel.findOne({
		'userId': req.body.userid
	}, function(err, re) {
		if (re == null || re.password != req.body.password) {
			res.json(false)
		} else {
			res.json(true)
		}
	});
})

app.post('/index/introduced', function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	})
	var date = new Date()
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
	var hours = date.getHours()
	var minute = date.getMinutes()
	var seconds = date.getSeconds()

	function doubleNum(num) {
		if (num < 10) {
			num = "0" + num
		} else {
			num = num + ""
		}
		return num
	}

	var Day_file = doubleNum(year) + doubleNum(month) + doubleNum(day)
	var time_file = doubleNum(hours) + doubleNum(minute) + doubleNum(seconds)
	fs.exists('userFile/' + Day_file, function(err) {
		if (!err) {
			fs.mkdir('userFile/' + Day_file, function(err) {
				if (err)
					throw err
				console.log('当天目录创建成功')
			})
		}
		fs.exists('userFile/' + Day_file + "/" + time_file, function(err) {
			if (!err) {
				fs.mkdir('userFile/' + Day_file + "/" + time_file, function(err) {
					if (err)
						throw err
					console.log('当前时间目录创建成功')
					fs.mkdir('userFile/' + Day_file + "/" + time_file + "/js", function(err) {
						if (err)
							throw err
						console.log('js目录成功')
					})
					fs.writeFile('userFile/' + Day_file + "/" + time_file + "/my.html", req.body.message, function(err) {
						console.log('完成');
					})
				})
			} else {
				return
			}
		})
	})
	res.end("true");
})