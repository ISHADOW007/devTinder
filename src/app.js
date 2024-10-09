const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(777,()=>{
    console.log("satyam govind rao")
})