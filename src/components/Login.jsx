import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addUser } from '../redux/slices/userSlice';
import { BASE_URL } from '../utils/constants';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailId ,setEmailId] = useState("duaa@gmail.com");
    const [password,setPassword] = useState("Duaa@123");
    const [error,setError] = useState("");

    const handleLogin = async ()=>
    {
       try {
        setError("");
         const res = await axios.post(BASE_URL +"/login",
             {
                 emailId,
                 password
             },
             {
                withCredentials:true
             }
            );
            //console.log(res.data);
            dispatch(addUser(res?.data?.user));
            navigate("/");
       } catch (error) {
        
        setError(error?.response?.data?.message)
        console.log(error?.response)
       }

    }
    return (
    <div className="card card-border bg-base-100 rounded-2xl w-96 mx-auto my-20">
        <div className="card-body">
            <h2 className=' card-title items-center justify-center'>Login</h2>
    
        <fieldset className="fieldset  rounded-box w-xs m-2 p-2">
            <label className="label p-1">Email</label>
                <input 
                    type="email" 
                    className="input" 
                    placeholder="Email"
                    value={emailId}
                    onChange={(e)=> setEmailId(e?.target?.value)} 
                />
            <label className="label p-1">Password</label>
                <input 
                    type="password" 
                    className="input" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e)=>setPassword(e?.target?.value)}
                />
               { error && <p className='font-bold text-red-500'>{error}</p>}
            <button 
                className="btn btn-primary mt-2 py-2 "
                onClick={handleLogin}
            >
                Login
            </button>
        </fieldset>
        </div>
    </div>
  )
}

export default Login