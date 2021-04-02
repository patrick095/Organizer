import React, { useEffect, useState } from 'react';

import "./styles.css"

function Settings({children}) {
    let userInfo = JSON.parse(localStorage.getItem('user_info')) || undefined
    const [ User, setUser ] = useState({bgColor: '', fontColor: ''})
    var styles = getComputedStyle(document.documentElement);
    var bgValue = String(styles.getPropertyValue('--primary-item-bg-color')).trim();
    var FontValue = String(styles.getPropertyValue('--primary-item-font-color')).trim();
    useEffect(()=>{setUser({...User, bgColor: bgValue, fontColor: FontValue})},[])
    useEffect(()=>{
        document.documentElement.style.setProperty('--primary-item-bg-color', User.bgColor);
        document.documentElement.style.setProperty('--primary-item-font-color', User.fontColor);
    },[User])
    return (
        <div className="newCard">
            <button className="closeButton" onClick={() => children("")}>x</button>
            <div className="settingsDiv">
                <div className="settings">
                <span>Configurações</span>
                <br />
                <span>Cor dos Itens</span>
                <input type="color" value={User.bgColor} onChange={(e)=>setUser({...User, bgColor: e.target.value})} />
                <br />
                <span>Cor da fonte</span>
                <input type="color" value={User.fontColor} onChange={(e)=>setUser({...User, fontColor: e.target.value})} />
                </div>
            </div>
        </div>
    )
}

export default Settings;