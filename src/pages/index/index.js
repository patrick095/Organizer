import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import PageDefault from '../../components/PageDefault';
import editButton from '../../assets/buttons/edit.png';

import "./styles.css"

function Index() {
    const [allObjects, setAllObjects] = useState([
        {type: "card",title: "Novo Card", body: [{title:"Novo Item", body:"Aqui um pequeno texto do corpo do item"}]},
        {type: "calendarM", title: "Meu novo Calendário", body: []},
        {type: "list", title:"Nova Lista", body: [{title:"tarefa 1", checked: true}, {title:"tarefa 2", checked: false}]}
    ])
    const [buttonOption, setButtonOption] = useState([])
    const [subItemActive,setSubItemActive ] = useState(defaultSubItemValue())
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
    function defaultSubItemValue(){
        let array = []
        allObjects.map((obj, i) =>{
            array.push([])
            obj.body.map((o) =>{
                array[i].push([])
            })
        })
        return array
    }

    //modelos de objetos
    //CARD
    function objectCard(obj, i){
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
                                    <button onClick={() => buttonSubItem(i,ii)}><img src={editButton} alt="editButton" className='editButton' /></button>
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
    let bodyToShow = false
    
    if (allObjects[index].body.length < 1) {
        bodyToShow = (<div className="dayItem" key="Nada"><span>Nada salvo hoje</span></div>)
    }
    else {
        bodyToShow = (
            allObjects[index].body.map((obj, ii)=>{
                if (obj.date === valueCalendar.toISOString().slice(0, 10)) {
                    return (
                        <div className="dayItem" key={"dayItem"+ii}>
                        <input value={obj.title}  onChange={(e)=>handleChangeSubTitle(e, index, ii)} />
                        <button className="deleteButton" onClick={()=>deleteSubItem(index,ii)}> Remover </button>
                        </div>
                    )
                }
                else {
                    return false
                }
            })
        )
    }
    function addSubItemCalendar(index, date){
        let shortDate = date.toISOString().slice(0, 10)
        allObjects[index].body.push({title:'novo item', date: shortDate})
        setAllObjects([...allObjects])
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
            <div className="dayItens">
                {bodyToShow || <div className="dayItem" key="Nada"><span>Nada salvo hoje</span></div>}
                </div>
            <div className="buttonAdd">
                <button className="addItem" onClick={() => addSubItemCalendar(index,valueCalendar)}>+ Adicionar Item</button>
            </div>
            </div>
        )
    }

    //LIST
    function objectList(obj, i){
        return (
            <div className="card" key={"list"+i}>
                <div className="cardTitle">
                <input type="text" value={obj.title} onChange={(e) => changeTitle(i, e.target.value)}/>
                <button onClick={() => handlebuttonOption(i)} className="cardOptionsButton">...</button>
                <div className={'cardOptions '+ buttonOption[i]}>
                        <button onClick={()=> removeCard(i)}>Apagar</button>
                </div>
                </div>
                <div className="cardBody">
                    <ul>
                        {
                            obj.body.map((objList, ii) =>{
                                return (
                                    <li className="listItem" key={" - "+ii}>
                                            <input type="text" value={objList.title} onChange={(e)=>{handleChangeSubTitle(e,i,ii)}} />
                                            <input type="checkbox" checked={objList.checked} onChange={() => handleCheckBox(i,ii)} />
                                            <button className="deleteButton" onClick={()=>deleteSubItem(i,ii)}> x </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button className="addItem" onClick={() => addSubItem(i)}>+ Adicionar item</button>
            </div>
        )}


    //FUNÇÕES CARD
    function removeCard(index){
        allObjects.splice(index, 1)
        buttonOption[index] = ""
        setAllObjects([...allObjects])
        setButtonOption([...buttonOption])
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
    function buttonSubItem(index1, index2){
        if (subItemActive[index1][index2] === '') {
            subItemActive[index1][index2] = "active"
            setSubItemActive([...subItemActive])
        }
        else {
            subItemActive[index1][index2] = ""
            setSubItemActive([...subItemActive])
        }
    }
    function handleCheckBox(index1, index2){
            allObjects[index1].body[index2].checked = !allObjects[index1].body[index2].checked
            setAllObjects([...allObjects])
        
    }
    function deleteSubItem(index1, index2){
        allObjects[index1].body.splice(index2, 1)
        setAllObjects([...allObjects])
    }
    function addSubItem(index1){
        allObjects[index1].body.push({title:'novo item', body:''})
        setAllObjects([...allObjects])
    }
    function handleChangeSubTitle(e, index1, index2){
        allObjects[index1].body[index2].title = e.target.value
        setAllObjects([...allObjects])
    }
    function handleChangeSubText(e, index1, index2){
        allObjects[index1].body[index2].body = e.target.value
        setAllObjects([...allObjects])
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
                    })}
                </div>
        </PageDefault>
    )
}

export default Index;