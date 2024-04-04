import { useState } from 'react';
import Login from '../component/auth/login';

function Home() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (user) => {
        setLoggedIn(true);
        setUsername(user);
    };


    return (
        <>
            <div className="Home">
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

export default Home
