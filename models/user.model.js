const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true, required:true},
    mobileNumber: String,
    password: {type:String, required:true},
    role: {type:String, enum:['admin', 'doctor', 'patient'], default:'patient'},
    specialization: {type:String,enum:['nerves', 'heart', 'lungs', 'skin'] },
    availableDays: {type:String, enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

// name: String
// email: String (Unique)
// mobileNumber: String
// password: String (hashed using bcrypt)
// role: Enum (admin, doctor, patient)
// specialization: Enum (nerves, heart, lungs, skin) (only for doctors)
// availableDays: Array of Enum (Sun, Mon, Tue, Wed, Thu, Fri, Sat) (only for doctors)