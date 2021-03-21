import React, {useState} from 'react';
import Calendar from 'react-calendar';

function CalendarM(props){
    const {obj2, index, allObjects, setAllObjects} = props
    const [obj, setObj] = useState(obj2)
    const [buttonOption, setButtonOption] = useState(defaultButtonOptionsValue(allObjects))
    const [valueCalendar, onChangeCalendar] = useState(new Date());

    function defaultButtonOptionsValue(array){
        let newArray = []
        array.map(()=>{
            return newArray.push("")
        })
        return newArray
    }

    
    let bodyToShow = false
    
    if (obj.body.length < 1) {
        bodyToShow = (<div className="dayItem" key="Nada"><span>Nada salvo hoje</span></div>)
    }
    else {
        bodyToShow = (
            obj.body.map((obj, ii)=>{
                if (obj.date === valueCalendar.toISOString().slice(0, 10)) {
                    return (
                        <div className="dayItem" key={"dayItem"+ii}>
                        <input value={obj.title} placeholder="Novo Item" onChange={(e)=>handleChangeSubTitle(e,ii)} />
                        <button className="deleteButton" onClick={()=>deleteSubItem(ii)}> Remover </button>
                        </div>
                    )
                }
                else {
                    return false
                }
            })
        )
    }
    function addSubItemCalendar(date){
        let shortDate = date.toISOString().slice(0, 10)
        obj.body.push({title:'', date: shortDate})
        setAllObjects([...allObjects])
    }
    function removeCard(index){
        allObjects.splice(index, 1)
        buttonOption[index] = ""
        setAllObjects([...allObjects])
        setButtonOption([...buttonOption])
    }
    function changeTitle(title){
        obj.title = title
        setObj({...obj})
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
    function deleteSubItem(index2){
        obj.body.splice(index2, 1)
        setAllObjects([...allObjects])
    }
    function handleChangeSubTitle(e, index2){
        obj.body[index2].title = e.target.value
        setObj({...obj})
    }
        return (
            <div className="calendar">
                <div className="calendarHeader">
                <input type="text" placeholder="Título"  value={obj.title} onChange={(e)=>changeTitle(e.target.value)}/>
                <button onClick={() => handlebuttonOption(index)} className="cardOptionsButton">...</button>
                <div className={'cardOptions '+ buttonOption[index]}>
                        <button onClick={()=> removeCard(index)}>Apagar</button>
                </div>
                </div>
            <Calendar
                onChange={onChangeCalendar}
                value={valueCalendar}
            />
            <div className="dayItens">
                {bodyToShow || <div className="dayItem" key="Nada"><span>Nada salvo hoje</span></div>}
                </div>
            <div className="buttonAdd">
                <button className="addItem" onClick={() => addSubItemCalendar(valueCalendar)}>+ Adicionar Item</button>
            </div>
            </div>
        )
    }

export default CalendarM;