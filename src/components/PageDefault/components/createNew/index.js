import React from 'react';

import "./styles.css"

function CreateNew({children}) {

    return (
        <div className="newCard">
            <button className="closeButton" onClick={() => children(<div></div>)}>x</button>
            <span>Criar novo Item</span>
            <form>
            <label>Tipo: </label>
            <select>
                <option>Selecione um tipo</option>
                <option>Texto</option>
                <option>Lista</option>
                <option>Tabela</option>
                <optgroup label="Calendário">
                    <option>Semanal</option>
                    <option>Mensal</option>
                </optgroup>
            </select>
            </form>
        </div>
    )
}

export default CreateNew;