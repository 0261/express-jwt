const path = require('path')
const express = require('express');
const app = express();


// API
const api = require('./routes/api');
app.use('/api', api);

// Static File
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,()=>{
    console.log('3000 PORT START');
})