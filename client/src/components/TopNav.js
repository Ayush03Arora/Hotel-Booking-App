import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './topnav.css';

const TopNav = () => {
  const dispatch = useDispatch();
  const{auth} = useSelector((state) =>({...state}));
  const history = useHistory();  

  const logout=()=>{
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };


    return (
    <div className='nav backg d-flex justify-content-between mb-5 pb-3 pt-3'>
     <Link className="nav-link text-white fs-4" to="/">
      Home 
     </Link>

     {auth!==null && (
      <Link className="nav-link text-white fs-4" to="/dashboard">
       Dashboard
     </Link>
      )}

      {auth!==null && (
        <a className='nav-link pointer text-white fs-4' onClick={logout}>
          Logout
        </a>
      )}


     {auth===null && (
      <>
     <Link className="nav-link text-white fs-4" to="/login">
      Login
     </Link>
     <Link className="nav-link text-white fs-4" to="/register">
      Register
     </Link>
     </>
     )}
     
    </div> 
    );
}; 

  export default TopNav;