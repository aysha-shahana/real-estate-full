import React from 'react'
import mainstatus from '../../assets/Statuss.module.css'
const Statuse = () => {
  return (
<div className={mainstatus.statusWrapper}>
  <div className="container">

    <div className={mainstatus.statussection}>

      <div className={mainstatus.statCard}>
        <i className="bi bi-building"></i>
        <h2>1250</h2>
        <p>Properties Sold</p>
      </div>

      <div className={mainstatus.statCard}>
        <i className="bi bi-house-door"></i>
        <h2>320</h2>
        <p>Apartments Sold</p>
      </div>

      <div className={mainstatus.statCard}>
        <i className="bi bi-houses"></i>
        <h2>125</h2>
        <p>Houses Sold</p>
      </div>

      <div className={mainstatus.statCard}>
        <i className="bi bi-building-check"></i>
        <h2>120</h2>
        <p>Villas Sold</p>
      </div>

    </div>

  </div>
</div>
  )}

export default Statuse
