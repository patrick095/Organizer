import React, {useState} from 'react';

import editButton from '../../../../assets/buttons/edit.png';

 function Card(props){
     const {obj, i, receivedAllObjects, setAllObjects2} = props
    const [allObjects, setAllObjects] = useState(receivedAllObjects)
    const [buttonOption, setButtonOption] = useState(defaultButtonOptionsValue(receivedAllObjects))
    const [subItemActive,setSubItemActive ] = useState(defaultSubItemValue()) 

    function defaultSubItemValue(){
        let array = []
        allObjects.map((obj, i) =>{
            array.push([])
            obj.body.map((o) =>{
                array[i].push([])
                return array
            })
            return array
        })
        return array
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
        setAllObjects2([...allObjects])
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
    function deleteSubItem(index1, index2){
        obj.body.splice(index2, 1)
        setAllObjects([...allObjects])
    }
    function addSubItem(index1){
        obj.body.push({title:'novo item', body:''})
        setAllObjects([...allObjects])
    }
    function handleChangeSubTitle(e, index1, index2){
        obj.body[index2].title = e.target.value
        setAllObjects([...allObjects])
    }
    function handleChangeSubText(e, index1, index2){
        obj.body[index2].body = e.target.value
        setAllObjects([...allObjects])
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

    export default Card;