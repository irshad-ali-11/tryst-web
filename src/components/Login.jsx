import React, { useState } from 'react'
import axios from "axios"

const Login = () => {

    const [emailId ,setEmailId] = useState("irshad@gmail.com");
    const [password,setPassword] = useState("Irshad@123");
    const handleLogin = async ()=>
    {
        console.log(emailId)
        console.log(password)

       try {
         const res = await axios.post("http://localhost:3000/api/v1/login",
             {
                 emailId,
                 password
             },
             {
                withCredentials:true
             }
            );
              
             console.log(res.data);
       } catch (error) {
        console.log("ERROR " + error.message)
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
            <button 
                className="btn btn-neutral mt-2 py-2 "
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