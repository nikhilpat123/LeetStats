import React ,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Protected = ({children,authentication=true}) => {
    const navigate = useNavigate();
    const [loader , setLoader]=useState(true);
    const authStatus = useSelector(state=>state.auth.status);

    useEffect(()=>{
        if(authStatus===false){
            navigate('/login');
        }
        else if(authStatus===true){
            navigate('/dashboard');
        }
        setLoader(false);
    },[authStatus,navigate,authentication])
  return loader ? <div className="text-5xl loader">Loading ...</div> : children
}

export default AuthLayout