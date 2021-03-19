import React from 'react';

import "./styles.css"

function Navbar({children}) {
    return (
        <div className="navbar">
            <ul className="buttons">
            {children}
            </ul>
        </div>
    )
}

export default Navbar;