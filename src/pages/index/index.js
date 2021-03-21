import React, { useState } from 'react';

import PageDefault from '../../components/PageDefault';

import "./styles.css"
import DraggableDiv from './components';

function Index() {
    const defaultAllObjects = [
        {id: "0", type: "card",title: "Novo Card", body: [{title:"Novo Item", body:"Aqui um pequeno texto do corpo do item"}]},
        {id: "1", type: "calendarM", title: "Meu novo Calendário", body: []},
        {id: "2", type: "list", title:"Nova Lista", body: [{title:"Item 1", checked: true}, {title:"Item 2", checked: false}]}
    ]
    const [allObjects, setAllObjects] = useState(defaultAllObjects)
    return (
        <PageDefault setFunc={[allObjects, setAllObjects]} >
                <h1 className="h1Background">Organizador</h1>
                <div className="mainApp">
                    <DraggableDiv >{[allObjects, setAllObjects]}</DraggableDiv>
                </div>
        </PageDefault>
    )
}

export default Index;