//import express 
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//middleware for serving static files
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/pages/index.html'))
})

app.get('/add-student', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/pages/add-student.html'))
})

const conn = 'mongodb+srv://vicitug:qwertyuiop256@smsdb.sfsniuq.mongodb.net/new-entrants?retryWrites=true&w=majority'

mongoose.connect(conn)
.then(()=> {
    console.log("Data also connect");
})
.catch((error)=>{
    console.log(error);
});

//student schema
const studentSchema = mongoose.Schema(
    {
        fullname: String,
        surname: String,
        address: String,
        age: Number,
        level: String,
        Stream: String,
        gender: String
    },
    {timestamps: true}
)

//student model
const Student = mongoose.model('Student', studentSchema);

app.post('/student-admit', async (req, res)=>{
    const { fullname, surname, address, age, level, stream, gender } = req.body;
    const newEntrant = new Student({
        fullname,
        surname,
        address,
        age,
        level,
        stream,
        gender
    });

    newEntrant.save()
    .then(()=>{
        console.log("New student created");
    })
    .catch((err)=>{
        console.log(err);
    });

    res.send(req.body);
})

app.use((req,res)=>{
    res.sendFile(path.join(__dirname, '../client/pages/404.html'));
});



//listen at port 3000
app.listen(3000, ()=>{
    console.log('server running')
})
