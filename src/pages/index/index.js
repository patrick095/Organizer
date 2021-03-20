import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import PageDefault from '../../components/PageDefault';
import editButton from '../../assets/buttons/edit.png';

import "./styles.css"

function Index() {
    const [allObjects, setAllObjects] = useState([
        {type: "card",title: "Novo Card", body: [{title:"Novo Item", body:"Aqui um pequeno texto do corpo do item"}]},
        {type: "calendarM", title: "Meu novo Calendário", body: []}
    ])
    const [buttonOption, setButtonOption] = useState([])
    const [subItemActive,setSubItemActive ] = useState([[]])
    const [valueCalendar, onChangeCalendar] = useState(new Date());
    //use Effect cria todas as opções dos botões de acordo com o que está em allObjects
    useEffect(() =>{
        allObjects.map((obj,i) =>{
            subItemActive.push([])
            buttonOption.push('')
            obj.body.map(()=>{
                subItemActive[i].push('')
                return subItemActive
            })
            return subItemActive
        })
        setSubItemActive([...subItemActive])
        setButtonOption([...buttonOption])
    }, [allObjects])

    //modelos de objetos
    //CARD
    function objectCard(obj, i){
        function buttonSubItem(index){
            if (subItemActive[i][index] === '') {
                let newSubI = subItemActive
                newSubI[i][index] = "active"
                setSubItemActive([...newSubI])
            }
            else {
                let newSubI = subItemActive
                newSubI[i][index] = ""
                setSubItemActive([...newSubI])
            }
        }
        function deleteSubItem(index1, index2){
            let changeItem = allObjects
            changeItem[index1].body.splice(index2, 1)
            setAllObjects([...changeItem])
        }
        function addSubItem(index1){
            let changeItem = allObjects
            changeItem[index1].body.push({title:'novo item', body:''})
            setAllObjects([...changeItem])
        }
        function handleChangeSubTitle(e, index1, index2){
            let changeItem = allObjects[index1]
            changeItem.body[index2].title = e.target.value
            setAllObjects(allObjects.splice(index1, 1, changeItem))
        }
        function handleChangeSubText(e, index1, index2){
            let changeItem = allObjects[index1]
            changeItem.body[index2].body = e.target.value
            setAllObjects(allObjects.splice(index1, 1, changeItem))
        }
        return (
            <div className="card" key={"card"+i}>
                <div className="cardTitle">
                <input type="text" value={obj.title} onChange={(e) => changeTitle(i, e.target.value)}/>
                <button onClick={() => handlebuttonOption(i)} className="cardOptionsButton">...</button>
                <div className={'cardOptions '+ buttonOption[i]}>
                        <button onClick={()=> removeCard(i)}>Apagar</button>
                </div>
                </div>
                <div className="cardBody">{
                    obj.body.map((subObj, ii) =>{
                        return (
                            <div className="subItem" key={" - "+ii}>
                                <div>
                                    <input type="text" value={subObj.title} onChange={(e)=>{handleChangeSubTitle(e,i,ii)}} />
                                    <button onClick={() => buttonSubItem(ii)}><img src={editButton} alt="editButton" className='editButton' /></button>
                                    <button className="deleteButton" onClick={()=>deleteSubItem(i,ii)}> x </button>
                                </div>
                                <div className={'subItemBody '+subItemActive[i][ii]}>
                                    <textarea className={subItemActive[i][ii]} value={subObj.body} onChange={(e)=>{handleChangeSubText(e,i,ii)}}/>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                <button className="addItem" onClick={() => addSubItem(i)}>+ Adicionar item</button>
            </div>
        )}

    //CALENDÁRIO
    function objectCalendar(obj, index){
    //console.log(valueCalendar)
    let bodyToShow
    if (obj.body.length < 1) {
        bodyToShow = (<span>Nada para hoje</span>)
    }
    ///fazer aqui como vão ser salvos os itens no calendário
        return (
            <div className="calendar">
                <div className="calendarHeader">
                <input type="text" value={obj.title} onChange={(e)=>changeTitle(index, e.target.value)}/>
                <button onClick={() => handlebuttonOption(index)} className="cardOptionsButton">...</button>
                <div className={'cardOptions '+ buttonOption[index]}>
                        <button onClick={()=> removeCard(index)}>Apagar</button>
                </div>
                </div>
            <Calendar
                onChange={onChangeCalendar}
                value={valueCalendar}
                //formatLongDate={( 'dd MMM YYYY')}
            />
            <div className="dayItem">
                {bodyToShow}
                </div>
            <div className="buttonAdd">
                <button >+ Adicionar Item</button>
            </div>
            </div>
        )
    }
    //FUNÇÕES CARD
    function removeCard(index){
        allObjects.splice(index, 1)
        setAllObjects([...allObjects])
    }
    function changeTitle(index, title){
       allObjects[index].title = title
        setAllObjects([...allObjects])
    }
    function handlebuttonOption(index){
        if (buttonOption[index] === '') {
            buttonOption[index] = "active"
            setButtonOption([...buttonOption])
        }
        else {
            buttonOption[index] = ""
            setButtonOption([...buttonOption])
        }
    }
    return (
        <PageDefault setFunc={[allObjects, setAllObjects]} >
                <h1 className="h1Background">Organizador</h1>
                <div className="mainApp">
                    {allObjects.map((obj, i) =>{
                        let o
                        if (obj.type === "card") {
                            o = objectCard(obj, i)
                        }
                        //por enquanto vou deixar assim para evitar erro
                        else if (obj.type === "calendarM") {
                            o = objectCalendar(obj, i)
                        }
                        else {
                            o = objectCard(obj, i)
                        }
                        return (
                            <div key={"object"+i}>
                            {o}
                            </div>
                        )
                    })}
                </div>
        </PageDefault>
    )
}

export default Index;