import React, { useState } from 'react';

import "./styles.css"

function Profile({children}) {
    let userInfo = JSON.parse(localStorage.getItem('user_info')) || undefined
    const [ User, setUser ] = useState({name: userInfo.name, user: userInfo.user, email: userInfo.email})
    function signOut(){
        localStorage.clear()
        window.location.assign('/login');
    }
    return (
        <div className="newCard">
            <button className="closeButton" onClick={() => children("")}>x</button>
            <div className="profileDiv">
                <div className="profileUser">
                <span>Perfil</span>
                <span> Nome: <input value={User.name} disabled /> </span>
                <span> Email: <input value={User.email} disabled /> </span>
                <span> Usuário: <input value={User.user} disabled /> </span>
                </div>
                <button className="signOutButton" onClick={signOut}>Deslogar-se</button>
            </div>
        </div>
    )
}

export default Profile;