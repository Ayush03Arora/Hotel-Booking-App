import {useState} from 'react';
import RegisterForm from '../components/Registerform';
import axios from 'axios';
import {toast } from 'react-toastify';
import {register} from '../actions/auth';
import './register.css';


const Register = ({history}) =>{
    const[user,setUser] = useState({
        name :"",
        email:"",
        password:"",
        reEnterPassword:""
    })


    function HandleChange(event){
        const{name,value} = event.target;
        setUser({
              ...user,[name]:value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
        const{name,email,password,reEnterPassword} = user;

if(name && email && password && (password===reEnterPassword && password.length>=6 ) ){

  register(user)
  .then(res=> {
    if(res.data.message==="Successfully Registered,Please Login now")
    {
        toast.success(res.data.message);
        history.push('/login');
    }
        else
        toast.error(res.data.message);
        
    })
}
else{
    if(!name)
    {
       return toast.error("name is required");  
    }
    if(!email)
    {
       return toast.error("email is required");
    }
    if(!password || password.length<6)
    return toast.error("password required and should be atleast 6 characters long");
    if(!(password===reEnterPassword)){
      return toast.error("password and re-Enter password do not match");
    }
}
    } catch(err)
    {
        console.log(err);
    }
}


    return (
    
        
        
        
            <div className='container'>
             <RegisterForm  HandleChange={HandleChange} handleSubmit={handleSubmit} user={user}  />
            </div>
        
    )
    }
    
    export default Register;