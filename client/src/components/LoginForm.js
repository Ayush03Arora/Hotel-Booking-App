import './loginform.css';
 
 const LoginForm =({  handleSubmit,user,handleChange }) =>(

    

<div className="box-form">
	<div className="left">  
		<div className="overlay">	
		</div>
	</div>
            

            <div className="right">
            <form onSubmit={handleSubmit} className="mt-3">
            <h5>Login</h5>
            <br></br>
		    <p>Don't have an account? 
            <a href="#">Create Your Account</a> it takes less than a minute</p>
            
            <div className="form-floating mb-3">
         
         <input 
         type="email" 
         name="email"
         id ="floatingInput"
         className="form-control" 
         placeholder="Enter email" 
         value={user.email} 
         onChange={handleChange}
         />
         <label for ="floatingInput">E-mail</label>
        </div>
    
    
        <div className="form-floating mb-3">
        
        <input 
        type="password" 
        name="password"
        id ="floatingInput"
        className="form-control" 
        placeholder="Enter Password" 
        value={user.password} 
        onChange={handleChange}
        />

        <label for ="floatingInput">Enter Password</label>

        

       </div>
    
            
             <div className='d-flex justify-content-center mb-4 mt-5'>
            <button disabled={!user.email || !user.password} >
            Submit
            </button>
            </div>
            </form>
            </div>

           </div>


            
            );
    
            export default LoginForm;