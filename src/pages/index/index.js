import React, { useState, useEffect } from 'react';
import { Api, BaseURL } from '../../services/api';
import PageDefault from '../../components/PageDefault';

import "./styles.css"
import DraggableDiv from './components';
import { Redirect } from 'react-router';

function Index() {
    const [ user, setUser] = useState({user: ''})
    // const defaultAllObjects = [
    //     {id: "0", type: "card",title: "Novo Card", body: [{title:"Novo Item", body:"Aqui um pequeno texto do corpo do item"}]},
    //     {id: "1", type: "calendarM", title: "Meu novo Calendário", body: []},
    //     {id: "2", type: "list", title:"Nova Lista", body: [{title:"Item 1", checked: true}, {title:"Item 2", checked: false}]}
    // ]
    const [allObjects, setAllObjects] = useState([])
    const [ redirect, setRedirect] = useState(<div></div>)
    let userInfo = JSON.parse(localStorage.getItem('user_info')) || undefined
    useEffect(()=>{
        verifyUser()
    },[])
    function verifyUser(){
        Api.post('/verifyuser', userInfo).then(res =>{
            setUser(res.data.user)
            setAllObjects(res.data.user.data)
        }).catch(err =>{
            setRedirect(<Redirect to="login" />)
        })
    }
    //atualizar no banco de dados sempre que fizer alteração
    useEffect(()=>{
        updateDB()
    },[allObjects])
    function updateDB(){
        if (allObjects === user.data) {
            console.log("carregamento inicial")
        }
        else if (allObjects !== user.data && user.user !== '') {
            console.log("salvar!")
            Api.post("/auth/updatedata?api=Bearer "+userInfo.token, {_id: user._id, data: allObjects}).then(res =>{
                console.log(res.data.response.data)
            }).catch(err =>{
                console.log(err)
                verifyUser()
            })
        }
    }
    return (
        <PageDefault setFunc={[allObjects, setAllObjects]} >
                <h1 className="h1Background">Organizador</h1>
                <div className="mainApp">
                    <DraggableDiv >{[allObjects, setAllObjects, updateDB]}</DraggableDiv>
                </div>
                {redirect}
        </PageDefault>
    )
}

export default Index;