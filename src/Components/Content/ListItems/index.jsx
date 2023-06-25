import React, { useContext } from 'react'
import Context from '../../../Contexts/GeneralContext';
import Items from '../Items';


const ListItems = ({ list, categorie }) => {
  const [search, setSearch] = useContext(Context);

  const title = list && list.map((item) => {
    return item.title
  })
  let uniqueTitles = [...new Set(title)]


  const searchValue = search.split(" ");
  for (let i = 0; i < searchValue.length; i++) {
    searchValue[i] = searchValue[i].charAt(0).toUpperCase() + searchValue[i].slice(1);
  }
  const finalSearchValue = searchValue.join(' ')

  return (
    <Items
      list={list}
      categorie={categorie}
      finalSearchValue={finalSearchValue}
      uniqueTitles={uniqueTitles}
      search={search}
    />
  )
}

export default ListItems