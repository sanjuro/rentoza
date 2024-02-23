import React, { useState, useEffect } from 'react'

const Patrons = ({ patrons, onRemove }) => {
  const [patronData, updatePatronData] = useState([])

  const patronStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'cyan'
  }

  useEffect(() => {
    updatePatronData(patrons)
  }, [patrons])

  return (
    <div className="patron-list">
      {patronData.map(patron => (
        <div
          className="patron"
          key={patron.id}
          style={{
            backgroundColor: parseFloat(patron.alcoholSaturation) > 0.08 ? 'red' : 'transparent',
            color: parseFloat(patron.alcoholSaturation) > 0.08 ? 'white' : 'black',
          }}
        >
          <div className="id">{patron.id}</div>
          <div className="name">{patron.name}</div>
          <div className="alcoholSaturation">{patron.alcoholSaturation}</div>
          <a href="#" onClick={() => onRemove(patron.id)} className="remove-link">Remove</a>
        </div>
      ))}
    </div>
  );
}

export default Patrons
