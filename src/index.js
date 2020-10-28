const express = require('express')
const router = require('./route')

const app = express()
app.use(express.json())

app.use('/', router)

app.get('/get', (req, res) => {
    res.send('this is the news')
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
 
module.exports = app