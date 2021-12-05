import logo from './logo.svg';
import './App.css';
import './css/Login.css';
import './css/AfterLogin.css';
import './css/AddContact.css';
import './css/AddConversation.css';
import './css/UserChat.css';
import './css/RenderMessages.css';
import { io } from 'socket.io-client';
import Login from './components/Login.js';
import { useState, useEffect } from 'react';
import useLocalStorageHook from './storage/useLocalStorageHook';
import UserUI from './components/UserUI.js';
import { uid } from 'uid';

const Sockets = (id, setSocket) => {
    const newSocket = io('http://localhost:3000', { query: { id } });
    setSocket(newSocket);

    return () => newSocket.close();
};

function App() {
    const [id, setID] = useLocalStorageHook('uid');
    const [socket, setSocket] = useState();

    useEffect(() => {
        Sockets(id, setSocket);
    }, [id]);

    return id ? (
        <UserUI uid={id} socket={socket}></UserUI>
    ) : (
        <Login userID={setID} />
    );
}

export default App;
