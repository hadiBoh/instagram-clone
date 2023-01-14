import './Nav.css'
import useWidth from '../../hooks/useWidth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faSearch, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectAllUsers, selectUserById } from '../main/posts/userApiSlice'
import { useEffect, useState } from 'react'
import SearchResult from "./SearchResult"
import { useNavigate, useParams } from 'react-router-dom'
import Modal from './Modal'

const Nav = () => {

    const auth = useAuth()
    const user = useSelector(state => selectUserById(state, auth?.userId))
    const param = useParams()

    const navigate = useNavigate()
    const [modalopen, setModalOpen] = useState(false)

    const [width] = useWidth()

    let icon

    if (width > 767) {
        icon = <i className='instagram-icon' role="img"></i>
    } else {
        icon = <i className='fa fa-instagram'></i>
    }

    const [SearchResultFilterd, setSearchResultFilterd] = useState([])
    const [search, setSearch] = useState("")
    const [resClass, setresClass] = useState("")
    const users = useSelector(selectAllUsers)
    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        if (e.target.value.length) {
            setresClass("active")
        } else {
            setresClass("")
        }
    }

    useEffect(() => {
        if (search?.length) {
            const filterd = users?.filter(user => user.username.includes(search) && user.userId !== auth?.userId)

            setSearchResultFilterd(filterd)
        }
    }, [search, auth?.userId, users])


    const moveToProfile = (e) => {
        e.preventDefault()
        if (param?.person === 'profile') {
            navigate(`../profile`)
            return
        }
        navigate(`./profile`)
    }

    const openmodal = (e) => {
        e.preventDefault()
        setModalOpen(prev => !prev)
    }


    let content = (

        <nav className="nav">
            <div className="nav-left-section">
                <a href="##">{icon}</a>
            </div>
            <div className='nav-center-section'>
                <label><FontAwesomeIcon icon={faSearch} /></label>
                <input type='text' placeholder='search' value={search} onChange={handleSearch} />
                <div className={`search-result ${resClass}`}>
                    <SearchResult SearchResultFilterd={SearchResultFilterd} />
                </div>
            </div>
            <div className="nav-right-section">
                <ul className=''>
                    <li onClick={() => navigate(`/${auth?.username}`)}><FontAwesomeIcon icon={faHome} /> </li>
                    <li onClick={openmodal}><FontAwesomeIcon icon={faPlusCircle} /> </li>
                    <li><FontAwesomeIcon icon={faHeart} /> </li>
                    <li><button className='account' onClick={moveToProfile}><img src={`http://localhost:3500/${user?.profile}`} alt='profile' /></button></li>
                </ul>
                <FontAwesomeIcon icon={faPaperPlane} style={{fontSize:"1.25rem"}}/>
                
            </div>

            <Modal modalopen={modalopen} setModalOpen={setModalOpen}  />
        </nav>

    )

    return content
}

export default Nav