const express = require('express')
const cors = require('cors')
const events = require('events')
const PORT = 4000


const emitter = new events.EventEmitter()
const app = express()

app.use(express.json())
app.use(cors())

app.get('/get-messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        console.log('get: ', message)
        res.json(message)
    })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    console.log('post: ', message)

    emitter.emit('newMessage', message)
    res.status(200).end(()=>{m: 'end'})
}))

app.listen(PORT, ()=> console.log(`server run on ${PORT}`))