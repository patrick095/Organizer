import React, { useState } from 'react';
import Navbar from '../navbar';

import "./styles.css"
import configButton from '../../assets/buttons/config.png'
import addButton from '../../assets/buttons/add.png'
import CreateNew from './components/createNew';
import Settings from './components/settings';

function PageDefault({children}) {
    const empityDiv = <div></div>
const [componentToShow, setComponent ] = useState(empityDiv)
    return (
        <div className="content">
                {children}
                {componentToShow}
                <Navbar>
                <li className="button">
                <button className="new" onClick={() => {setComponent(<CreateNew >{setComponent}</CreateNew>)}}><img src={addButton} alt="addButton" /></button>
                </li>
                <li className="button">
                    <button className="config" onClick={() => {setComponent(<Settings >{setComponent}</Settings>)}}><img src={configButton} alt="configButton" /></button>
                </li>
                </Navbar>
        </div>
    )
}

export default PageDefault;