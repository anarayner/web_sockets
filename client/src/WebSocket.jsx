import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Button, TextField} from '@mui/material';

const WebSock = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef()
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')



    const connect = ()=>{
        socket.current = new WebSocket('ws://localhost:4080')
        socket.current.onopen = ()=>{
            console.log('onopen')

            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event)=>{
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
            console.log('onmessage')

            console.log('')
        }
        socket.current.onclose = ()=>{
            console.log('Socket closed')
        }
        socket.current.onerror = ()=>{
            console.log('Error')
        }
    }
    const sendMessage = async () => {
        const message ={
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

    if (!connected) {
        return (
            <div className="App">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя"/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }

    return (
        <div className="App">
            <div className='form'>
                <TextField  sx={{m: 2}}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                />
                <Button variant="contained"
                        onClick={sendMessage}
                >Send</Button>

            </div>
            {messages.map(mess =>
                <div className='message' key={mess.id}>
                    {mess.event === 'connection'
                        ? <div >
                            Пользователь {mess.username} подключился
                        </div>
                        : <div >
                            {mess.username}. {mess.message}
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default WebSock;
