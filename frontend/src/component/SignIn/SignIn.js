import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { authAction } from '../../store';
import "./SignIn.css"

function SignIn() {
    const dispatch = useDispatch(); 
    const navigator = useNavigate()
    const [Inputs, setInputs] = useState({
        email : "",
        pass : "" 
    });

    const handleInputs = (e) => {
        const {name, value} = e.target;
        setInputs({...Inputs, [name] : value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(Inputs.pass.length < 8) {
            toast.error("Password length atleast 8")
            return;
        }
        
        try{
            await axios.post(`${window.location.origin}/api/v1/login`,Inputs).then((response)=>{
                // toast.success(response.data.message)
                if(response.data.other) {
                    sessionStorage.setItem("Id" ,response.data.other._id)
                    dispatch(authAction.login())
                    // toast.success(response.data.other.username+" Logged In Succussfully...");
                    setInputs({email : "", password : ""});
                    navigator("/todo");
                }
                else {
                    toast.error(response.data.message);
                }
            })
        }
        catch(error) {
            toast.error(error)
        }
    }

    return (
        <div className='SignIn'>
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label" for="exampleInputEmail1">Email address</label>
                    <input name="email" value={Inputs.email} onChange={handleInputs} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label className="label" for="exampleInputPassword1">Password</label>
                    <input name="pass" value={Inputs.password} onChange={handleInputs} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                </div>
                <button type="submit" class="button-signIn">Sign In</button>
            </form>
        </div>
    )
}

export default SignIn
