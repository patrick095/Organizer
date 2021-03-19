import React, { useEffect, useState } from 'react';
import PageDefault from '../../components/PageDefault';

import "./styles.css"

function Index() {
    const [cards, setCards] = useState([{title: "Novo Card", body: ""}])
    const [buttonOption, setButtonOption] = useState([])
    useEffect(()=>{
        let allOptions = []
        cards.map(card =>{
            allOptions.push('')
        })
        setButtonOption(allOptions)
    },[cards])
    function removeCard(index){
        cards.splice(index, 1)
        setCards([...cards])
    }
    function changeTitle(index, title){
       let cardChanged = cards[index]
        cardChanged.title = title
        cards.splice(index, 1, cardChanged)
        setCards([...cards])
    }
    function handlebuttonOption(index){
        if (buttonOption[index] === '') {
            let newButtonOptions = buttonOption
            newButtonOptions[index] = "active"
            setButtonOption([...newButtonOptions])
        }
        else {
            let newButtonOptions = buttonOption
            newButtonOptions[index] = ""
            setButtonOption([...newButtonOptions])
        }
    }
    return (
        <PageDefault setFunc={[cards, setCards]} >
                <h1 className="h1Background">Organizador</h1>
                <div className="mainApp">
                    {cards.map((card, i) =>{
                        return (
                            <div className="card" key={"card"+card.title}>
                                <div className="cardTitle">
                                <input type="text" value={card.title} onChange={(e) => changeTitle(i, e.target.value)}/>
                                <button onClick={() => handlebuttonOption(i)} className="cardOptionsButton">...</button>
                                <div className={'cardOptions '+ buttonOption[i]}>
                                        <button onClick={()=> removeCard(i)}>Apagar</button>
                                </div>
                                </div>
                                <div className="cardBody">{card.body}</div>
                                <button className="addItem">+ Adicionar item</button>
                            </div>
                        )
                    })}
                </div>
        </PageDefault>
    )
}

export default Index;