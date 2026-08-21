import React, { useEffect } from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'
import { useNavigate } from 'react-router'

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector(store=>store.user)
  useEffect(()=>
  {
    if(!userData)
    {
      navigate("/login")
    }
  },[userData,navigate])
   return (
    <div>
      <EditProfile user={userData}/>
      
    </div>
  )
}

export default Profile