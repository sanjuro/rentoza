import React, { useState, useEffect } from 'react'

const Drinks = ({ drinks, onRemove }) => {
  const [drinkData, updateDrinkData] = useState([])

  const drinkStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'cyan'
  }

  useEffect(() => {
    updateDrinkData(drinks)
  }, [drinks])

  return (
    <div className="drink-list">
      {drinkData.map(drink => (
        <div
          className="drink"
          key={drink.id}
        >
          <div className="id">{drink.id}</div>
          <div className="name">{drink.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Drinks
