import React from 'react'
import mainstatus from '../../assets/Statuss.module.css'
const Statuse = () => {
  return (
  <div>
  <div className={mainstatus.statussection}>

    <div className="text-center">
      <i className="bi bi-building fs-1 mb-2"></i>
      <h2>1250</h2>
      <p>Properties sold</p>
    </div>

    <div className="text-center">
      <i className="bi bi-house-door fs-1 mb-2"></i>
      <h2>320</h2>
      <p>Apartments sold</p>
    </div>

    <div className="text-center">
      <i className="bi bi-houses fs-1 mb-2"></i>
      <h2>125</h2>
      <p>Houses sold</p>
    </div>

    <div className="text-center">
      <i className="bi bi-building-check fs-1 mb-2"></i>
      <h2>120</h2>
      <p>Villas sold</p>
    </div>

  </div>
</div>
  )}

export default Statuse
