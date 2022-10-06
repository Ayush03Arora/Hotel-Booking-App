import{useSelector,useStore,userSelector} from 'react-redux'

const NewHotel = () =>{

    const { auth }  = useSelector((state) => ({...state})); 
return (
    <div className="container-fluid h1 p-5 text-center">
      New hotel 
    </div>
);
};

export default NewHotel;