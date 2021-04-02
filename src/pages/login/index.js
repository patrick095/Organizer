import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Api, BaseURL } from '../../services/api';
import "./styles.css"

function Login() {
    const [ userLogin, setLogin ] = useState({user:"", password:""})
    const [ signUp, setSignUp ] = useState({name:'', user:'', email: '', password:''})

    const [ redirect, setRedirect] = useState(<div></div>)
    function signIn(e){
        e.preventDefault()
        Api.post('/signin', userLogin).then((res)=>{
            const {  user, token } = res.data
            localStorage.setItem('user_info', JSON.stringify({
                logged: true,
                user: user.user,
                name: user.name,
                email: user.email,
                token: token,
                _id: user._id
            }))
            setRedirect(<Redirect to="/" />)
        }).catch((err) =>{
            console.log(err)
        })
    }
    function signUP(e){
        e.preventDefault()
        verifyUserAndEmail()
    }
    function signUpApi(){
        Api.post('/signup', signUp).then((res)=>{
            const { name, user, email, token } = res.data
            localStorage.setItem('user_info', JSON.stringify({
                logged: true,
                user: user,
                name: name,
                email: email,
                token: token
            }))
            setRedirect(<Redirect to="/" />)
        }).catch((err) =>{
            console.log(err)
        })
    }
    function signUpDiv(e){
        e.preventDefault()
        document.querySelector('.loginSquire').classList.add('hidden')
        document.querySelector('.signUpSquire').classList.remove('hidden')
    }
    function backToLogin(){
        document.querySelector('.loginSquire').classList.remove('hidden')
        document.querySelector('.signUpSquire').classList.add('hidden')
    }
    function verifyUserAndEmail(){
        const {name, user, email, password} = signUp
        if (name === '') {
            return alert('nome em branco!')
        }
        else if (user === '') {
            return alert('usuário em branco!')
        }
        else if (email === '') {
            return alert('email em branco!')
        }
        else if (password === '') {
            return alert('senha em branco!')
        }
        else {
            Api.post('/verifyusernameandemail', {user, email}).then(res =>{
                console.log(res)
                if (res.data === 'user already in use') {
                    document.getElementById('userinuse').classList.remove('hidden')
                }
                else if (res.data === 'email already in use') {
                    document.getElementById('emailinuse').classList.remove('hidden')
                }
                else {
                    document.getElementById('email').classList.remove('redBorder')
                    document.getElementById('username').classList.remove('redBorder')
                    signUpApi()
                }
            }).catch(err =>{
                alert("não foi possível conectar ao servidor!")
            })
        }
    }
    return (
        <div className="loginBackground">
            <div className="loginSquire">
                <h1>Login</h1>
                <br />
                <form method="post" onSubmit={signIn} action="/" autoComplete="none" className="form">
                    <input type="text" className="input" autoFocus="on" autoComplete="new-password" name="username" placeholder="Usuário" value={userLogin.user} onChange={(e)=> setLogin({...userLogin, user: e.target.value})} />
                    <input type="password" className="input" name="password" placeholder="Senha" value={userLogin.password} onChange={(e)=> setLogin({...userLogin, password: e.target.value})}/>
                    <button type="submit">Login</button>
                </form>
                <br />
                <span>Não tem conta? <a href="#" onClick={signUpDiv}>clique aqui</a></span>
            </div>
            <div className="signUpSquire hidden">
                <h1>Cadastrar</h1>
                <form onSubmit={signUP}>
                <input type="text" className="input" autoFocus="on" id="name" name="name" placeholder="Nome" value={signUp.name} onChange={(e)=> setSignUp({...signUp, name: e.target.value})} />
                <input type="email" className="input" id="email" name="email" placeholder="Email" value={signUp.email} onChange={(e)=> setSignUp({...signUp, email: e.target.value})} />
                <label id="emailinuse" className="hidden redError">Email já cadastrado.</label>
                <input type="text" className="input" id="username" name="username" placeholder="Usuário" value={signUp.user} onChange={(e)=> setSignUp({...signUp, user: e.target.value})} />
                <label id="userinuse" className="hidden redError">Usuário já cadastrado.</label>
                <input type="password" className="input" id="password" name="password" placeholder="Senha" value={signUp.password} onChange={(e)=> setSignUp({...signUp, password: e.target.value})} />
                    <div>
                        <button type="button" onClick={backToLogin}>Voltar</button>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
            {redirect}
        </div>
    )
}

export default Login;