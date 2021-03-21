import React, {useState} from 'react';
import Calendar from 'react-calendar';

function CalendarM(props){
    const {obj, index, receivedAllObjects, setAllObjects2} = props

    const [allObjects, setAllObjects] = useState(receivedAllObjects)
    const [buttonOption, setButtonOption] = useState([""])
    const [valueCalendar, onChangeCalendar] = useState(new Date());
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
    function addSubItemCalendar(date){
        let shortDate = date.toISOString().slice(0, 10)
        obj.body.push({title:'novo item', date: shortDate})
        setAllObjects([...allObjects])
    }
    function removeCard(index){
        allObjects.splice(index, 1)
        buttonOption[index] = ""
        setAllObjects2([...allObjects])
        setButtonOption([...buttonOption])
    }
    function changeTitle(title){
        obj.title = title
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
    function deleteSubItem(index2){
        obj.body.splice(index2, 1)
        setAllObjects([...allObjects])
    }
    function handleChangeSubTitle(e, index2){
        obj.body[index2].title = e.target.value
        setAllObjects([...allObjects])
    }
    ///fazer aqui como vão ser salvos os itens no calendário
        return (
            <div className="calendar">
                <div className="calendarHeader">
                <input type="text" value={obj.title} onChange={(e)=>changeTitle(e.target.value)}/>
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
                <button className="addItem" onClick={() => addSubItemCalendar(valueCalendar)}>+ Adicionar Item</button>
            </div>
            </div>
        )
    }

export default CalendarM;