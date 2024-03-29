import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import Message from './Message';
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import axios from './axios' ;
import Pusher from 'pusher-js';

  const pusher = new Pusher('73fdc8688706f5ad7fa2', {
    cluster: 'us3'
  });

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  const sync = async () => {
    await axios.get('/retrieve/conversation')
      .then((res) => {
        console.log(res.data);
        setMessages(res.data)
      })
  }

  useEffect(() => {
    sync()
  }, [])

  useEffect(() => {
    const channel = pusher.subscribe('messages');
    channel.bind('newMessages', function (data) {
      sync()
    })
  }, [username])

  // useEffect(() => {
  //   db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
  //     setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
  //   })
  // }, [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()

    axios.post('/save/messages', {
      username: username,
      message: input,
      timestamp: Date.now()
    })

    setInput('')
  }

  useEffect (()=> {
    var elem = document.getElementById('data');
    elem.scrollTop = elem.scrollHeight;
  })

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="messenger logo" />
      <h2>Welcome {username}</h2>

    <div id="data" className="textBox">
      <FlipMove>
        {
          messages.map(message => (
            <Message key={message._id} message={message} username={username} />
          )).reverse()
        }
      </FlipMove>
    </div>

    <div className="formContainer">
       <form className='app__form' >
        <FormControl className='app__formControl' >
          <Input className='app__input' placeholder='Enter a message...' value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className='app__iconButton' variant='text' color='primary' disabled={!input} onClick={sendMessage} type="submit" >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>



    </div>
  );
}

export default App;
