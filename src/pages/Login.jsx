import React, { useState } from 'react'
import Axios from 'axios'
import "../style/login.css"
import { Navigate, Route } from  'react-router-dom';

const Login = () => {

    const [userCodInput, setUserCodInput] = useState("")

    const HandleLogin = () => {
        Axios.get(`https://controle-ponto.herokuapp.com/users/${userCodInput}`)
        .then((resp)=>{
            if(resp.data.length>0){
                window.localStorage.setItem('id',resp.data[0].id)
                window.localStorage.setItem('name',resp.data[0].nome)
                window.location.href = '/home'
            }else alert('usuario invalido')
        })
    }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className=" flex flex-col gap-10">
            <div className="flex flex-row gap-2">
                <h1 style={{ fontFamily: 'Montserrat' }} className='text-white text-xl sm:text-2xl'>Ponto</h1>
                <h1 style={{ fontFamily: 'Montserrat' }} className='text-white text-xl sm:text-2xl font-extrabold'>Ilumeo</h1>
            </div>
            <div className='flex flex-col gap-7'>
                <div style={{ backgroundColor: "#1E2733", borderRadius: "6px"}} className='flex flex-col px-4 py-2'>
                    <p style={{ fontFamily: 'Montserrat' }} className="text-sm text-white">Código de usuário</p>
                    <input value={userCodInput.toLocaleUpperCase()} onChange={(i)=>setUserCodInput(i.target.value.toLocaleLowerCase())} style={{ fontFamily: 'Montserrat' }} id='user-cod-input' className= 'text-white font-bold bg-transparent border-none w-72 sm:w-96 py-2' type={"text"}/>
                </div>
                <button onClick={()=>HandleLogin()} style={{ backgroundColor: "#FE8A00", borderRadius: "6px", color: "#1E2733"}} className='w-full py-4 px-4 font-bold'>Confirmar</button>
            </div>
        </div>
    </div>
  )
}

export default Login