import React, { useEffect, useState } from 'react';
import { Api, BaseURL } from '../../../../services/api';

import "./styles.css"

function Settings({children}) {
    let userInfo = JSON.parse(localStorage.getItem('user_info')) || undefined
    const [ User, setUser ] = useState({bgColor: userInfo.theme.bgColor || '', fontColor: userInfo.theme.fontColor || ''})
    var styles = getComputedStyle(document.documentElement);
    var bgValue = String(styles.getPropertyValue('--primary-item-bg-color')).trim();
    var FontValue = String(styles.getPropertyValue('--primary-item-font-color')).trim();
    useEffect(()=>{setUser({...User, bgColor: bgValue, fontColor: FontValue})},[])
    function setColor(){
        document.documentElement.style.setProperty('--primary-item-bg-color', User.bgColor);
        document.documentElement.style.setProperty('--primary-item-font-color', User.fontColor);
    }
    useEffect(()=>{setColor()},[User])
    function changeTheme(obj){
        if (obj.target.value === "0") {
            return
        }
        let bgColor = obj.target.value
        let fontColor = obj.target.options[obj.target.options.selectedIndex].getAttribute('data-font')
        setUser({...User, bgColor, fontColor})
        Api.post("/auth/updatedata?api=Bearer "+userInfo.token, {_id: userInfo._id, theme: {bgColor, fontColor}}).then(res =>{
            console.log(res.data.response)
        }).catch(err =>{
            console.log(err)
        })
    }

    return (
        <div className="newCard">
            <button className="closeButton" onClick={() => children("")}>x</button>
            <div className="settingsDiv">
                <div className="settings">
                <span>Configurações</span>
                <br />
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline"}}>
                    <label htmlFor="theme">Tema :</label>
                    <select value={User.bgColor} name="theme" id="theme" onChange={changeTheme} style={{width: "120px"}}>
                        <option style={{backgroundColor: "#4266b9", color: "#fff"}} value="#4266b9" data-font="#fff">Azul</option>
                        <option style={{backgroundColor: "#B22222", color: "#fff"}} value="#B22222" data-font="#fff">Vermelho</option>
                        <option style={{backgroundColor: "#228B22", color: "#fff"}} value="#228B22" data-font="#fff">Verde</option>
                        <option style={{backgroundColor: "#FFD700", color: "#000"}} value="#FFD700" data-font="#000">Amarelo</option>
                        <option style={{backgroundColor: "#1C1C1C", color: "#fff"}} value="#1C1C1C" data-font="#fff">Preto</option>
                        <option style={{backgroundColor: "#8B4513", color: "#fff"}} value="#8B4513" data-font="#fff">Marrom</option>
                        <option style={{backgroundColor: "#4B0082", color: "#fff"}} value="#4B0082" data-font="#fff">Indigo</option>
                        <option style={{backgroundColor: "#FF69B4", color: "#fff"}} value="#FF69B4" data-font="#fff">Rosa</option>
                    </select>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;