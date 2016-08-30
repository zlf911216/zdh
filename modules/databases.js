var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/zlf")


db.connection.on("error", function(error) {
	console.log("数据库连接失败:" + error);
});
db.connection.on("open", function() {
	console.log("——数据库连接成功！——");
});



var TestSchema = new mongoose.Schema({
	userId: String,
	password: String,
	userImg: Array,
	update: {
		type: Date,
		default: Date.now()
	}
});

TestSchema.pre('save', function(next) {
	var _this = this
	mongoose.model("User", TestSchema).findOne({
		'userId': _this.userId
	}, function(err, re) {
		if (re != null) {
			return
		} else {
			next();
		}
	});
})


exports.TestModel = mongoose.model("User", TestSchema);