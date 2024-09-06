const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    website: String,
    name: String,
    password: String,
    userId: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'users' }, 
});

const Password = mongoose.model('passwords', passwordSchema);

module.exports= Password;



