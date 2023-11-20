const express = require('express')
const app  = express()
const port = 5000

app.get('/', (req, res)  => {
    res.send("halo gais welcome to my crib")
})

app.listen(port, () => {
    console.log("App listening on port 5000")
})