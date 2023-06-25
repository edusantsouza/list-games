import React from 'react'

const SelectCategorie = ({ chooseCategorie, uniqueGenres }) => {
  return (
    <div className="select-categorie">
      <label htmlFor="categories">Escolha uma categoria: </label>
      <select onChange={chooseCategorie} name="categories" id="categories">
        <option value="all">Todos</option>
        {uniqueGenres.map((item) => {
          return (
            <option key={item} value={item}>{item}</option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectCategorie