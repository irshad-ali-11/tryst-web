import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../redux/slices/feedSlice'
import { useNavigate } from 'react-router'

const Feed = () => {
    const dispatch = useDispatch();
const userData = useSelector(store=>store.user)
    const feedUser = useSelector(store=>store.feed);
    const navigate = useNavigate();
    const fetchFeed = async()=>
    {
        if(!userData) return navigate("/login");
       try {
         const res = await axios.get(BASE_URL+"/feed",
            {
                withCredentials:true
            }
         );
         dispatch(addFeed(res?.data?.data))
        //console.log(res)
       } catch (error) {
        console.log("ERROR : " + error)
       }

    }
    useEffect(()=>
    {
        fetchFeed()
    },[]);
    return feedUser && (
     <div className='flex justify-center my-10'>
        <UserCard user={feedUser[0]}/>
    </div>
  )
  
}

export default Feed