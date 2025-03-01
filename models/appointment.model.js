const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    appointmentDateTime: { type: Date },
    symptoms: String,
    fees: { type: Number },
    prescription: String,
    isDiagnosisDone: Boolean
});

const appointmentModel = mongoose.model('appointment', appointmentSchema);

module.exports = appointmentModel;


// patientId: Reference to User (patient)
// doctorId: Reference to User (doctor)
// appointmentDateTime: DateTime
// symptoms: String
// fees: Number (updated by doctor after appointment)
// prescription: String (updated by doctor after appointment)
// isDiagnosisDone: Boolean (updated by doctor after appointment)