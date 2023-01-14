import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation, useLogoutMutation } from "../features/auth/authApiSlice"
import { setAuth } from "../features/auth/authSlice"

const Public = () => {

  const navigate = useNavigate()
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const dispatch = useDispatch()
  const [login] = useLoginMutation()

  const handleLogin = async(e)=>{
    e.preventDefault()
    const data = {username, password}
    const response = await login(data)
    dispatch(setAuth(response.data))
    setUsername('')
    setPassword('')
    navigate(`/${response.data.username}`)
  }



  const [logout] = useLogoutMutation()

  const logoutit = async(e)=>{
      e.preventDefault()
      await logout()
  }

  return (
    <form onSubmit={handleLogin}>
      <label>username</label>
      <input type="text" placeholder="username" onChange={ e=> setUsername(e.target.value)} value={username}/>
      <label>password</label>
      <input type="password" placeholder="password" onChange={ e=> setPassword(e.target.value)} value={password}/>
      <button onClick={handleLogin}>login</button>
      <button onClick={logoutit}>logout</button>
      <Link to="/hh">dash</Link>
    </form>
    
  )
}

export default Public