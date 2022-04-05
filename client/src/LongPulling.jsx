import React, {useEffect, useState} from 'react';
import {Button, Divider, List, ListItem, TextField, Typography} from '@mui/material';
import './App.css';
import axios from 'axios';

const LongPulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    console.log(value)
    console.log(messages)


    useEffect(()=>{
        listen()
    },[])

    const listen = async ()=> {
        try{
            const {data} = await axios.get('http://localhost:4000/get-messages')
            console.info(data)
            setMessages(prev => [data, ...prev])
                listen()

        } catch (e){
            listen()
        }
    }


    const sendMessage = async ()=>{
       await axios.post('http://localhost:4000/new-messages', {
           msg: value,
           id: Date.now()
       })
        setValue('')
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
                    {messages.map(m =>
                            <div className='message' key={m.id}>{m.msg}</div>
                    )}
            </div>

    );
};

export default LongPulling;
