const { Student, validate } = require('../models/student');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const students = await Student.find().sort({ name: 1 });
    res.send(students);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let student = new Student({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    });
    student = await student.save();
    res.send(student);
});

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const student = await Student.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }, { new: true });

    if (!student)
        return res.status(400).send('The Student With the given id was not found.')

    res.send(student);
});
router.get('/:id', async(req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student)
        return res.status(400).send('The Student With the given id was not found.');
    res.send(student);
});

router.delete('/:id', async(req, res) => {
    const student = await Student.findByIdAndRemove(req.params.id);
    if (!student)
        return res.status(400).send('The Student With the given id was not found.');
    return res.send(student);
});
module.exports = router;