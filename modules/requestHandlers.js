var querystring = require("querystring")
var fs = require("fs")
var formidable = require("formidable")
var databases = require('./databases')
var TestModel = databases.TestModel

function upload(response, request) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/tempImg";
    form.multiples = true;
    form.parse(request, function(error, fields, files) {
        if (!files.upload) {
            console.log("无数据")
            return false
        }
        if (files.upload && files.upload[0]) {
            var message = files.upload
        } else {
            var message = [files.upload]
        }
        var allImg = [];
        var num = 0;
        message.forEach(function(filename) {
            var date = new Date();
            var now = date.getFullYear() +
                '' + (date.getMonth() + 1) +
                '' + date.getDate() +
                '' + date.getHours() +
                '' + date.getMinutes() +
                '' + date.getSeconds() +
                '' + date.getMilliseconds() +
                '-' + num;
            num += 1;
            switch (filename.type) {
                case "image/jpeg":
                    now = now + ".jpg";
                    break;
                case "image/png":
                    now = now + ".png";
                    break;
                default:
                    now = now + ".jpg";
                    break;
            }
            var nowUpload = "./public/userimg/" + now;
            fs.renameSync(filename.path, nowUpload);
            var thisImg = '/jt/userimg/' + now;
            allImg.push(thisImg);
            TestModel.update({
                'userId': request.cookies.UserId
            }, {
                $addToSet: {
                    userImg: thisImg
                }
            }, function(err) {})
        })
        var json = {
            "user": allImg
        }
        response.writeHead(200, {
            "Content-Type": "text/html"
        })
        response.end(JSON.stringify(json));
    });
}


exports.upload = upload;