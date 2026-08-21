import React, { use, useState } from 'react'
import UserCard from "../components/UserCard"
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';
const EditProfile = ({user}) => {

    const [firstName,setFirstName] = useState(user?.firstName);
    const [lastName,setLastName] = useState(user?.lastName);
    const [age,setAge] = useState(user?.age || "");
    const [gender,setGender] = useState(user?.gender)
    const [photoUrl,setPhotoUrl] = useState(user?.photoUrl);
    const [about,setAbout] = useState(user?.about || "");
    const [error,setError]  = useState("");
    const [isToast,setToast] = useState(false);

    const dispatch = useDispatch();
    const handleSave = async()=>
    {
        
        setError("");
        try {
            const res = await axios.put(BASE_URL+"/profile/edit",
                {
                    firstName,lastName,age,photoUrl,about,gender
                },
                {
                    withCredentials:true
                });
            console.log(res.data.message);
            dispatch(addUser(res.data.data))
            setToast(true);
            setTimeout(()=>{
                setToast(false)
            },3000)

        } catch (error) {
            console.log(error.response.data.error);
            setError(error.response.data.error)
        }
    }
    
  return (
    <div className='flex justify-center ' >
        <div className="  card card-border bg-base-100 rounded-2xl w-96  my-10 ">
            <div className="card-body">
               { isToast && 
                    <div className="toast toast-top toast-center ">
                        <div className="alert alert-success ">
                            <span>Profile update successfully.</span>
                        </div>
                    </div>
                }
                <h2 className=' card-title items-center justify-center'>Edit Profile</h2>
    
                <fieldset className="fieldset  rounded-box w-xs m-2 p-2">
                    <label className="label p-1">FirstName</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="FirstName"
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                        
                        />
                    <label className="label p-1">LastName</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="LastName" 
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            
                        />
                    <label className="label p-1">PhotoUrl</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="PhotoUrl"
                            value={photoUrl}
                            onChange={(e)=>setPhotoUrl(e.target.value)} 
                            
                        />        
                    <label className="label p-1">Age</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Age" 
                            value={age}
                            onChange={(e)=>setAge(e.target.value)}
                            
                        />
                    <label className="label p-1">Gender</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Gender" 
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}  
                        />
                    <label className="label p-1">About</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="About" 
                            value={about}
                            onChange={(e)=>setAbout(e.target.value)}  
                        />
                       
                    {error && <span className='text-red-500'>{error}</span>}
                    <button 
                        className="btn btn-primary mt-2 py-2 "
                        onClick={handleSave}
                    
                    >
                        Save
                    </button>
                </fieldset>
            </div>
            
        </div>
        <div className='my-10'>
             <UserCard user={{firstName,lastName,age,photoUrl,about,gender}}/>   
        </div>
    </div>
  )
}


export default EditProfile