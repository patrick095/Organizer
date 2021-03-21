import React, { useEffect, useState } from 'react';

import "./styles.css"

function CreateNew(props) {
    const [options, setOptions] = useState('')
    const [select, setSelect] = useState('')
    const [newItem, setNewItem] = useState({id:"",title: "", type:'', body:[]})
    const [dataFunc, setAllObjects] = props.setFunc

    useEffect(()=>{
        setNewItem({...newItem,type: select, id: Math.random().toString()})
        console.log(select)
        if (select === "Selecione um tipo" || select === "") {
            setOptions(<div></div>)
        }
        else {
            setOptions(
                <input type="text" placeholder="Nome" onChange={(e)=> setNewItem({...newItem, title: e.target.value})} />
            )
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
                <option value="table">Tabela</option>
                <optgroup label="Calendário">
                    <option value="calendarS">Semanal</option>
                    <option value="calendarM">Mensal</option>
                </optgroup>
            </select>
            {options}
            <button onClick={()=> saveNewItem()}>Criar</button>
            </form>
        </div>
    )
}

export default CreateNew;