import React from 'react'
import Choose from './Choose'
import Statuse from './Statuse'
import Guidance from './Guidance'
import Ourclient from './Ourclient'
import Agentfile from './Agentfile'
import Yourneeds from './Yourneeds'


const Partagency = () => {
  return (
    <div>
      <Choose/>
      <Agentfile/>
      <Statuse/>
      <Guidance/>
      
      <Ourclient/>
      
      <Yourneeds/>
    </div>
  )
}

export default Partagency
