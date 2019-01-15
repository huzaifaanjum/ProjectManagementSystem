const express = require('express')
const bodyparser = require('body-parser')
const PORT = "3000"
const app = express()
const api = require('./routes/api')
const cors = require('cors')
app.use(cors(origin =  "http://localhost:4200/register"))

app.use(bodyparser.json())
app.use('/api', api) 
app.listen(PORT, function(){
    console.log('server running on : '+PORT);
  
})