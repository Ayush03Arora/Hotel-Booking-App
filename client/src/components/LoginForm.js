 const LoginForm =({  handleSubmit,user,handleChange }) =>(
            
            
            <form onSubmit={handleSubmit} className="mt-3">
            
            <div className="form-group mb-3">
             <label className='form-label'>Email Address</label>
             <input 
             type="email" 
             name="email"
             className="form-control" 
             placeholder="Enter email" 
             value={user.email} 
             onChange={handleChange}
             />
            </div>
    
    
            <div className="form-group mb-3">
             <label className='form-label'>Password</label>
             <input 
             type="password" 
             name="password"
             className="form-control" 
             placeholder="Enter Password" 
             value={user.password} 
             onChange={handleChange}
             />
            </div>
    
            
    
            <button disabled={!user.email || !user.password} className='btn btn-primary'>
            Submit
            </button>
            </form>
            );
    
            export default LoginForm;