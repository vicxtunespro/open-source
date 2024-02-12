//import express 
const express = require('express');
const app = express();
const path = require('path');

app.use('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../client/pages/404.html'));
});


//listen at port 3000
app.listen(3000, ()=>{
    console.log('server running')
})
