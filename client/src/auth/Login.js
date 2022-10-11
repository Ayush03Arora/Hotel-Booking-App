import {toast} from 'react-toastify'
import { login } from '../actions/auth';
import LoginForm from '../components/LoginForm';
import { useState } from 'react';
import {useDispatch} from 'react-redux';

const Login = ({history}) =>{
    const[user,setuser] = useState({
        email:"",
        password:"",
    })

    const dispatch = useDispatch();

    function handleChange(event){
        const{name,value} = event.target;
        setuser({
              ...user,[name]:value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
        await login(user)
       .then(res=> {
        if(res.data.message==="Wrong Password" || res.data.message==="User not registered")
        toast.error(res.data.message);
        else if (res.data) {
           // console.log(res.data.message);
           // save user and token to local storage
           window.localStorage.setItem("auth",JSON.stringify(res.data));
           toast.success("Login Successfull");
           // save user and token to redux
           dispatch({
            type:"LOGGED_IN_USER",
            payload: res.data
           });
           history.push("/dashboard");
          }
    })


       }
    catch(err)
    {
        console.log(err);
        toast.error(err.response.data);
    }
}



    return (
    

        <div className='container'>
        
            <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} user={user}/>
        
        </div>
        
    )
    }
    
    export default Login;