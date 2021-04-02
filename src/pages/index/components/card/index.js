import React, {useEffect, useState} from 'react';

import editButton from '../../../../assets/buttons/edit.png';

 function Card(props){
     const {obj2, i, allObjects, setAllObjects} = props
     const [obj, setObj] = useState(obj2)
    const [buttonOption, setButtonOption] = useState(defaultButtonOptionsValue(allObjects))
    const [subItemActive,setSubItemActive ] = useState(defaultSubItemValue())

    function defaultSubItemValue(){
        let array = []
        allObjects.map((obj, i) =>{
            array.push([])
            obj.body.map((o) =>{
                array[i].push('')
                return array
            })
            return array
        })
        return array
    }    

    //mantém a opção dos botôes sempre atualizadas ao criar ou apagar itens
    function updateSubItemActive(){
        let array = []
        allObjects.map((obj, i) =>{
            array.push([])
            obj.body.map((o) =>{
                array[i].push('')
                return array
            })
            return array
        })
        setSubItemActive(array)
    }

    function defaultButtonOptionsValue(array){
        let newArray = []
        array.map(()=>{
            return newArray.push("")
        })
        return newArray
    }

    function removeCard(index){
        allObjects.splice(index, 1)
        buttonOption[index] = ""
        setAllObjects([...allObjects])
        setButtonOption([...buttonOption])
    }

    function changeTitle(index, title){
        obj.title = title
        setObj({...obj})
    }
    function saveTitle(e){
        if (e.key === 'Enter') {
            saveObj()
        }
    }
    function saveObj(){
        allObjects.map((Obj,i)=>{
            if (Obj.id === obj.id) {
                let newAllObj = allObjects
                newAllObj.splice(i,1, obj)
                setAllObjects([...newAllObj])
            }
        })
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

    function deleteSubItem(index1, index2){
        obj.body.splice(index2, 1)
        setAllObjects([...allObjects])
        updateSubItemActive()
    }

    function addSubItem(index1){
        obj.body.push({title:'', body:''})
        setAllObjects([...allObjects])
        updateSubItemActive()
    }

    function handleChangeSubTitle(e, index1, index2){
        obj.body[index2].title = e.target.value
        setObj({...obj})
    }

    function handleChangeSubText(e, index1, index2){
        obj.body[index2].body = e.target.value
        setObj({...obj})
    }

    return (
        <div className="card" key={"card"+i}>
            <div className="cardTitle">
            <input type="text" value={obj.title} placeholder="Título" onKeyDown={saveTitle} onChange={(e) => changeTitle(i, e.target.value)}/>
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
                                <input type="text" placeholder="Novo Item" onKeyDown={saveTitle} value={subObj.title} onChange={(e)=>{handleChangeSubTitle(e,i,ii)}} />
                                <button onClick={() => buttonSubItem(i,ii)} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}><img src={editButton} alt="editButton" className='editButton' /></button>
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

    export default Card;