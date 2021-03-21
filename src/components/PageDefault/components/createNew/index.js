import React, { useEffect, useState } from 'react';

import "./styles.css"

function CreateNew(props) {
    const [options, setOptions] = useState('')
    const [select, setSelect] = useState('')
    const [dataFunc, setAllObjects] = props.setFunc
    const [newItem, setNewItem] = useState({id:"",title: "", type:select, body:[]})
    const [buttonDisabled, setButtonDisabled] = useState(false)
    
    useEffect(()=>{
        setNewItem({...newItem,type: select, id: Math.random().toString()})
        if (select === "Selecione um tipo" || select === "") {
            setOptions(<div></div>)
            setButtonDisabled(true)
        }
        else {
            setOptions(
                <input type="text" placeholder="Título" onChange={(e)=> setNewItem({...newItem, title: e.target.value})} />
                )
                setButtonDisabled(false)
            }
    }, [select])
    function saveNewItem(){
        setAllObjects([...dataFunc,newItem])
        props.closeButton("")
    }

    return (
        <div className="newCard">
            <button className="closeButton" onClick={() => props.closeButton("")}>x</button>
            <span>Criar novo Item</span>
            <form onSubmit={(event) => event.preventDefault()}>
            <label>Tipo: </label>
            <select onChange={(e) => setSelect(e.target.value)}>
                <option>Selecione um tipo</option>
                <option value="card">Card</option>
                <option value="list">Lista</option>
                {/* <option value="table" disabled>Tabela</option> */}
                <optgroup label="Calendário">
                    <option value="calendarM">Mensal</option>
                    {/* <option value="calendarS" disabled>Semanal</option> */}
                </optgroup>
            </select>
            {options}
            <button onClick={()=> saveNewItem()} disabled={buttonDisabled}>Criar</button>
            </form>
        </div>
    )
}

export default CreateNew;