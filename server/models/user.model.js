const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String, //hashed,
}, {
    timestamps: true
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
