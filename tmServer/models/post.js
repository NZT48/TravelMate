var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = Schema({
    text: String,
    destination: String,
    created_at: String,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Post', PostSchema);
