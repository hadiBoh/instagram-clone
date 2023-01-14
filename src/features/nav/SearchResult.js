import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({SearchResultFilterd  }) => {

        let content
        if (SearchResultFilterd?.length) {
            content = SearchResultFilterd.map(item=> <Link className='searchRes' to={item.username} key={item.id}>{item.username}</Link>)
        } else {
            content = <p className='searchRes'>no user match</p>
        }

  return content
}

export default SearchResult