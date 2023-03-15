import React from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react'

const Home = () => {

  const [userId, setUserId] = useState("")
  const [logs, setLogs] = useState([])
  const [atualDate, setAtualDate] = useState("")

  useEffect(()=>{
    setUserId(window.localStorage.getItem("id"))
    Axios.get(`https://controle-ponto.herokuapp.com/logs/${window.localStorage.getItem("id")}`)
    .then((resp)=>{
      setLogs(resp.data.reverse())
      setAtualDate(new Date().toISOString())
    })
  },[])



  const HandleTime = (dataEntrada, dataSaida) =>{

      if(dataEntrada?.match(/^\d{4}-\d{2}-\d{2}/)[0] !== dataSaida?.match(/^\d{4}-\d{2}-\d{2}/)[0]){
        return "0h 00m"
      }
      else{
        // let dataEntrada = logs[logs.length-1].data_hora.match(/T(\d{2}):(\d{2}):(\d{2})/)
        dataEntrada = dataEntrada.match(/T(\d{2}):(\d{2}):(\d{2})/)
        dataSaida = dataSaida.match(/T(\d{2}):(\d{2}):(\d{2})/)

        const horaInicio = dataEntrada[1]
        const minutoInicio = dataEntrada[2]
        const horaSaida = dataSaida[1]
        const minutoSaida = dataSaida[2]


        const totalHoras = horaSaida - horaInicio
        const totalMinutos = minutoSaida - minutoInicio

        return `${totalHoras}h ${totalMinutos > 10 ? totalMinutos+"m" : `0${totalMinutos}m`}`
      }
  }

  const AddEntry = ()=>{
    Axios.post(`https://controle-ponto.herokuapp.com/logs/${userId}&${new Date().toISOString().slice(0, 19)}`)
    .then((resp)=>{
      console.log(resp)
    })
    window.location.reload()
  }

  return (
    <div className='flex w-full justify-center'>
      <div className='flex w-3/4  sm:w-1/3 flex-col mt-24 '>
          <div className='flex justify-between row'>
            <h1 style={{ fontFamily: 'Montserrat' }} className='text-white font-bold'>Relogio de ponto</h1>
            <div className='flex flex-col'>
              <p style={{ fontFamily: 'Montserrat' }} className='text-white font-bold'>#{window.localStorage.getItem('name').toLocaleUpperCase()}</p>
              <p style={{ fontFamily: 'Montserrat' }} className='text-white'>Usuário</p>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'Montserrat' }} className='text-white text-xl font-bold'>
              { logs.length % 2 === 0 ? "0h 00m" : HandleTime(logs[0].data_hora, atualDate) }
            </p>
            <p style={{ fontFamily: 'Montserrat' }} className='text-white text-xs font-bold'>Horas de hoje</p>

          </div>
          <div>
            <button onClick={()=>AddEntry()} style={{ backgroundColor: "#FE8A00", borderRadius: "6px", color: "#1E2733"}} className='w-full mt-8 py-4 px-4 font-bold'>Hora de entrada</button>
          </div>
          <div>
            <p style={{ fontFamily: 'Montserrat' }} className='mt-8 text-white text-xs font-bold'>
              Dias anteriores
            </p>
            <div className='flex flex-col gap-2 mt-2'>
              {logs?.map((i,index)=>{
                if(index >= 16){}
                else {if(index % 2 !==0){
                const data = i.data_hora?.match(/^\d{4}-\d{2}-\d{2}/)[0]
                const formatData = `${data[8]}${data[9]}/${data[5]}${data[6]}/${data[2]}${data[3]}`

                if ( data === logs[index-1]?.data_hora.match(/^\d{4}-\d{2}-\d{2}/)[0]){
                  return <div style={{backgroundColor:"rgba(217, 217, 217, 0.05)" ,  fontFamily: 'Montserrat' }} className=' flex flex-row text-white w-full justify-between p-3' >
                            <p className='text-sm'>{formatData}</p>
                            <p className='text-sm font-bold'>{HandleTime(i.data_hora,logs[index-1]?.data_hora)}</p>
                         </div>
                }}}
              })}
            </div>
          </div>

      </div>
    </div>
  )
}

export default Home