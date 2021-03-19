import React, { useEffect, useState } from 'react';

import "./styles.css"

function CreateNew(props) {
    const [options, setOptions] = useState('')
    const [select, setSelect] = useState('')
    const [newItem, setNewItem] = useState({})
    const [dataFunc, setFunc] = props.setFunc

    useEffect(()=>{
        if (select === "card") {
            setOptions(
                <input type="text" placeholder="Nome" onChange={(e)=> setNewItem({...newItem, title: e.target.value})} />
            )
        }
    }, [select])
    function saveNewItem(){
        setFunc([...dataFunc,newItem])
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
                <option>Lista</option>
                <option>Tabela</option>
                <optgroup label="Calendário">
                    <option>Semanal</option>
                    <option>Mensal</option>
                </optgroup>
            </select>
            {options}
            </form>
            <button onClick={()=> saveNewItem()}>Criar</button>
        </div>
    )
}

export default CreateNew;