import './loginform.css';

        const RegisterForm =({  handleSubmit,user,HandleChange }) =>(
        
                <div className="box-form">
                <div className="left">  
                        <div className="overlay">	
                        </div>
                </div>
                    
        
                    <div className="right">
        <form onSubmit={handleSubmit} className="mt-3">
        <h5>Register</h5>
            <br></br>
		    <p>Account already Created? 
            <a href="#">Log in to your Account</a> to continue further</p>

        <div className="form-floating mb-2 ">
         <input 
         type="text" 
         name="name"
         id ="floatingInput"
         className="form-control" 
         placeholder="Enter Name" 
         value={user.name} 
         onChange={HandleChange}
         />
         <label for ="floatingInput">Name</label>
        </div>


        <div className="form-floating mb-2">
         
         <input 
         type="email" 
         name="email"
         id ="floatingInput"
         className="form-control" 
         placeholder="Enter email" 
         value={user.email} 
         onChange={HandleChange}
         />
         <label for ="floatingInput">E-Mail</label>
        </div>


        <div className="form-floating mb-2">
        
         <input 
         type="password" 
         name="password"
         id ="floatingInput"
         className="form-control" 
         placeholder="Enter Password" 
         value={user.password} 
         onChange={HandleChange}
         />

         <label for ="floatingInput">Enter the Password</label>

         

        </div>

        <div className="form-floating mb-2">

         <input 
         type="password" 
         name="reEnterPassword"
         id ="floatingInput"
         className="form-control" 
         placeholder="Enter Password" 
         value={user.reEnterPassword}  
         onChange={HandleChange}
         />
         <label for ="floatingInput">Re-Enter Password </label>
        </div>
         <div className="d-flex justify-content-center">
        <button className='btn btn-primary mt-3 '>Submit</button>
        </div>
        </form>
        </div>
        </div>
        );

        export default RegisterForm;


        
