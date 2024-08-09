import React, { useEffect } from 'react'
import "./styles.css";
import { auth } from '../../firebase';
import {useAuthState }from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userimg from '../../assets/user.svg';
function Header() {
  const [user,loading]=useAuthState(auth);
const navigate = useNavigate();
  useEffect(() => {
  if(user){
    navigate('/dashboard');
  }
  }, [user,loading]);
  
  function logoutFnc(){
   try{
    signOut(auth).then(()=>{
      //Signout succesful.
      toast.success("LOGGED OUT SUCCESSFULY");
      navigate("/");
    }).catch((error)=>{
      toast.error(error.message);
      //an error happened.
    });
   }catch(e){
    toast.error(e.message)
   }
  }
  return (
    <div className='navbar'>
      <p className='logo'>Pennywise.</p>
      {user &&(
        <div className='Logout-button'>
          <img src={user.photoURL?user.photoURL: userimg}></img>
        <p className="logo-link"onClick={logoutFnc}>Logout
        </p>
        </div>
      )}
    </div>
  );
}

export default Header