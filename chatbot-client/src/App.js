import React from "react";
import './App.css';
import { addResponseMessage, Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import { useEffect } from 'react';

function App() {
  const [data, setData] = React.useState(null);

  const sendData = (message) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    };

    fetch("/chatbot", requestOptions)
          .then(res => res.json())
          .then((data) => {
            addResponseMessage(data)
            setData(data) });
    };

  useEffect(() => {
    addResponseMessage('Welcome!');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    //console.log(`New message incoming! ${newMessage}`);
    sendData(newMessage);
    //addResponseMessage(newMessage);
  };

  return (
    <div className="App">
      <h1>Hello Chatbot</h1>
      <p>Response: {data ? data: 'API response'}</p>
      <Widget 
        handleNewUserMessage = {handleNewUserMessage}
        title="My new awesome title"
        subtitle="And my cool subtitle"
      />
    </div>
  );
}

export default App;
