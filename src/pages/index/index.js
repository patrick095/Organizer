import React, { useEffect, useState } from 'react';
import PageDefault from '../../components/PageDefault';
import editButton from '../../assets/buttons/edit.png';

import "./styles.css"

function Index() {
    const [allObjects, setAllObjects] = useState([{type: "card",title: "Novo Card", body: [{title:"Novo Item", body:"Aqui um pequeno texto do corpo do item"}]}])
    const [buttonOption, setButtonOption] = useState([])
    const [subItemActive,setSubItemActive ] = useState([[]])
    useEffect(() =>{
        let array = []
        allObjects.map((obj,i) =>{
            array.push([])
            obj.body.map(()=>{
                array[i].push('')
            })
        })
        setSubItemActive(array)
    }, [allObjects])
    //modelos de objetos
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
    <div className="card" key={"card"+obj.title}>
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
            <div className="subItem" key={subObj.title+" - "+ii}>
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
    }</div>
    <button className="addItem" onClick={() => addSubItem(i)}>+ Adicionar item</button>
</div>
)}
    useEffect(()=>{
        let allOptions = []
        allObjects.map(card =>{
            allOptions.push('')
        })
        setButtonOption(allOptions)
    },[allObjects])
    function removeCard(index){
        allObjects.splice(index, 1)
        setAllObjects([...allObjects])
    }
    function changeTitle(index, title){
       let cardChanged = allObjects[index]
        cardChanged.title = title
        allObjects.splice(index, 1, cardChanged)
        setAllObjects([...allObjects])
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
        <PageDefault setFunc={[allObjects, setAllObjects]} >
                <h1 className="h1Background">Organizador</h1>
                <div className="mainApp">
                    {allObjects.map((obj, i) =>{
                        let o
                        if (obj.type === "card") {
                            o = objectCard(obj, i)
                        }
                        //por enquanto vou deixar assim para evitar erro
                        else {
                            o = objectCard(obj, i)
                        }
                        return (
                            <div key={"object"+obj.title+i}>
                            {o}
                            </div>
                        )
                    })}
                </div>
        </PageDefault>
    )
}

export default Index;