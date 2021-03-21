import React, { useState } from 'react';

import PageDefault from '../../components/PageDefault';

import "./styles.css"
import DraggableDiv from './components';

function Index() {
    const defaultAllObjects = [
        {id: "0", type: "card",title: "Novo Card", body: [{title:"Novo Item", body:"Aqui um pequeno texto do corpo do item"}]},
        {id: "1", type: "calendarM", title: "Meu novo Calendário", body: []},
        {id: "2", type: "list", title:"Nova Lista", body: [{title:"tarefa 1", checked: true}, {title:"tarefa 2", checked: false}]}
    ]

    const [allObjects, setAllObjects] = useState(defaultAllObjects)

    return (
        <PageDefault setFunc={[allObjects, setAllObjects]} >
                <h1 className="h1Background">Organizador</h1>
                <div className="mainApp">
                    {/* {allObjects.map((obj, i) =>{
                        let o
                        if (obj.type === "card") {
                            o = objectCard(obj, i)
                        }
                        //por enquanto vou deixar assim para evitar erro
                        else if (obj.type === "calendarM") {
                            o = objectCalendar(obj, i)
                        }
                        else if (obj.type === "list") {
                            o = objectList(obj, i)
                        }
                        else {
                            o = objectCard(obj, i)
                        }
                        return (
                            <div key={"object"+i}>
                            {o}
                            </div>
                        )
                    })} */}
                    <DraggableDiv allObjects={allObjects} setAllObjects={setAllObjects} />
                </div>
        </PageDefault>
    )
}

export default Index;