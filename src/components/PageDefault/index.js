import React, { useState } from 'react';
import Navbar from '../navbar';

import "./styles.css"
import configButton from '../../assets/buttons/config.png'
import addButton from '../../assets/buttons/add.png'
import profileButton from '../../assets/buttons/profile.png'
import CreateNew from './components/createNew';
import Settings from './components/settings';
import Profile from './components/profile';

function PageDefault(props) {
    const empityDiv = ""
    const [componentToShow, setComponent ] = useState(empityDiv)
    const [option, setOption] = useState(0)

    function handleComponent(component,optionSelected){
        if (componentToShow === empityDiv) {
            setComponent(component)
            setOption(optionSelected)
        }
        else if (optionSelected !== option) {
            setComponent(component)
            setOption(optionSelected)
        }
        else {
            setComponent(empityDiv)
            setOption(0)
        }
    }
    return (
        <div className="content">
                {props.children}
                {componentToShow}
                <Navbar>
                <li className="button">
                <button className="new" onClick={() => {handleComponent(<CreateNew setFunc={props.setFunc} closeButton={setComponent}></CreateNew>, 1)}}><img src={addButton} alt="addButton" /></button>
                </li>
                <li className="button">
                    <button className="config" onClick={() => {handleComponent(<Settings >{setComponent}</Settings>, 2)}}><img className="imgrotate" src={configButton} alt="configButton" /></button>
                </li>
                <li className="button">
                <button className="profile" onClick={() => {handleComponent(<Profile >{setComponent}</Profile>, 3)}}><img src={profileButton} alt="profileButton" /></button>
                </li>
                </Navbar>
        </div>
    )
}

export default PageDefault;