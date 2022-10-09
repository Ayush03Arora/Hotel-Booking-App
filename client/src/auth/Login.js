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
        if (res.data) {
           // console.log(res.data.message);
           // save user and token to local storage
           window.localStorage.setItem("auth",JSON.stringify(res.data));
          
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
        <>
        <div className='container col-6 bg-light p-0 rounded'>
        <div className=" back m-0 p-5  text-center rounded-top ">
            <h1 className='text-white'>Login</h1> 
        </div>

        <div className='container'>
        <div className='row'>
        <div className='col-md-6 offset-md-3'>
            <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} user={user}/>
        </div>   
        </div>
        </div>
        </div>
        </>
    )
    }
    
    export default Login;
