import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectAllUsers, useUpdateUserBioMutation, useUpdateUserMutation } from "../main/posts/userApiSlice"
import Nav from "../nav/Nav"


const Profile = () => {
    const users = useSelector(selectAllUsers)
    const [updateUser] = useUpdateUserMutation()
    const [updateUserBio] = useUpdateUserBioMutation()

    const param = useParams()

    let user
    if (param?.person !== "profile") {
       user = users?.filter(user=> user.username === param?.person)[0]
    }else{
       user = users?.filter(user=> user.username === param?.username)[0]
    }
    
    const [img , setImg] = useState('')
    const [bio , setBio] = useState('')

  let edit

    
    function handleImg(e){

        setImg(e.target.files[0])
      
    }
    
    
    const setImgFunc = async(e)=>{
      e.preventDefault()
      const formData = new FormData()

      if (!img) {
        return
      }

      formData.append('profile' , img)
      formData.append('userId' , user?.userId)


      try {
        await updateUser(formData)
      } catch (error) {
        console.log(error);
      }
    }
    
    const setBioFunc = async(e)=>{
      e.preventDefault()
      const data = {
        userId: user?.userId,
        bio
      }
      try {
        await updateUserBio(data)
        setBio("")
      } catch (error) {
        console.log(error);
      }

    }

    const sectionStyle = {display:"flex" , height:"50px" , justifyContent:"center" , alignItems:"center" , marginTop:"2rem" , gap:"1rem"}

    if (param?.person === "profile") {
      edit = <>
        <section style={sectionStyle}>
          <input type='file' name="profile" onChange={handleImg} />
          <button style={{cursor:"pointer"}} onClick={setImgFunc}>change profile</button>
        </section>
        <br/>
        <section style={sectionStyle}>
        <label>change bio </label>
        <textarea  onChange={e => setBio(e.target.value)} value={bio} />
        <button style={{cursor:"pointer"}} onClick={setBioFunc}>new bio</button>
        </section>
      </>        
    }
    
  return (
    <>
    <Nav/>
    <form onSubmit={setImgFunc} style={{marginTop:"5rem" , width:"100%" , display:"flex" , flexDirection:"column" ,justifyContent:"center" , alignItems:"center"}}>
        
        <div style={{maxWidth:"100px" , maxHeight:"100px" , borderRadius:"50%" , overflow:"hidden"}} className='img-cont-profile'>
            <img style={{display:"block" , maxWidth:"100%"}} src={`http://localhost:3500/${user?.profile}`} alt='profile' />
        </div>
        <p>{user?.username}</p>
        <p>{user?.bio}</p>
        {edit}
    </form>
    </>
  )
}

export default Profile