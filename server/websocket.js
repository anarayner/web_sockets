const ws = require('ws').Server

const wss = new ws ({
    port: 4080,
}, ()=> console.log('server run on 4080'))

wss.on('connection', function connection( ws){
    ws.on('message', function (message){
        message = JSON.parse(message)
        switch (message.event){
            case 'message':
                broadcarMessage(message)
                break;
            case 'connection':
                broadcarMessage(message)

                break;
        }
    })
})

function broadcarMessage(message){
    wss.clients.forEach(client =>{
          client.send(JSON.stringify(message))
    })
}

const messages = {
    event: 'message/connection',
    id: 123,
    date: 'today',
    username: 'anaray',
    message: 'welcome'
}