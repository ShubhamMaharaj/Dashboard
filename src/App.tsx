import React, { useState } from 'react';
import Login from './component/login';

import './App.css'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user);
  };
  

  return (
    <>
     <div className="App">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setLoggedIn(false)}>Logout</button>
        </div>
      )}
    </div>
      
    </>
  )
}

export default App
