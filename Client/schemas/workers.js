var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 分类的表结构
module.exports =  new Schema({
    // 关联字段
    worker_name:String,
    worker_mobile:String,
    worker_address: String,
    worker_id: String,
    worker_password:String
});
//haha 