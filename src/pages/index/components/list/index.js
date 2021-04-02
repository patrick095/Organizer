import React, {useState} from 'react';


function List(props){
    const {obj2, i, allObjects, setAllObjects} = props
     const [obj, setObj] = useState(obj2)
    const [buttonOption, setButtonOption] = useState(defaultButtonOptionsValue(allObjects))

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
    function handleCheckBox(index1, index2){
            obj.body[index2].checked = !obj.body[index2].checked
        setAllObjects([...allObjects])
        
    }
    function deleteSubItem(index1, index2){
        obj.body.splice(index2, 1)
        setAllObjects([...allObjects])
    }
    function addSubItem(index1){
        obj.body.push({title:'', body:''})
        setAllObjects([...allObjects])
    }
    function handleChangeSubTitle(e, index1, index2){
        obj.body[index2].title = e.target.value
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
    return (
        <div className="card" key={"list"+i}>
            <div className="cardTitle">
            <input type="text" value={obj.title} placeholder="Título" onKeyDown={saveTitle} onChange={(e) => changeTitle(i, e.target.value)}/>
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
                                        <input type="text" placeholder="Novo Item" value={objList.title} onKeyDown={saveTitle} onChange={(e)=>{handleChangeSubTitle(e,i,ii)}} />
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
export default List;