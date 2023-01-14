import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './userApiSlice'

const HeaderPost = ({userId}) => {

    const user = useSelector(state => selectUserById(state , userId))


  return (
    <header>
    <div>
        <section className='img-cont'>
            <img src={`http://localhost:3500/${user?.profile}`} alt='profile' />
        </section>
        <h3>{user?.username}</h3>
    </div>
    <button className='btn'>...</button>
</header>
  )
}

export default HeaderPost