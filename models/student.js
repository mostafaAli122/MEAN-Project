const mongoose = require('mongoose');
const Joi = require('joi');
const Student = mongoose.model('Student', new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required '],
        minlength: 8,
        maxlength: 8
    },
    age: {
        type: Number,
        min: 18,
        max: 60,
        required: [true, 'Age is Required ']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^[a-zA-Z0-9]+@[a-z]+\.+com+$/, 'Please fill a valid email address']
    }
}));

function validateStudent(student) {
    const schema = {
        name: Joi.string().min(8).max(8).required(),
        age: Joi.number().min(18).max(60).required().positive(),
        email: Joi.string().email().required()
    };
    return Joi.validate(student, schema);
}
exports.Student = Student;
exports.validate = validateStudent;