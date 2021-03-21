import React, {useState} from 'react';


function List(props){
    const {obj, i, receivedAllObjects, setAllObjects2} = props
    const [allObjects, setAllObjects] = useState(receivedAllObjects)
    const [buttonOption, setButtonOption] = useState([])

    function removeCard(index){
        allObjects.splice(index, 1)
        buttonOption[index] = ""
        setAllObjects2([...allObjects])
        setButtonOption([...buttonOption])
    }
    function changeTitle(index, title){
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
    function handleCheckBox(index1, index2){
            obj.body[index2].checked = !obj.body[index2].checked
            setAllObjects([...allObjects])
        
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
export default List;