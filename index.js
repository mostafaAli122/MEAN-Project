const mongoose = require('mongoose');
const student = require('./routes/student');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/StudentDB')
    .then(() => console.log('Connected To MongoDb'))
    .catch(error => console.error('Couldn\'t Connect To MongoDb '));

app.use(express.json());
app.use('/api/student', student);

const port = process.env.PORT || 300;
app.listen(port, () => console.log(`Listening on port ${port} ...`));