import React from 'react';

import "./styles.css"

function Settings({children}) {

    return (
        <div className="newCard">
            <button className="closeButton" onClick={() => children("")}>x</button>
            <span>Configurações</span>
        </div>
    )
}

export default Settings;